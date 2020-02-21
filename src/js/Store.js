import Comment from './Comment.js';
import {decorate, observable, computed, action, configure} from 'mobx';
configure({ enforceActions: "observed" });

class Store {
  constructor() {
    this.comments = [];
  }

  addComment({name, comment, repl}) {
    this.comments.push(new Comment({name: name, text: comment, repl: repl}));
  }

  get sortComments() {
    return this.comments.slice().sort((a, b) => b.score - a.score);
  }

  get totalComments() {
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
  totalComments: computed,
  updateLike: action,
  updateDislike: action,
  seed: action
});


export default Store;
