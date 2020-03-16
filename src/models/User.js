import { v4 } from "uuid";

class User {
  constructor({ id = v4(), name, store}) {
    this.id = id;
    this.name = name;
    this.comments = [];
    this.threads = [];
    if (!store) {
      throw new Error("No store");
    }
    this.store = store;
    this.store.addUser(this);
  }

  linkComment(comment) {
    !this.comments.includes(comment) && this.comments.push(comment);
  }

  linkAnswer(answer) {
    !this.answers.includes(answer) && this.answers.push(answer);
  }

  linkThread(thread) {
    !this.threads.includes(thread) && this.threads.push(thread);
    !thread.users.includes(this) && thread.linkUser(this);
  }
}

export default User;
