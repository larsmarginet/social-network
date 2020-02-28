import {decorate, observable, action, configure} from 'mobx';
configure({ enforceActions: "observed" });

class UiStore {
  constructor() {
    this.commentForm = false;
    this.answer = undefined;
  }

  openCommentForm(value) {
    this.commentForm = value;
  }

  openAnswerForm(obj, value) {
    this.answer = obj;
    this.answer.answerForm = value;
  }

}

decorate(UiStore, {
  commentForm: observable,
  answer: observable,
  openCommentForm: action, 
  openAnswerForm: action
});


export default UiStore;
