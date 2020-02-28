import React from 'react';
import Comments from "./components/Comments";
import CommentForm from "./components/CommentForm";

function App({dataStore, uiStore}) {
  return (
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
        <CommentForm dataStore={dataStore} uiStore={uiStore}/>
      </section>
      <section className="comments">
        <h2 className="hidden">comments</h2>
        <Comments dataStore={dataStore} uiStore={uiStore}/>
      </section>
    </div>
    </>
  );
}

export default App;
