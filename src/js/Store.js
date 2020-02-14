import Comment from './Comment.js';
import Published from './Published.js';
import {decorate, observable, computed, action} from 'mobx';

class Store {
  constructor() {
    this.comments = [];
  }

  addComment({name, comment}) {
    this.date = new Published();
    this.comments.push(new Comment({name: name, date: this.date.fullDate(), text: comment}));
  }

  get sortComments() {
    return this.comments.slice().sort((a, b) => b.score - a.score);
  }

  get totalUnreadComments() {
    return this.comments.length;
  }

  updateLike(comment) {
    comment.score ++;
  }

  updateDislike(comment) {
    comment.score --;
  }

  seed(comments) {
    this.comments.push(...comments);
  }
}

decorate(Store, {
  comments: observable,
  addComment: action,
  sortComments: computed,
  totalUnreadComments: computed,
  updateLike: action,
  updateDislike: action,
  seed: action
});


export default Store;
