import React from "react";
import styles from "./Select.module.css";

const Select = ({ label, helper, options = [], ...props }) => {
  return (
    <label className={styles.field}>
      {label && <span className={styles.label}>{label}</span>}
      <select className={styles.select} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helper && <span className={styles.helper}>{helper}</span>}
    </label>
  );
};

export default Select;
