import './style.css';
import {configure, autorun} from 'mobx';



const init = () => {
  autorun(() => {

  });
};

configure({enforceActions: 'observed'});
init();
