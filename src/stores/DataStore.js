import {decorate, observable, action, configure} from 'mobx';
configure({ enforceActions: "observed" });

class DataStore {
  constructor() {
    this.threads = [];
    this.currentThread = undefined;
  }

  seed(threads) {
    this.threads = threads;
  }

  setCurrentThread(thread) {
    this.currentThread = thread;
  }

  updateLike(comment) {
    comment.score ++;
  }

  updateDislike(comment) {
    comment.score --;
  }
}

decorate(DataStore, {
  threads: observable,
  currentThread: observable,
  seed: action,
  setCurrentThread: action,
  updateLike: action,
  updateDislike: action
});


export default DataStore;
