import {decorate, observable, action, configure} from 'mobx';

configure({ enforceActions: "observed" });

class DataStore {
  constructor() {
    this.threads = [];
    this.users = [];
    this.currentUser = undefined;
  }

  seed(threads) {
    this.threads = threads;
  }

  addThread(thread) {
    this.threads.push(thread);
  }

  addUser(user) {
    this.users.push(user);
  } 

  setCurrentUser(user) {
    this.currentUser = user;
  }
}

decorate(DataStore, {
  threads: observable,
  currentUser: observable,
  setCurrentUser: action,
  users: observable,
  addUser: action,
  seed: action,
  addThread: action
});


export default DataStore;
