import DataStore from './DataStore';
import Comment from '../models/Comment';
import Thread from '../models/Thread';
import Published from '../models/Published.js';

test('Create a new empty store', function() {
  const dataStore = new DataStore();
  expect(dataStore).not.toBeUndefined();
  expect(dataStore.threads.length).toBe(0);
});

test('Seed a store with comments', function() {
  const dataStore = new DataStore();
  dataStore.seed([new Thread({ name: "Bernie Sanders", question: "Once again I am asking for your financial support. 💰💵🤑", 
  comments: [
    new Comment({name: 'Lars Marginet', date: '15/02/20', text: 'I’d love to donate to your campaign!'}),
    new Comment({name: 'Jelle Rouquart', date: '15/02/20', text: 'Me too!', repl: 'LarsMarginet'})
  ], 
  keywords: ["money", "campaign", "not me. Us"]})]);
  expect(dataStore.threads.length).toBe(1);
});

test('add a thread', () => {
  const dataStore = new DataStore();
  const date = new Published();
  dataStore.addThread({name: 'TestName', question: 'TestQuestion', keywords: ['key1', 'Key2']});
  expect(dataStore.threads.length).toBe(1);
  expect(dataStore.threads[0].name).toBe('TestName');
  expect(dataStore.threads[0].date).toBe(date.fullDate());
  expect(dataStore.threads[0].question).toBe('TestQuestion');
  expect(dataStore.threads[0].keywords.length).toBe(2);
  expect(dataStore.threads[0].keywords[1]).toBe('Key2');
});

