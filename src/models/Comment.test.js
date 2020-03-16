import DataStore from '../stores/DataStore'
import User from '../models/User'
import Thread from '../models/Thread'
import Comment from '../models/Comment'

test("Create a message", () => {
  const dataStore = new DataStore();
  const user = new User({ name: "test", store: dataStore });
  const thread = new Thread({ administrator: user, store: dataStore });
  const comment = new Comment({ text: "test", user: user, thread: thread });
  expect(comment.text).toBe("test");
  expect(comment.score).toBe(0);
  expect(comment.repl).toBe(undefined);
  expect(comment.user).toBeInstanceOf(Object);
  expect(comment.thread).toBeInstanceOf(Object);
});

test("Create an answer", () => {
  const dataStore = new DataStore();
  const user = new User({ name: "test", store: dataStore });
  const thread = new Thread({ administrator: user, store: dataStore });
  const comment = new Comment({ text: "test", user: user, thread: thread, repl: user });
  expect(comment.text).toBe("test");
  expect(comment.score).toBe(0);
  expect(comment.repl).toBeInstanceOf(Object);
  expect(comment.user).toBeInstanceOf(Object);
  expect(comment.thread).toBeInstanceOf(Object);
});

test("Comment must have a user", () => {
  const dataStore = new DataStore();
  const user = new User({ name: "test", store: dataStore });
  const thread = new Thread({ administrator: user, store: dataStore });
  expect(() => new Comment({ text: "test", thread: thread })).toThrow("A comment must have a user");
});

test("Comment must have a thread", () => {
  const dataStore = new DataStore();
  const user = new User({ name: "test", store: dataStore });
  expect(() => new Comment({ text: "test", user: user})).toThrow("A comment must have a thread");
});

test("User must have a reference to a created comment", () => {
  const dataStore = new DataStore();
  const user = new User({ name: "test", store: dataStore });
  const thread = new Thread({ administrator: user, store: dataStore });
  const comment = new Comment({ text: "test", user: user, thread: thread });
  expect(comment.user).toBe(user);
  expect(comment.user.comments).toContain(comment);
});

test("Thread must have a reference to a created comment", () => {
  const dataStore = new DataStore();
  const user = new User({ name: "test", store: dataStore });
  const thread = new Thread({ administrator: user, store: dataStore });
  const comment = new Comment({ text: "test", user: user, thread: thread });
  expect(comment.thread).toBe(thread);
  expect(comment.thread.comments).toContain(comment);
});
