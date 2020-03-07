import React from "react";
import styles from "./BackButton.module.css";
import { useHistory } from "react-router-dom";

const BackButton = () => {
  const history = useHistory();
  return (
    <button
      className={styles.back}
      onClick={() => {
        history.goBack();
      }}
    >

    <svg width="19" height="33" viewBox="0 0 19 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5 2L2 16.5L16.5 31" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

    </button>
  );
};

export default BackButton;