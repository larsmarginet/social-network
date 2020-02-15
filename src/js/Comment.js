import Published from './Published.js';
import {decorate, observable, configure} from 'mobx';

class Comment {
  constructor({name = 'Anonymous', text, repl, score = 0}) {
    this.name = name;
    this.date = new Published().fullDate();
    this.text = text;
    this.repl = repl;
    this.score = score;
  }
}

decorate(Comment, {
  score: observable
});

configure({enforceActions: 'observed'});

export default Comment;
