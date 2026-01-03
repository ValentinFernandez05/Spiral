import React, { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./AppLayout.module.css";
import Drawer from "../ui/Drawer";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import NotificationDrawer from "./NotificationDrawer";
import AccountMenu from "./AccountMenu";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";

const navItems = [
  { label: "Dashboard", path: "/dashboard", permission: "Dashboard" },
  { label: "Vehículos", path: "/vehiculos", permission: "Vehiculos" },
  { label: "Solicitudes", path: "/solicitudes", permission: "Solicitudes" },
  { label: "Mantenimientos", path: "/mantenimientos", permission: "Mantenimientos" },
  { label: "Alertas", path: "/alertas", permission: "Alertas" },
  { label: "Historial", path: "/historial", permission: "Historial" },
  { label: "Administración", path: "/administracion", permission: "Administracion" },
];

const AppLayout = ({ children }) => {
  const { session, permissions } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const allowedItems = useMemo(
    () => navItems.filter((item) => permissions.includes(item.permission)),
    [permissions]
  );

  useEffect(() => {
    api.getAlertas().then((data) => {
      setNotificationCount(data.filter((item) => item.estado === "Activa").length);
    });
  }, []);

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <button
            className={styles.menuButton}
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            ☰
          </button>
          <span className={styles.logo}>CRM Flota</span>
        </div>
        <nav className={styles.nav}>
          {allowedItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.actions}>
          <Button
            variant="ghost"
            onClick={() => setNotificationsOpen(true)}
            aria-label="Ver notificaciones"
          >
            🔔
          </Button>
          {notificationCount > 0 && <Badge tone="danger">{notificationCount}</Badge>}
          <Badge tone="accent">{session?.rol}</Badge>
          <AccountMenu />
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        title="Navegación"
        position="left"
      >
        <div className={styles.mobileNav}>
          {allowedItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.mobileLink} ${isActive ? styles.activeMobile : ""}`
              }
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </Drawer>

      <NotificationDrawer open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </div>
  );
};

export default AppLayout;
