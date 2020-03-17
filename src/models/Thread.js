import Published from './Published.js';
import {decorate, observable, action, computed} from 'mobx';
import { v4 } from "uuid";


class Thread {
  constructor({administrator, id, comments = [], question, keywords = [], users = [], store }) {
    if (!id) {
      this.id = v4();
    } else {
      this.id = id;
    }
    this.administrator = administrator;
    this.question = question;
    this.comments = comments;
    this.keywords = keywords;
    this.date = new Published().fullDate();
    if (!store) {
      throw new Error("No store");
    }
    this.store = store;
    this.store.addThread(this);
    this.users = users;
    this.users.forEach(user => {
      user.linkThread(this);
    });
  }

  linkComment(comment) {
    !this.comments.includes(comment) && this.comments.push(comment);
  }

  linkUser(user) {
    !this.users.includes(user) && this.users.push(user);
    !user.threads.includes(user) && user.linkThread(this);
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
  linkUser: action,
  linkComment: action,
  totalComments: computed, 
  sortComments: computed,
  updateLike: action,
  updateDislike: action
});

export default Thread;
