import React, { createContext, useContext, useMemo, useState } from "react";
import { auth } from "../services/auth";

const AuthContext = createContext(null);

const rolePermissions = {
  ADMIN: ["Dashboard", "Vehiculos", "Solicitudes", "Mantenimientos", "Alertas", "Historial", "Administracion"],
  DIRECTOR: ["Dashboard", "Vehiculos", "Solicitudes", "Mantenimientos", "Alertas", "Historial", "Administracion"],
  MECANICO: ["Dashboard", "Vehiculos", "Solicitudes", "Mantenimientos", "Alertas", "Historial"],
  OPERADOR: ["Dashboard", "Vehiculos", "Solicitudes", "Alertas", "Historial"],
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(auth.getSession());
  const [loading, setLoading] = useState(false);

  const login = async (payload) => {
    setLoading(true);
    try {
      const user = await auth.loginMock(payload);
      setSession(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await auth.logoutMock();
    setSession(null);
  };

  const changeRole = (role) => {
    const updated = auth.updateRole(role);
    setSession(updated);
  };

  const value = useMemo(
    () => ({
      session,
      loading,
      login,
      logout,
      changeRole,
      permissions: session ? rolePermissions[session.rol] || [] : [],
      rolePermissions,
    }),
    [session, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
