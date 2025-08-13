import React, { useState, useEffect } from "react";
import { GlobalOutlined } from "@ant-design/icons";
import styles from "./LoadingScreen.module.scss";

const LoadingScreen = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onLoadingComplete();
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className={styles.loadingContainer}
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className={styles.animationContainer}>
        <GlobalOutlined className={styles.globeIcon} />
        <div className={styles.airplaneIcon} />
      </div>
      <div className={styles.loadingText}>Welcome to Nomad Gear</div>
      <div className={styles.subText}>
        Your adventure starts here. Preparing your travel essentials...
      </div>
    </div>
  );
};

export default LoadingScreen;