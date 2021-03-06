import React from 'react';
import Detail from "./components/Detail/Detail"
import Threads from "./components/Threads/Threads"
import BackButton from "./components/BackButton/BackButton"
import Add from "./components/Add/Add"
import Login from "./components/Login/Login"
import styles from "./App.module.css";
import { Switch, Route, Link} from "react-router-dom";
import { ROUTES } from "./consts";

function App() {
  return (
    <>
      <header className={styles.header}>
        <BackButton />
        <Link className={styles.header__title} to={ROUTES.threads}>
          <h1>Forum</h1>
        </Link>
      </header>
      <div className={styles.container}>
        <Switch>

          <Route path={ROUTES.detail.path}>
            <Detail />
          </Route>

          <Route path={ROUTES.add}>
            <Add />
          </Route>

          <Route path={ROUTES.login}>
            <Login />
          </Route>

          <Route exact path={ROUTES.threads}>
            <Threads/>
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
