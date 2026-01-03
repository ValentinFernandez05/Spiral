import React from "react";
import styles from "./DatePicker.module.css";

const DatePicker = ({ label, helper, ...props }) => {
  return (
    <label className={styles.field}>
      {label && <span className={styles.label}>{label}</span>}
      <input type="date" className={styles.input} {...props} />
      {helper && <span className={styles.helper}>{helper}</span>}
    </label>
  );
};

export default DatePicker;
