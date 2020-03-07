import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks";
import styles from "./Add.module.css";
import { useHistory } from "react-router-dom";

const Add = () => {
    const { dataStore } = useStores();
    const [name, setName] = useState("");
    const [question, setQuestion] = useState("");
    const [keywords, setKeywords] = useState("");

    const history = useHistory();

    const handleFormSubmit = e => {
      e.preventDefault();
      const keywordArr = keywords.split(',');
      dataStore.addThread({name: name, question: question, keywords: keywordArr});
      history.push("/");
    }

    return useObserver(() => (
        <>
          <form onSubmit={handleFormSubmit}>
            <label className={styles.thread__form__label}>Name<input className={`${styles.thread__form__input} ${styles.name}`} value={name} type="text" onChange={e => setName(e.currentTarget.value)}/></label>
            <label className={styles.thread__form__label}>Question<textarea value={question} className={`${styles.thread__form__input} ${styles.thread__form__inputComment}`} rows="4" onChange={e => setQuestion(e.currentTarget.value)}></textarea></label>
            <label className={styles.thread__form__label}>Keywords <span className={styles.keywordsMessage}> separate with comma's</span><input className={`${styles.thread__form__input} ${styles.name}`} value={keywords} type="text" onChange={e => setKeywords(e.currentTarget.value)}/></label>
            <button className={styles.comment__form__submit} type="submit">Submit</button>
          </form>
        </>
      ));
};



export default Add;
