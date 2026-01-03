import React from "react";
import styles from "./Input.module.css";

const Input = ({ label, helper, error, ...props }) => {
  return (
    <label className={styles.field}>
      {label && <span className={styles.label}>{label}</span>}
      <input className={`${styles.input} ${error ? styles.error : ""}`} {...props} />
      {helper && <span className={styles.helper}>{helper}</span>}
      {error && <span className={styles.errorText}>{error}</span>}
    </label>
  );
};

export default Input;
