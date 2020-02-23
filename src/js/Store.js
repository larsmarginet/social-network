import Comment from './Comment.js';
import {decorate, observable, computed, action, configure} from 'mobx';
configure({ enforceActions: "observed" });

class Store {
  constructor() {
    this.name = undefined;
    this.text = undefined;
    this.comments = [];
    this.commentForm = false;
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

  setName(name) {
    this.name = name;
  }

  get getName() {
    return this.name;
  }

  setText(text) {
    this.text = text;
  }

  get getText() {
    return this.text;
  }


  openCommentForm(value) {
    this.commentForm = value;
  }

}

decorate(Store, {
  name: observable,
  text: observable,
  comments: observable,
  addComment: action,
  sortComments: computed,
  totalComments: computed,
  updateLike: action,
  updateDislike: action,
  seed: action,
  setName: action,
  setText: action,
  getName: computed,
  getText: computed,
  commentForm: observable,
  answerForm: observable,
  openCommentForm: action
});


export default Store;
