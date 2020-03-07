import {decorate, observable, action, configure} from 'mobx';
import Thread from "../models/Thread";

configure({ enforceActions: "observed" });

class DataStore {
  constructor() {
    this.threads = [];
  }

  seed(threads) {
    this.threads = threads;
  }

  addThread({name, question, keywords}) {
    this.threads.push(new Thread({name: name, question: question, keywords: keywords}));
  }
}

decorate(DataStore, {
  threads: observable,
  seed: action,
  addThread: action
});


export default DataStore;
