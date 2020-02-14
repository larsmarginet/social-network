import './style.css';
import Store from './js/Store.js';
import Comment from './js/Comment.js';
import {configure, autorun} from 'mobx';

const renderUnread = ({totalUnreadComments}) => {
  document.querySelector('.comments__amount__num').textContent = totalUnreadComments;
};

const renderComments = store => {
  const $list = document.querySelector('.comments__list');
  $list.innerHTML = '';
  store.sortComments.forEach(comment => {
    $list.appendChild(createComment(comment, store));
  });
};

const handleClickLike = (comment, store) => {
  store.updateLike(comment);
};

const handleClickDislike = (comment, store) => {
  store.updateDislike(comment);
};

const createComment = (comment, store) => {
  const $li = document.createElement('li');
  $li.classList.add('comments__list__comment');
  let text;
  if (comment.repl) {
    text = `<span class="comments__list__comment__text__comment__tag">@${comment.repl}</span> ${comment.text}</p>`;
  } else {
    text = `${comment.text}</p>`;
  }
  let score;
  if (comment.score > 0) {
    score = `+${comment.score}`;
  } else {
    score = comment.score;
  }

  $li.innerHTML = `
    <div class="comments__list__comment__btns">
      <button class="comments__list__comment__btns__btn comments__list__comment__btns__btn--like">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 33.6667C26.19 33.6667 33.6667 26.19 33.6667 17C33.6667 7.81001 26.19 0.333344 17 0.333344C7.81 0.333344 0.333328 7.81001 0.333328 17C0.333328 26.19 7.81 33.6667 17 33.6667ZM17 8.66668L25.3333 17H18.6667V25.3333H15.3333V17H8.66666L17 8.66668Z" fill="#828282"/>
        </svg>
      </button>
      <p class="comments__list__comment__btns__score">${score}</p>
      <button class="comments__list__comment__btns__btn comments__list__comment__btns__btn--dislike">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 33.6667C26.19 33.6667 33.6667 26.19 33.6667 17C33.6667 7.81001 26.19 0.333344 17 0.333344C7.81 0.333344 0.333328 7.81001 0.333328 17C0.333328 26.19 7.81 33.6667 17 33.6667ZM17 8.66668L25.3333 17H18.6667V25.3333H15.3333V17H8.66666L17 8.66668Z" fill="#828282"/>
        </svg>
      </button>
    </div>
    <h2 class="comments__list__comment__text__name">${comment.name}</h2>
    <p class="comments__list__comment__text__date">${comment.date}</p>
    <p class="comments__list__comment__text__comment">${text}</p>
    <button class="comments__list__comment__answer"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.6667 3.99999H14.8334V10.6667C14.8334 11.125 14.4584 11.5 14 11.5H4.00002V12.3333C4.00002 13.25 4.75002 14 5.66669 14H14L17.3334 17.3333V5.66666C17.3334 4.74999 16.5834 3.99999 15.6667 3.99999ZM13.1667 8.16666V2.33332C13.1667 1.41666 12.4167 0.666656 11.5 0.666656H2.33335C1.41669 0.666656 0.666687 1.41666 0.666687 2.33332V13.1667L4.00002 9.83332H11.5C12.4167 9.83332 13.1667 9.08332 13.1667 8.16666Z" fill="white"/>
      </svg> Answer
    </button>`;
  $li.querySelector('.comments__list__comment__btns__btn--like').addEventListener('click', () => handleClickLike(comment, store));
  $li.querySelector('.comments__list__comment__btns__btn--dislike').addEventListener('click', () => handleClickDislike(comment, store));
  return $li;
};

const handleClickCommentBtn = store => {
  document.querySelector('.comment__preview').style.display = 'none';
  const $form = document.querySelector('.comment__form');
  $form.style.display = 'flex';
  $form.addEventListener('submit', e => handleFormSubmit(e, store));
};

const handleFormSubmit = (e, store) => {
  e.preventDefault();
  const input = e.currentTarget;
  const $name = input.querySelector('#name').value;
  const $comment = input.querySelector('#comment').value;
  const comment = {
    name: $name,
    comment: $comment
  };
  if (comment) {
    store.addComment(comment);
    e.currentTarget.reset();
  }
};


const init = () => {
  document.querySelector('.comment__preview').style.display = 'block';
  document.querySelector('.comment__btn').addEventListener('click', () => handleClickCommentBtn(store));
  document.querySelector('.comment__form').style.display = 'none';

  const store = new Store();
  window.store = store;

  const firstComments = [
    new Comment({name: 'Lars Marginet', date: '15/02/20', text: 'I’d love to donate to your campaign!'}),
    new Comment({name: 'Jelle Rouquart', date: '15/02/20', text: 'Me too!', repl: 'LarsMarginet'})
  ];
  store.seed(firstComments);

  autorun(() => {
    renderUnread(store);
    renderComments(store);
  });
};

configure({enforceActions: 'observed'});
init();
