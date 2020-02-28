import Comment from './Comment.js';
import Published from './Published.js';

test('Create a comment', () => {
  const date = new Published();
  const comment = new Comment({name: 'Test', text: 'Test'});
  expect(comment.name).toBe('Test');
  expect(comment.date).toBe(date.fullDate());
  expect(comment.text).toBe('Test');
  expect(comment.repl).toBe(undefined);
  expect(comment.score).toBe(0);
});

test('Create an anonymous comment', () => {
  const date = new Published();
  const comment = new Comment({text: 'Test'});
  expect(comment.name).toBe('Anonymous');
  expect(comment.date).toBe(date.fullDate());
  expect(comment.text).toBe('Test');
  expect(comment.repl).toBe(undefined);
  expect(comment.score).toBe(0);
});

test('Create an answer', () => {
  const date = new Published();
  const comment = new Comment({name: 'Test', text: 'Test', repl: 'Test'});
  expect(comment.name).toBe('Test');
  expect(comment.date).toBe(date.fullDate());
  expect(comment.text).toBe('Test');
  expect(comment.repl).toBe('Test');
  expect(comment.score).toBe(0);
});

