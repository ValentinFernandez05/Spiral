import React from "react";
import styles from "./Tabs.module.css";

const Tabs = ({ tabs = [], active, onChange }) => {
  return (
    <div className={styles.tabs} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`${styles.tab} ${active === tab.value ? styles.active : ""}`}
          onClick={() => onChange(tab.value)}
          role="tab"
          aria-selected={active === tab.value}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
