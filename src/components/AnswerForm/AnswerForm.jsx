import React, { useState } from "react";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks";
import styles from "./AnswerForm.module.css";


const AnswerForm = ({comment, thread}) => {
  const { uiStore } = useStores();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
    
  const handleFormSubmit = (e, comment) => {
        e.preventDefault();
        const $answer = {
            name: name,
            comment: text,
            repl: comment.name.replace(/ /g, '')
        };
        if ($answer) {
            thread.addComment($answer);
            uiStore.openAnswerForm(comment, false);
            setName("");
            setText("");
        }
      };

    return useObserver(() => (
        <form className={comment.answerForm ? styles.answer__form : styles.answer__formClosed} onSubmit={e => handleFormSubmit(e, comment)}>
            <label className={styles.answer__form__label}>Name<input className={styles.answer__form__input} value={name} type="text" onChange={e => setName(e.currentTarget.value)}/></label>
            <label className={styles.answer__form__label}>Answer<span className={styles.answer__form__user}>@{comment.name.replace(/ /g, '')}</span><textarea value={text} className={styles.answer__form__inputComment} rows="4" onChange={e => setText(e.currentTarget.value)}></textarea></label>
            <button className={styles.comment__form__submit} type="submit">Submit</button>
        </form>
      ));
};

AnswerForm.propTypes = {
    comment: PropTypes.object.isRequired,
    thread: PropTypes.object.isRequired
  };

export default AnswerForm;