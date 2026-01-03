import React from "react";
import styles from "./Badge.module.css";

const Badge = ({ tone = "default", children }) => {
  return <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>;
};

export default Badge;
