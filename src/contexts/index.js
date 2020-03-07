import DataStore from "../stores/DataStore";
import UiStore from "../stores/UiStore";
import Comment from '../models/Comment';
import Thread from '../models/Thread';
import { createContext } from "react";

const t1 = new Thread({ name: "Bernie Sanders", question: "Once again I am asking for your financial support. 💰💵🤑", 
comments: [
  new Comment({name: 'Lars Marginet', date: '15/02/20', text: 'I’d love to donate to your campaign!'}),
  new Comment({name: 'Jelle Rouquart', date: '15/02/20', text: 'Me too!', repl: 'LarsMarginet'})
], 
keywords: ["money", "campaign", "not me. Us"] });

const t2 = new Thread({ name: "Joe Biden", question: "Truth over facts!", 
comments: [
  new Comment({name: 'Lars Marginet', date: '15/02/20', text: 'Boy have you lost your mind, cause I will help you find it!'}),
  new Comment({name: 'Jelle Rouquart', date: '15/02/20', text: 'I will help too', repl: 'LarsMarginet'})
],
keywords: ["democrat", "You know the thing", "Biden"]});

const rootStore = { dataStore: new DataStore(), uiStore: new UiStore() };
rootStore.dataStore.seed([t1, t2]);


export const storesContext = createContext(rootStore);
