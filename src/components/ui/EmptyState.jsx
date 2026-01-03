import React from "react";
import styles from "./EmptyState.module.css";
import Button from "./Button";

const EmptyState = ({ title, description, actionLabel, onAction }) => {
  return (
    <div className={styles.empty}>
      <h3>{title}</h3>
      <p>{description}</p>
      {actionLabel && (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
