import DataStore from "../stores/DataStore";
import UiStore from "../stores/UiStore";
import Comment from '../models/Comment';
import Thread from '../models/Thread';
import User from '../models/User';
import { createContext } from "react";

const dataStore = new DataStore(); 
const uiStore = new UiStore();

const user1 = new User({name: "Lars Marginet", store: dataStore});
const user2 = new User({name: "Jelle Rouquart", store: dataStore});
const user3 = new User({name: "Bernie Sanders", store: dataStore});
const user4 = new User({name: "Joe Biden", store: dataStore});

const thread1 = new Thread({administrator: user3, question: "Once again I am asking for your financial support. 💰💵🤑", keywords: ["money", "campaign", "not me. Us"], users: [user1, user2], store: dataStore});
thread1.comments = [
  new Comment({user: user1, text: 'I’d love to donate to your campaign!', thread: thread1}),
  new Comment({user: user2, text: 'Me too!', repl: user1, thread: thread1}),
]

const thread2 = new Thread({administrator: user4, question: "Truth over facts!", keywords: ["democrat", "You know the thing", "Biden"], users: [user1, user2], store: dataStore})
thread2.comments = [
  new Comment({user: user1, text: 'Boy have you lost your mind, cause I will help you find it!', thread: thread2}),
  new Comment({user: user2, text: 'I will help too', repl: user1, thread: thread2}),
]


const rootStore = { dataStore: dataStore, uiStore: uiStore};
rootStore.dataStore.seed([thread1, thread2]);


export const storesContext = createContext(rootStore);
