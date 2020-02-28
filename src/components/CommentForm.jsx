import React, { useState } from "react";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react-lite";

const CommentForm = ({dataStore, uiStore}) => {
    const [name, setName] = useState("");
    const [text, setText] = useState("");

    const handleFormSubmit = e => {
        e.preventDefault();
        const $comment = {
            name: name,
            comment: text
        };
        if ($comment) {
            dataStore.addComment($comment);
            uiStore.openCommentForm(false);
            setName("");
            setText("");
        }
    };

    return useObserver(() => (
        <section className="comment">
        <h2 className="hidden">Leave a comment...</h2>
        <div className={uiStore.commentForm ? 'preview--closed' : 'preview--open'}>
          <p className="comment__title">Leave a comment...</p>
          <button className="comment__btn" onClick={() => uiStore.openCommentForm(true)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.4 0H1.6C0.7176 0 0 0.7176 0 1.6V16L3.2 12.8H14.4C15.2824 12.8 16 12.0824 16 11.2V1.6C16 0.7176 15.2824 0 14.4 0Z" fill="white"/>
            </svg> Comment
          </button>
        </div>
        <form className={uiStore.commentForm ? 'comment__form' : 'comment__form--closed'} onSubmit={handleFormSubmit}>
          <label className="comment__form__label" htmlFor="name">Name</label>
          <input className="comment__form__input name" type="text" id="name" name="name" value={name} onChange={e => setName(e.currentTarget.value)}/>
          <label className="comment__form__label" htmlFor="comment">Comment</label>
          <p className="form-error"></p>
          <textarea className="comment__form__input comment__form__input--comment comment valid-input" id="comment" name="comment" rows="4" value={text} onChange={e => setText(e.currentTarget.value)} required></textarea>
          <button className="comment__form__submit" type="submit">Submit</button>
        </form>
      </section>
    ));
};

CommentForm.propTypes = {
    dataStore: PropTypes.object.isRequired,
    uiStore: PropTypes.object.isRequired
  };

export default CommentForm;