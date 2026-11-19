import React from "react";
import styles from "./loading.module.scss";

export default function Loading() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className={styles.loader}></div>
    </main>
  );
}
