import Comment from './Comment.js';
import Published from './Published.js';
import {decorate, observable, computed, action} from 'mobx';

class Store {
  constructor() {
    this.comments = [];
  }

  addComment(input) {
    this.date = new Published();
    this.comments.push(new Comment({name: input.name, date: this.date.fullDate()}));
    console.log(this.comments);
  }

  get totalUnreadComments() {
    return this.comments.length;
  }

  seed(comments) {
    this.comments.push(...comments);
  }
}

decorate(Store, {
  comments: observable,
  addComment: action,
  totalUnreadComments: computed,
  seed: action
});

export default Store;
