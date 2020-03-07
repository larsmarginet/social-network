import React from "react";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react-lite";
import styles from "./TotalComments.module.css";

const TotalComments = ({total}) => {
    return useObserver(() => (
        <p className={styles.comments__amount}><span className={styles.comments__amount__num}>{total}</span> comments</p>
      ));
};

TotalComments.propTypes = {
    total: PropTypes.number.isRequired
  };

export default TotalComments;