import React from "react";
import styles from "./ToastStack.module.css";

const ToastStack = ({ toasts }) => {
  return (
    <div className={styles.stack} aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div key={toast.id} className={`${styles.toast} ${styles[toast.tone]}`}>
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastStack;
