import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AccountMenu.module.css";
import { useAuth } from "../../contexts/AuthContext";

const AccountMenu = () => {
  const { session, logout, changeRole } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (!session) return null;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className={styles.menu}>
      <button className={styles.trigger} onClick={() => setOpen((prev) => !prev)}>
        <img src={session.avatar} alt={session.nombre} className={styles.avatar} />
        <span>
          <strong>{session.nombre}</strong>
          <span className={styles.role}>{session.rol}</span>
        </span>
      </button>
      {open && (
        <div className={styles.dropdown} role="menu">
          <div className={styles.profile}>
            <span className={styles.sectionTitle}>Perfil (solo lectura)</span>
            <p>{session.nombre}</p>
            <span>{session.email}</span>
          </div>
          <div className={styles.roles}>
            <span>Modo demo</span>
            {["ADMIN", "DIRECTOR", "MECANICO", "OPERADOR"].map((role) => (
              <button
                key={role}
                className={styles.roleButton}
                onClick={() => changeRole(role)}
              >
                {role}
              </button>
            ))}
          </div>
          <button className={styles.logout} onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
