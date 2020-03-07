import React from 'react';
import Detail from "./components/Detail/Detail"
import Threads from "./components/Threads/Threads"
import BackButton from "./components/BackButton/BackButton"
import Add from "./components/Add/Add"
import styles from "./App.module.css";
import { Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <header className={styles.header}>
        <BackButton />
        <Link className={styles.header__title} to={`/`}>
          <h1>Forum</h1>
        </Link>
      </header>
      <div className={styles.container}>
        <Switch>
          <Route path="/detail/:id">
            <Detail />
          </Route>

          <Route path="/add">
            <Add />
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
