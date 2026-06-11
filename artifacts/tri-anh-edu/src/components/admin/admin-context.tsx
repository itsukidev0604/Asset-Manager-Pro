import { createContext, useContext, useState, ReactNode } from "react";

export type AdminRole = "admin" | "teacher";

export interface AdminUser {
  name: string;
  email: string;
  role: AdminRole;
  initials: string;
}

interface AdminContextType {
  user: AdminUser;
  isAdmin: boolean;
  setRole: (role: AdminRole) => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser>({
    name: "Nguyễn Văn Admin",
    email: "admin@trianhedu.vn",
    role: "admin",
    initials: "NA",
  });

  return (
    <AdminContext.Provider
      value={{
        user,
        isAdmin: user.role === "admin",
        setRole: (role) =>
          setUser((prev) => ({
            ...prev,
            role,
            name: role === "admin" ? "Nguyễn Văn Admin" : "Thầy Nguyễn Minh Tuấn",
            email: role === "admin" ? "admin@trianhedu.vn" : "minh.tuan@trianhedu.vn",
            initials: role === "admin" ? "NA" : "NM",
          })),
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
