import React, { useState } from "react";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react-lite";

const AnswerForm = ({comment, datastore, uiStore}) => {
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
            datastore.addComment($answer);
            uiStore.openAnswerForm(comment, false);
            setName("");
            setText("");
        }
      };

    return useObserver(() => (
        <form className={comment.answerForm ? 'answer__form' : 'answer__form--closed'} onSubmit={e => handleFormSubmit(e, comment)}>
            <label className="answer__form__label">Name<input className="answer__form__input name" value={name} type="text" onChange={e => setName(e.currentTarget.value)}/></label>
            <label className="answer__form__label">Answer<span className="answer__form__user">@{comment.name.replace(/ /g, '')}</span><textarea value={text} className="answer__form__input answer__form__input--comment comment" rows="4" onChange={e => setText(e.currentTarget.value)}></textarea></label>
            <button className="comment__form__submit" type="submit">Submit</button>
        </form>
      ));
};

AnswerForm.propTypes = {
    datastore: PropTypes.object.isRequired,
    uiStore: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired
  };

export default AnswerForm;