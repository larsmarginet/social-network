import React from "react";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react-lite";
import Comment from "../Comment/Comment";
import TotalComments from "../TotalComments/TotalComments";

const Comments = ({thread}) => {
    return useObserver(() => (
        <>
        <TotalComments total={thread.totalComments}/>
        <ul>
            {thread.sortComments.map(comment => 
                <Comment thread={thread} comment={comment} key={comment.id}/>
            )}
        </ul>
        </>
      ));
};

Comments.propTypes = {
    thread: PropTypes.object.isRequired
};

export default Comments;