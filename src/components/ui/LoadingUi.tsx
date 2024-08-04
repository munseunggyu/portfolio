import React from "react";

import styles from "./LoadingUi.module.css";

export default function LoadingUi({
  size = 50,
  className
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      style={{
        width: size
      }}
      className={`${styles.loader} ${className}`}
    ></span>
  );
}
