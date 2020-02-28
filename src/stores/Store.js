import Comment from '../models/Comment';
import {decorate, observable, computed, action, configure} from 'mobx';
configure({ enforceActions: "observed" });

class Store {
  constructor() {
    this.post = {
      name: '',
      text: ''
    }
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

  setPost(value, input) {
    this.post[value] = input;
  }

  get getName() {
    return this.post.name;
  }

  get getText() {
    return this.post.text;
  }


  openCommentForm(value) {
    this.commentForm = value;
  }

}

decorate(Store, {
  post: observable,
  comments: observable,
  addComment: action,
  sortComments: computed,
  totalComments: computed,
  updateLike: action,
  updateDislike: action,
  seed: action,
  setPost: action,
  getName: computed,
  getText: computed,
  commentForm: observable,
  answerForm: observable,
  openCommentForm: action
});


export default Store;
