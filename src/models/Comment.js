import Published from './Published.js';
import {decorate, observable, configure} from 'mobx';
import { v4 } from "uuid";

class Comment {
  constructor({name = 'Anonymous', text, repl, score = 0}) {
    this.name = name;
    this.date = new Published().fullDate();
    this.text = text;
    this.repl = repl;
    this.score = score;
    this.answerForm = false;
    this.id = v4(); 
  }
}

decorate(Comment, {
  score: observable,
  answerForm: observable
});

configure({enforceActions: 'observed'});

export default Comment;
