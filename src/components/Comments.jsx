import React from "react";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react-lite";
import Comment from "./Comment";
import TotalComments from "./TotalComments";

const Comments = ({dataStore, uiStore}) => {
    return useObserver(() => (
        <>
        <TotalComments total={dataStore.totalComments}/>
        <ul className="comments__list">
            {dataStore.sortComments.map(comment => 
                <Comment datastore={dataStore} uiStore={uiStore} comment={comment} key={comment.id}/>
            )}
        </ul>
        </>
      ));
};

Comments.propTypes = {
    dataStore: PropTypes.object.isRequired,
    uiStore: PropTypes.object.isRequired
  };

export default Comments;