import DataStore from '../stores/DataStore'
import User from '../models/User'
import Thread from '../models/Thread'
import Comment from '../models/Comment'

test("Create a new thread", () => {
  const dataStore = new DataStore();
  const user = new User({ name: "test", store: dataStore });
  const thread = new Thread({ administrator: user, store: dataStore, question: 'testquestion' });
  expect(thread.administrator.name).toBe("test");
  expect(thread.question).toBe("testquestion");
  expect(thread.comments.length).toBe(0);
  expect(thread.keywords.length).toBe(0);
  expect(thread.users.length).toBe(0);
  expect(thread.store).toBe(dataStore);
});

test("Can't create a thread without a store", () => {
  const dataStore = new DataStore();
  const user = new User({ name: "test", store: dataStore });
  expect(() => new Thread({ administrator: user, question: 'testquestion' })).toThrow();
});

test("DataStore must have a reference to a created thread", () => {
  const dataStore = new DataStore();
  const user = new User({ name: "test", store: dataStore });
  expect(dataStore.threads.length).toBe(0);
  const thread = new Thread({ administrator: user, store: dataStore, question: 'testquestion' });
  expect(dataStore.threads.length).toBe(1);
  expect(dataStore.threads[0]).toStrictEqual(thread);
});

test("Add user to group", () => {
  const dataStore = new DataStore();
  const admin = new User({ name: "test", store: dataStore });
  const thread = new Thread({ administrator: admin, store: dataStore, question: 'testquestion' });
  expect(thread.users.length).toBe(0);
  const user = new User({ name: "user", store: dataStore });
  thread.linkUser(user);
  expect(thread.users.length).toBe(1);
  expect(thread.users[0]).toBe(user);
  expect(thread.users[0].threads).toContain(thread);
});

test("Can only add the same user once to a thread", () => {
  const dataStore = new DataStore();
  const admin = new User({ name: "test", store: dataStore });
  const thread = new Thread({ administrator: admin, store: dataStore, question: 'testquestion' });
  expect(thread.users.length).toBe(0);
  const user = new User({ name: "user", store: dataStore });
  thread.linkUser(user);
  expect(thread.users.length).toBe(1);
  thread.linkUser(user);
  expect(thread.users.length).toBe(1);
});

test("totalComments is correct", () => {
  const dataStore = new DataStore();
  const admin = new User({ name: "test", store: dataStore });
  const thread = new Thread({ administrator: admin, store: dataStore, question: 'testquestion' });
  expect(thread.totalComments).toBe(0);
  const comment = new Comment({ text: "test", user: admin, thread: thread });
  thread.linkComment(comment);
  expect(thread.totalComments).toBe(1);
});

test("sortComments works", () => {
  const dataStore = new DataStore();
  const admin = new User({ name: "test", store: dataStore });
  const thread = new Thread({ administrator: admin, store: dataStore, question: 'testquestion' });
  const comment1 = new Comment({ text: "test1", user: admin, thread: thread });
  const comment2 = new Comment({ text: "test2", user: admin, thread: thread, score: 5 });
  thread.linkComment(comment1);
  thread.linkComment(comment2);
  expect(thread.sortComments[0]).toBe(comment2);
});

test("updateLike works", () => {
  const dataStore = new DataStore();
  const admin = new User({ name: "test", store: dataStore });
  const thread = new Thread({ administrator: admin, store: dataStore, question: 'testquestion' });
  const comment = new Comment({ text: "test1", user: admin, thread: thread });
  thread.linkComment(comment);
  expect(comment.score).toBe(0);
  thread.updateLike(comment);
  expect(comment.score).toBe(1);
});

test("updateDislike works", () => {
  const dataStore = new DataStore();
  const admin = new User({ name: "test", store: dataStore });
  const thread = new Thread({ administrator: admin, store: dataStore, question: 'testquestion' });
  const comment = new Comment({ text: "test1", user: admin, thread: thread });
  thread.linkComment(comment);
  expect(comment.score).toBe(0);
  thread.updateDislike(comment);
  expect(comment.score).toBe(-1);
});

test("Users provided on Thread instantiation must have a refence to the created thread", () => {
  const dataStore = new DataStore();
  const admin = new User({ name: "test", store: dataStore });
  const user = new User({ name: "user", store: dataStore });
  const thread = new Thread({ administrator: admin, store: dataStore, question: 'testquestion', users: [user] });
  expect(user.threads[0]).toBe(thread);
});