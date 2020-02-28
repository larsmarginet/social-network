import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Store from './stores/Store';
import Comment from './models/Comment';



const store = new Store();
window.store = store;
store.seed([
  new Comment({name: 'Lars Marginet', date: '15/02/20', text: 'I’d love to donate to your campaign!'}),
  new Comment({name: 'Jelle Rouquart', date: '15/02/20', text: 'Me too!', repl: 'LarsMarginet'})
]);

ReactDOM.render(<App store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
