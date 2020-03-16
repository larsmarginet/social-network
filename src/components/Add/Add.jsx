import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks";
import styles from "./Add.module.css";
import { useHistory } from "react-router-dom";
import Thread from "../../models/Thread";

const Add = () => {
    const { dataStore } = useStores();
    const [question, setQuestion] = useState("");
    const [keywords, setKeywords] = useState("");

    const history = useHistory();

    const handleFormSubmit = e => {
      e.preventDefault();
      const keywordArr = keywords.split(',');
      new Thread({administrator: dataStore.currentUser, question: question, keywords: keywordArr, store: dataStore});
      history.push("/");
    }

    return useObserver(() => (
        <>
          <form onSubmit={handleFormSubmit}>
            <label className={styles.thread__form__label}>Question<textarea value={question} className={styles.thread__form__input} rows="4" onChange={e => setQuestion(e.currentTarget.value)}></textarea></label>
            <label className={styles.thread__form__label}>Keywords <span className={styles.keywordsMessage}> separate with comma's</span><input className={styles.thread__form__input} value={keywords} type="text" onChange={e => setKeywords(e.currentTarget.value)}/></label>
            <button className={styles.comment__form__submit} type="submit">Submit</button>
          </form>
        </>
      ));
};



export default Add;
