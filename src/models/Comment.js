import Published from './Published.js';
import {decorate, observable, configure, action} from 'mobx';

class Comment {
  constructor({name = 'Anonymous', text, repl, score = 0}) {
    this.name = name;
    this.date = new Published().fullDate();
    this.text = text;
    this.repl = repl;
    this.score = score;
    this.answerForm = false;
  }

  openAnswerForm(value) {
    this.answerForm = value;
  }
}

decorate(Comment, {
  score: observable,
  answerForm: observable,
  openAnswerForm: action
});

configure({enforceActions: 'observed'});

export default Comment;
