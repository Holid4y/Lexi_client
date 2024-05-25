import React from "react";
import styles from "./styles.module.css";


const Skeleton = () => {
  return (
    <div className={styles.container}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className={styles.skeleton}>
          <div className={styles.title}>
          </div>
          <div className={styles.bottom}>
            <span className={styles.page}></span>
            <div className={styles.author}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
