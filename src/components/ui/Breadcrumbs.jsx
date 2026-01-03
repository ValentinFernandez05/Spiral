import React from "react";
import styles from "./Breadcrumbs.module.css";

const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={item.label} className={styles.item}>
          {item.href ? <a href={item.href}>{item.label}</a> : item.label}
          {index < items.length - 1 && <span className={styles.separator}>/</span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
