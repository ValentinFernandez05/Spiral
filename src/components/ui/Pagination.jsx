import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ page, totalPages, onChange }) => {
  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  return (
    <div className={styles.pagination} aria-label="Paginación">
      {pages.map((current) => (
        <button
          key={current}
          className={`${styles.page} ${current === page ? styles.active : ""}`}
          onClick={() => onChange(current)}
        >
          {current}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
