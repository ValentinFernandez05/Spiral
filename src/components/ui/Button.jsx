import React from "react";
import styles from "./Button.module.css";

const Button = ({ variant = "primary", size = "md", icon, children, ...props }) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
