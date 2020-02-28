import DataStore from './DataStore';
import Comment from '../models/Comment';
import Published from '../models/Published.js';

test('Create a new empty store', function() {
  const dataStore = new DataStore();
  expect(dataStore).not.toBeUndefined();
  expect(dataStore.comments.length).toBe(0);
});

test('Seed a store with comments', function() {
  const dataStore = new DataStore();
  dataStore.seed([new Comment({name: 'Test', date: '15/02/20', text: 'Test'})]);
  expect(dataStore.comments.length).toBe(1);
});

test('add a comment', () => {
  const dataStore = new DataStore();
  const date = new Published();
  dataStore.addComment({name: 'Test', date: '14/02/20', comment: 'Test'});
  expect(dataStore.comments.length).toBe(1);
  expect(dataStore.comments[0].name).toBe('Test');
  expect(dataStore.comments[0].date).toBe(date.fullDate());
  expect(dataStore.comments[0].text).toBe('Test');
  expect(dataStore.comments[0].repl).toBe(undefined);
});

test('add a reply', () => {
  const dataStore = new DataStore();
  const date = new Published();
  dataStore.addComment({name: 'Test', date: '14/02/20', comment: 'Test', repl: 'Kendrick'});
  expect(dataStore.comments.length).toBe(1);
  expect(dataStore.comments[0].name).toBe('Test');
  expect(dataStore.comments[0].date).toBe(date.fullDate());
  expect(dataStore.comments[0].text).toBe('Test');
  expect(dataStore.comments[0].repl).toBe('Kendrick');
});

test('Comments count', function() {
  const dataStore = new DataStore();
  dataStore.seed([new Comment({name: 'Test', date: '14/02/20', comment: 'Test', repl: 'Kendrick'})]);
  expect(dataStore.totalComments).toBe(1);
});

test('Comments order', function() {
  const dataStore = new DataStore();
  dataStore.seed([new Comment({name: 'num1', date: '14/02/20', comment: 'num1', repl: 'num1', score: 0}), {name: 'num2', date: '14/02/20', comment: 'num2', repl: 'num2', score: 3}]);
  expect(dataStore.sortComments[0].name).toBe('num2');
});

test('like', function() {
  const dataStore = new DataStore();
  const obj = {name: 'Test', date: '14/02/20', comment: 'Test', repl: 'Kendrick'};
  dataStore.addComment(obj);
  expect(dataStore.comments[0].score).toBe(0);
  dataStore.updateLike(dataStore.comments[0]);
  expect(dataStore.comments[0].score).toBe(1);
});

test('dislike', function() {
  const dataStore = new DataStore();
  const obj = {name: 'Test', date: '14/02/20', comment: 'Test', repl: 'Kendrick'};
  dataStore.addComment(obj);
  expect(dataStore.comments[0].score).toBe(0);
  dataStore.updateDislike(dataStore.comments[0]);
  expect(dataStore.comments[0].score).toBe(- 1);
});
