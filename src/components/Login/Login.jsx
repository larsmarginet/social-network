import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks";
import styles from "./Login.module.css";
import { useHistory } from "react-router-dom";
import User from "../../models/User";
import { ROUTES } from "../../consts";

const Login = () => {
  const { dataStore } = useStores();
  const [name, setName] = useState("");

  const history = useHistory();

  const handleFormSubmit = e => {
      e.preventDefault();
      if (name) {
        const user = new User({name: name, store: dataStore});
        dataStore.setCurrentUser(user);
        setName("");
        history.push(ROUTES.threads);
      }
  };

  return useObserver(() => (
    <section>
    <p className={styles.text}>Enter a username...</p>
      <form className={styles.name} onSubmit={handleFormSubmit}>
        <label className={styles.name__form__label} htmlFor="name">Name</label>
        <input className={styles.name__form__input} type="text" id="name" name="name" value={name} onChange={e => setName(e.currentTarget.value)}/>
        <button className={styles.name__form__submit} type="submit">Submit</button>
      </form>
    </section>
  ));
};

export default Login;