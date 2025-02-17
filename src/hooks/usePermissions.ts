import { useSession } from "next-auth/react";

type UserRole = "admin" | "user" | "editor" | "viewer" | "manager";


const normalizeRoles = (roles: string | UserRole[] | undefined): UserRole[] => {
  if (!roles) return [];

  if (Array.isArray(roles)) {
    return roles;
  }

  return roles.split(",").map((role) => role.trim() as UserRole);
};

const usePermissions = () => {
  const { data: session } = useSession();

  const hasPermission = (requiredRole: UserRole): boolean => {
    const userRoles = normalizeRoles(session?.user?.roles);
    return userRoles.includes(requiredRole);
  };

  const hasAnyPermission = (requiredRoles: UserRole[]): boolean => {
    const userRoles = normalizeRoles(session?.user?.roles);
    return requiredRoles.some((role) => userRoles.includes(role));
  };

  const hasAllPermissions = (requiredRoles: UserRole[]): boolean => {
    const userRoles = normalizeRoles(session?.user?.roles);
    return requiredRoles.every((role) => userRoles.includes(role));
  };

  return { hasPermission, hasAnyPermission, hasAllPermissions };
};

export default usePermissions;
