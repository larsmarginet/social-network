import Thread from './Thread';
import Published from './Published.js';

test('add a reply', () => {
    const thread = new Thread({name: 'TestName', question: 'TestQuestion', keywords: ['key1', 'Key2']});
    const date = new Published();
    thread.addComment({name: 'Test', date: '14/02/20', comment: 'Test', repl: 'Kendrick'});
    expect(thread.comments.length).toBe(1);
    expect(thread.comments[0].name).toBe('Test');
    expect(thread.comments[0].date).toBe(date.fullDate());
    expect(thread.comments[0].text).toBe('Test');
    expect(thread.comments[0].repl).toBe('Kendrick');
  });
  
  test('Comments count', function() {
    const thread = new Thread({name: 'TestName', question: 'TestQuestion', keywords: ['key1', 'Key2']});
    thread.addComment({name: 'Test', date: '14/02/20', comment: 'Test', repl: 'Kendrick'});
    expect(thread.totalComments).toBe(1);
  });
  
  test('Comments order', function() {
    const thread = new Thread({name: 'TestName', question: 'TestQuestion', keywords: ['key1', 'Key2']});
    thread.addComment({name: 'name1', date: '15/02/20', comment: 'comment1', repl: 'repl1', score: 3});
    thread.addComment({name: 'name2', date: '15/02/20', comment: 'comment2', repl: 'repl2', score: 5});
    expect(thread.sortComments[0].name).toBe('name2');
  });

  test('like', function() {
    const comment = {name: 'Test', text: 'Test', repl: 'Test'};
    const thread = new Thread({name: 'TestName', question: 'TestQuestion', keywords: ['key1', 'Key2']});
    thread.addComment(comment);
    expect(thread.comments[0].name).toBe('Test');
    expect(thread.comments[0].score).toBe(0);
    thread.updateLike(thread.comments[0]);
    expect(thread.comments[0].score).toBe(1);
  });
  
  test('dislike', function() {
    const comment = {name: 'Test', text: 'Test', repl: 'Test'};
    const thread = new Thread({name: 'TestName', question: 'TestQuestion', keywords: ['key1', 'Key2']});
    thread.addComment(comment);
    expect(thread.comments[0].score).toBe(0);
    thread.updateDislike(thread.comments[0]);
    expect(thread.comments[0].score).toBe(-1);
  });
  