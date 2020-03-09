import Published from './Published.js';
import Comment from './Comment';
import {decorate, observable, action, computed, configure} from 'mobx';
import { v4 } from "uuid";
configure({ enforceActions: "observed" });


class Thread {
  constructor({name, comments = [], question, keywords = []}) {
    this.id = v4();
    this.name = name;
    this.question = question;
    this.comments = comments;
    this.keywords = keywords;
    this.date = new Published().fullDate();
  }

  addComment({name, comment, repl, score = 0}) {
    this.comments.push(new Comment({name: name, text: comment, repl: repl, score: score}));
  }

  get totalComments() {
    return this.comments.length;
  }

  get sortComments() {
    return this.comments.slice().sort((a, b) => b.score - a.score);
  }

  updateLike(comment) {
    comment.score ++;
  }

  updateDislike(comment) {
    comment.score --;
  }
}

decorate(Thread, {
  comments: observable,
  addComment: action,
  totalComments: computed, 
  sortComments: computed,
  updateLike: action,
  updateDislike: action
});

export default Thread;