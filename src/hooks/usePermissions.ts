import { useSession } from "next-auth/react";

type Permission =
  | "children"
  | "note"
  | "shop"
  | "shopOwner"
  | "changeAccount"
  | "representative"
  | "account"
  | "sku"
  | "warehouse"
  | "admin"
  | "advice";

type PermissionCondition = {
  requireAll?: Permission[];
  requireAny?: Permission[];
  exclude?: Permission[];
};

const normalizeRoles = (roles: string | Permission[] | undefined): Permission[] => {
  if (!roles) return [];

  if (Array.isArray(roles)) {
    return roles;
  }

  return roles.split(",").map((role) => role.trim() as Permission);
};

const usePermissions = () => {
  const { data: session } = useSession();

  // ------------- ดึงสิทธิ์ทั้งหมดของผู้ใช้ -------------
  const getUserPermissions = (): Permission[] => {
    return normalizeRoles(session?.user?.roles);
  };

  const hasPermission = (requiredPermission: Permission): boolean => {
    const userPermissions = getUserPermissions();
    return userPermissions.includes(requiredPermission);
  };

  const hasAnyPermission = (requiredPermissions: Permission[]): boolean => {
    const userPermissions = getUserPermissions();
    return requiredPermissions.some((p) => userPermissions.includes(p));
  };

  const hasAllPermissions = (requiredPermissions: Permission[]): boolean => {
    const userPermissions = getUserPermissions();
    return requiredPermissions.every((p) => userPermissions.includes(p));
  };

  // ------------- ตรวจสอบว่าไม่มีสิทธิ์ใดๆ -------------
  const hasNoPermissions = (): boolean => {
    return getUserPermissions().length === 0;
  };

  // --------- สำหรับตรวจสอบเงื่อนไขที่ซับซ้อนมากขึ้น -------------

  const isAuthorized = (condition: PermissionCondition): boolean => {
    const userPermissions = getUserPermissions();

    const hasRequired =
      !condition.requireAll ||
      condition.requireAll.every((p) => userPermissions.includes(p));

    const hasAny =
      !condition.requireAny ||
      condition.requireAny.some((p) => userPermissions.includes(p));

    const notExcluded =
      !condition.exclude ||
      !condition.exclude.some((p) => userPermissions.includes(p));

    return hasRequired && hasAny && notExcluded;
  };

  // ต้องมีสิทธิ์ admin และ shopOwner แต่ต้องไม่มีสิทธิ์ children
  if (
    isAuthorized({
      requireAll: ["admin", "shopOwner"],
      exclude: ["children"],
    })
  ) {
    // do something
  }
  // -----------------------------------------------------------

  return {
    getUserPermissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasNoPermissions,
    isAuthorized,
  };
};

export default usePermissions;

// -------- ถ้าคุณต้องการจัดลำดับความสำคัญของสิทธิ์ ---------
const permissionLevels: Record<Permission, number> = {
  admin: 100,
  shopOwner: 80,
  representative: 70,
  // ... กำหนดระดับอื่นๆ
};

const getHighestPermissionLevel = (): number => {
  const permissions = getUserPermissions();
  if (permissions.length === 0) return 0;
  
  return Math.max(...permissions.map(p => permissionLevels[p] || 0));
};
