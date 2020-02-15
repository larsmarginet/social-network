import {decorate, observable, configure} from 'mobx';

class Comment {
  constructor({name = 'Anonymous', date, text, repl, score = 0}) {
    this.name = name;
    this.date = date;
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
