import React from "react";
import styles from "./Drawer.module.css";

const Drawer = ({ open, onClose, title, children, position = "right" }) => {
  if (!open) return null;

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        className={`${styles.drawer} ${styles[position]}`}
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <h3>{title}</h3>
          <button className={styles.close} onClick={onClose} aria-label="Cerrar panel">
            ✕
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
