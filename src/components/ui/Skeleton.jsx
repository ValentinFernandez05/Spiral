import React from "react";
import styles from "./Skeleton.module.css";

const Skeleton = ({ size = "md", full = true }) => {
  return (
    <div
      className={`${styles.skeleton} ${styles[size]} ${full ? styles.full : ""}`}
    />
  );
};

export default Skeleton;
