import Store from './Store';
import Comment from './Comment';
import Published from './Published.js';

test('Create a new empty store', function() {
  const store = new Store();
  expect(store).not.toBeUndefined();
  expect(store.comments.length).toBe(0);
});

test('Seed a store with comments', function() {
  const store = new Store();
  store.seed([new Comment({name: 'Test', date: '15/02/20', text: 'Test'})]);
  expect(store.comments.length).toBe(1);
});

test('add a comment', () => {
  const store = new Store();
  const date = new Published();
  store.addComment({name: 'Test', date: '14/02/20', comment: 'Test'});
  expect(store.comments.length).toBe(1);
  expect(store.comments[0].name).toBe('Test');
  expect(store.comments[0].date).toBe(date.fullDate());
  expect(store.comments[0].text).toBe('Test');
  expect(store.comments[0].repl).toBe(undefined);
});

test('add a reply', () => {
  const store = new Store();
  const date = new Published();
  store.addComment({name: 'Test', date: '14/02/20', comment: 'Test', repl: 'Kendrick'});
  expect(store.comments.length).toBe(1);
  expect(store.comments[0].name).toBe('Test');
  expect(store.comments[0].date).toBe(date.fullDate());
  expect(store.comments[0].text).toBe('Test');
  expect(store.comments[0].repl).toBe('Kendrick');
});

test('Comments count', function() {
  const store = new Store();
  store.seed([new Comment({name: 'Test', date: '14/02/20', comment: 'Test', repl: 'Kendrick'})]);
  expect(store.totalComments).toBe(1);
});

test('Comments order', function() {
  const store = new Store();
  store.seed([new Comment({name: 'num1', date: '14/02/20', comment: 'num1', repl: 'num1', score: 0}), {name: 'num2', date: '14/02/20', comment: 'num2', repl: 'num2', score: 3}]);
  expect(store.sortComments[0].name).toBe('num2');
});

test('like', function() {
  const store = new Store();
  const obj = {name: 'Test', date: '14/02/20', comment: 'Test', repl: 'Kendrick'};
  store.addComment(obj);
  expect(store.comments[0].score).toBe(0);
  store.updateLike(store.comments[0]);
  expect(store.comments[0].score).toBe(1);
});

test('dislike', function() {
  const store = new Store();
  const obj = {name: 'Test', date: '14/02/20', comment: 'Test', repl: 'Kendrick'};
  store.addComment(obj);
  expect(store.comments[0].score).toBe(0);
  store.updateDislike(store.comments[0]);
  expect(store.comments[0].score).toBe(- 1);
});
