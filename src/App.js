import React from 'react';
import Detail from "./components/Detail/Detail"
import Threads from "./components/Threads/Threads"
import styles from "./App.module.css";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.header__title}>Forum</h1>
      </header>
      <div className={styles.container}>
        <Switch>
          <Route path="/detail/:id">
            <Detail />
          </Route>
      
          <Route exact path="/">
            <Threads />
          </Route>

          <Route>
            <p>Not found</p>
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
