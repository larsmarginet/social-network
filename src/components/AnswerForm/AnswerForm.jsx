import React, { useState } from "react";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks";
import styles from "./AnswerForm.module.css";
import Comment from "../../models/Comment"


const AnswerForm = ({comment, thread}) => {
  const { dataStore, uiStore } = useStores();
  const [text, setText] = useState("");
    
  const handleFormSubmit = e => {
        e.preventDefault();
        if (text) {
          new Comment({
            text: text,
            repl: comment.user, 
            thread: thread, 
            user: dataStore.currentUser}
          );

          uiStore.openAnswerForm(comment, false);
          setText("");
        }
      };

    return useObserver(() => (
        <form className={comment.answerForm ? styles.answer__form : styles.answer__formClosed} onSubmit={handleFormSubmit}>
            <label className={styles.answer__form__label}>Answer<span className={styles.answer__form__user}>@{comment.user.name.replace(/ /g, '')}</span><textarea value={text} className={styles.answer__form__inputComment} rows="4" onChange={e => setText(e.currentTarget.value)}></textarea></label>
            <button className={styles.comment__form__submit} type="submit">Submit</button>
        </form>
      ));
};

AnswerForm.propTypes = {
    comment: PropTypes.object.isRequired,
    thread: PropTypes.object.isRequired
  };

export default AnswerForm;