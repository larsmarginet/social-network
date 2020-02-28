import React from "react";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react-lite";

const TotalComments = ({total}) => {
    return useObserver(() => (
        <p className="comments__amount"><span className="comments__amount__num">{total}</span> comments</p>
      ));
};

TotalComments.propTypes = {
    total: PropTypes.number.isRequired
  };

export default TotalComments;