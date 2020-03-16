import React from "react";
import { useObserver } from "mobx-react-lite";
import Comments from "../Comments/Comments";
import CommentForm from "../CommentForm/CommentForm";
import styles from "./Detail.module.css";
import { useStores } from "../../hooks";
import { useParams } from "react-router-dom";

const Detail = () => {
    const { dataStore } = useStores();
    const { id } = useParams();
    const thread = dataStore.threads.filter(el => el.id === id)[0];
    return useObserver(() => {
        if(! thread) {
            return <p>Thread not found...</p>
        }
        return (
        <>
            <section className={styles.question}>
                <h2 className={styles.question__name}>{thread.administrator.name}</h2>
                <p className={styles.question__date}>{thread.date}</p>
                <p className={styles.question__text}>{thread.question}</p>
                <ul className={styles.question__keywords}>
                    {thread.keywords.map(keyword => (
                        <li className={styles.question__keywords__keyword} key={keyword}>{keyword}</li>
                    ))}
                </ul>
            </section>
            <section className="comment">
                <CommentForm thread={thread}/>
            </section>
            <section className="comments">
                <h2 className="hidden">comments</h2>
                <Comments thread={thread}/>
            </section>
      </>
    )});
};



export default Detail;
