import React from "react";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react-lite";
import AnswerForm from "../AnswerForm/AnswerForm";
import { useStores } from "../../hooks";
import styles from "./Comment.module.css";

const Comment = ({comment, thread}) => {
  const { uiStore } = useStores();
    return useObserver(() => (
        <li key={comment.text} className={styles.comments__list__comment}>
              <div className={styles.comments__list__comment__btns}>
                <button className={`${styles.comments__list__comment__btns__btn} ${styles.comments__list__comment__btns__btnLike}`} onClick={() => thread.updateLike(comment)}>
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 33.6667C26.19 33.6667 33.6667 26.19 33.6667 17C33.6667 7.81001 26.19 0.333344 17 0.333344C7.81 0.333344 0.333328 7.81001 0.333328 17C0.333328 26.19 7.81 33.6667 17 33.6667ZM17 8.66668L25.3333 17H18.6667V25.3333H15.3333V17H8.66666L17 8.66668Z" fill="#828282"/>
                  </svg>
                </button>
                <p className={styles.comments__list__comment__btns__score}>{comment.score > 0 ? `+${comment.score}` : comment.score}</p>
                <button className={`${styles.comments__list__comment__btns__btn} ${styles.comments__list__comment__btns__btnDislike}`} onClick={() => thread.updateDislike(comment)}>
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 33.6667C26.19 33.6667 33.6667 26.19 33.6667 17C33.6667 7.81001 26.19 0.333344 17 0.333344C7.81 0.333344 0.333328 7.81001 0.333328 17C0.333328 26.19 7.81 33.6667 17 33.6667ZM17 8.66668L25.3333 17H18.6667V25.3333H15.3333V17H8.66666L17 8.66668Z" fill="#828282"/>
                  </svg>
                </button>
              </div>
              <h2 className={styles.comments__list__comment__text__name}>{comment.name}</h2>
              <p className={styles.comments__list__comment__text__date}>{comment.date}</p>
              {comment.repl ? <p className={styles.comments__list__comment__text__comment}><span className={styles.comments__list__comment__text__comment__tag}>@{comment.repl}</span> {comment.text}</p> : <p className={styles.comments__list__comment__text__comment}>{comment.text}</p>}
              <button className={styles.comments__list__comment__answer} onClick={() => uiStore.openAnswerForm(comment, true)}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.6667 3.99999H14.8334V10.6667C14.8334 11.125 14.4584 11.5 14 11.5H4.00002V12.3333C4.00002 13.25 4.75002 14 5.66669 14H14L17.3334 17.3333V5.66666C17.3334 4.74999 16.5834 3.99999 15.6667 3.99999ZM13.1667 8.16666V2.33332C13.1667 1.41666 12.4167 0.666656 11.5 0.666656H2.33335C1.41669 0.666656 0.666687 1.41666 0.666687 2.33332V13.1667L4.00002 9.83332H11.5C12.4167 9.83332 13.1667 9.08332 13.1667 8.16666Z" fill="white"/>
                </svg> Answer
              </button>
              <AnswerForm thread={thread} comment={comment}/>
            </li>
      ));
};

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    thread: PropTypes.object.isRequired
  };

export default Comment;