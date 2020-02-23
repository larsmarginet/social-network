import React from 'react';
import ReactDOM from 'react-dom';
import {useObserver} from 'mobx-react-lite';
import './style.css';
import './js/validate.js';
import Store from './js/Store.js';
import Comment from './js/Comment.js';



const store = new Store();
window.store = store;
store.seed([
  new Comment({name: 'Lars Marginet', date: '15/02/20', text: 'I’d love to donate to your campaign!'}),
  new Comment({name: 'Jelle Rouquart', date: '15/02/20', text: 'Me too!', repl: 'LarsMarginet'})
]);

const handleClickLike = comment => {
  store.updateLike(comment);
};

const handleClickDislike = comment => {
  store.updateDislike(comment);
};

const handleOpenAnswerForm = comment => {
  comment.openAnswerForm(true);
};

const handleFormSubmit = (e, input) => {
  e.preventDefault();
  const $comment = {
    name: input.name,
    comment: input.text
  };
  if (input.repl) {
    $comment.repl = input.repl;
  }
  if ($comment) {
    store.addComment($comment);
    if (input.comment){
      input.comment.openAnswerForm(false);
    } else {
      store.openCommentForm(false);
    }
    e.currentTarget.reset();
  }
};

const handleShowForm = () => {
  store.openCommentForm(true);
}

// APP

const App = () => {
  return useObserver(() => (
    <>
    <header className="header">
      <h1 className="header__title">Forum</h1>
    </header>
    <div className="container">
      <section className="question">
        <h2 className="question__name">Bernie Sanders</h2>
        <p className="question__date">14/02/20</p>
        <p className="question__text">Once again I am asking for your financial support. <span role="img" aria-label="money">💰💵🤑</span></p>
        <ul className="question__keywords">
          <li className="question__keywords__keyword">financial support</li>
          <li className="question__keywords__keyword">campaign</li>
          <li className="question__keywords__keyword">elections</li>
        </ul>
      </section>
      <section className="comment">
        <h2 className="hidden">Leave a comment...</h2>
        <div className={store.commentForm ? 'preview--closed' : 'preview--open'}>
          <p className="comment__title">Leave a comment...</p>
          <button className="comment__btn" onClick={handleShowForm}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.4 0H1.6C0.7176 0 0 0.7176 0 1.6V16L3.2 12.8H14.4C15.2824 12.8 16 12.0824 16 11.2V1.6C16 0.7176 15.2824 0 14.4 0Z" fill="white"/>
            </svg> Comment
          </button>
        </div>
        <form className={store.commentForm ? 'comment__form' : 'comment__form--closed'} onSubmit={e => handleFormSubmit(e, {name: store.getName, text: store.getText})}>
          <label className="comment__form__label" htmlFor="name">Name</label>
          <input className="comment__form__input name" type="text" id="name" name="name" onChange={e => store.setName(e.currentTarget.value)}/>
          <label className="comment__form__label" htmlFor="comment">Comment</label>
          <p className="form-error"></p>
          <textarea className="comment__form__input comment__form__input--comment comment valid-input" id="comment" name="comment" rows="4" onChange={e => store.setText(e.currentTarget.value)} required></textarea>
          <button className="comment__form__submit" type="submit">Submit</button>
        </form>
      </section>
      <section className="comments">
        <h2 className="hidden">comments</h2>
        <p className="comments__amount"><span className="comments__amount__num">{store.totalComments}</span> comments</p>
        <ul className="comments__list">
        {/* comment list */}
          {store.sortComments.map(comment =>
            <li key={comment.text} className="comments__list__comment">
              <div className="comments__list__comment__btns">
                <button className="comments__list__comment__btns__btn comments__list__comment__btns__btn--like" onClick={() => handleClickLike(comment)}>
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 33.6667C26.19 33.6667 33.6667 26.19 33.6667 17C33.6667 7.81001 26.19 0.333344 17 0.333344C7.81 0.333344 0.333328 7.81001 0.333328 17C0.333328 26.19 7.81 33.6667 17 33.6667ZM17 8.66668L25.3333 17H18.6667V25.3333H15.3333V17H8.66666L17 8.66668Z" fill="#828282"/>
                  </svg>
                </button>
                <p className="comments__list__comment__btns__score">{comment.score > 0 ? `+${comment.score}` : comment.score}</p>
                <button className="comments__list__comment__btns__btn comments__list__comment__btns__btn--dislike" onClick={() => handleClickDislike(comment)}>
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 33.6667C26.19 33.6667 33.6667 26.19 33.6667 17C33.6667 7.81001 26.19 0.333344 17 0.333344C7.81 0.333344 0.333328 7.81001 0.333328 17C0.333328 26.19 7.81 33.6667 17 33.6667ZM17 8.66668L25.3333 17H18.6667V25.3333H15.3333V17H8.66666L17 8.66668Z" fill="#828282"/>
                  </svg>
                </button>
              </div>
              <h2 className="comments__list__comment__text__name">{comment.name}</h2>
              <p className="comments__list__comment__text__date">{comment.date}</p>
              {comment.repl ? <p className="comments__list__comment__text__comment"><span className="comments__list__comment__text__comment__tag">@{comment.repl}</span> {comment.text}</p> : <p className="comments__list__comment__text__comment">{comment.text}</p>}
              <button className="comments__list__comment__answer" onClick={() => handleOpenAnswerForm(comment)}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.6667 3.99999H14.8334V10.6667C14.8334 11.125 14.4584 11.5 14 11.5H4.00002V12.3333C4.00002 13.25 4.75002 14 5.66669 14H14L17.3334 17.3333V5.66666C17.3334 4.74999 16.5834 3.99999 15.6667 3.99999ZM13.1667 8.16666V2.33332C13.1667 1.41666 12.4167 0.666656 11.5 0.666656H2.33335C1.41669 0.666656 0.666687 1.41666 0.666687 2.33332V13.1667L4.00002 9.83332H11.5C12.4167 9.83332 13.1667 9.08332 13.1667 8.16666Z" fill="white"/>
                </svg> Answer
              </button>
              <form className={comment.answerForm ? 'answer__form' : 'answer__form--closed'} onSubmit={e => handleFormSubmit(e, {name: store.getName, text: store.getText, repl: comment.name.replace(/ /g, ''), comment})}>
                <label className="answer__form__label">Name<input className="answer__form__input name" type="text" onChange={e => store.setName(e.currentTarget.value)}/></label>
                <label className="answer__form__label">Answer<span className="answer__form__user">@{comment.name.replace(/ /g, '')}</span><textarea className="answer__form__input answer__form__input--comment comment" rows="4" onChange={e => store.setText(e.currentTarget.value)}></textarea></label>
                <button className="comment__form__submit" type="submit">Submit</button>
              </form>
            </li>)}
          {/* comment list */}
        </ul>
      </section>
    </div>
    </>
  ));
};

ReactDOM.render(<App />, document.getElementById('root'));

// APP


