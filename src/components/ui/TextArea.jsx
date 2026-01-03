import React from "react";
import styles from "./TextArea.module.css";

const TextArea = ({ label, helper, ...props }) => {
  return (
    <label className={styles.field}>
      {label && <span className={styles.label}>{label}</span>}
      <textarea className={styles.textarea} {...props} />
      {helper && <span className={styles.helper}>{helper}</span>}
    </label>
  );
};

export default TextArea;
