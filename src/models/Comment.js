import Published from './Published.js';
import {decorate, observable, configure} from 'mobx';
import { v4 } from "uuid";

class Comment {
  constructor({user, text, repl, score = 0, thread}) {
    if (!thread) {
      throw new Error("A comment must have a thread");
    }
    if (!user) {
      throw new Error("A comment must have a user");
    }
    this.date = new Published().fullDate();
    this.text = text;
    this.repl = repl;
    this.score = score;
    this.answerForm = false;
    this.id = v4(); 
    this.thread = thread;
    this.user = user;
    this.thread.linkComment(this);
    this.user.linkComment(this);
  }
}

decorate(Comment, {
  score: observable,
  answerForm: observable
});

configure({enforceActions: 'observed'});

export default Comment;
