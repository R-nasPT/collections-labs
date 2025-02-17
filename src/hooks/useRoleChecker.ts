import { useSession } from "next-auth/react";

type UserRole = "admin" | "user" | "editor" | "viewer" | "manager";

const normalizeRoles = (roles: string | UserRole[] | undefined): UserRole[] => {
  if (!roles) return [];

  if (Array.isArray(roles)) {
    return roles;
  }

  return roles.split(",").map((role) => role.trim() as UserRole);
};

const useRoleChecker = () => {
  const { data: session } = useSession();

  const hasRole = (requiredRole: UserRole): boolean => {
    const userRoles = normalizeRoles(session?.user?.roles);
    return userRoles.includes(requiredRole);
  };

  const hasAnyRole = (requiredRoles: UserRole[]): boolean => {
    const userRoles = normalizeRoles(session?.user?.roles);
    return requiredRoles.some((role) => userRoles.includes(role));
  };

  const hasAllRoles = (requiredRoles: UserRole[]): boolean => {
    const userRoles = normalizeRoles(session?.user?.roles);
    return requiredRoles.every((role) => userRoles.includes(role));
  };

  return { hasRole, hasAnyRole, hasAllRoles };
};

export default useRoleChecker;

// ------------- example -----------------

  const { hasRole, hasAnyRole, hasAllRoles } = useRoleChecker();

  const isAdmin = hasRole("admin"); // ตรวจสอบว่าผู้ใช้เป็น "admin" หรือไม่
  const canEdit = hasAnyRole(["admin", "editor"]); // ตรวจสอบว่าผู้ใช้มีบทบาท "admin" หรือ "editor"
  const canAccessManagerFeatures = hasAllRoles(["admin", "manager"]); // ตรวจสอบว่าผู้ใช้มีบทบาท "admin" และ "manager"
