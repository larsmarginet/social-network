import React from "react";
import { useObserver } from "mobx-react-lite";
import { Link } from "react-router-dom";
import styles from "./Thread.module.css";

const Thread = ({thread}) => {
    return useObserver(() => (
        <>
            <li>
                <Link className={styles.threadWrapper} to={`/detail/${thread.id}`}>
                    <section className={styles.thread}>
                        <p className={styles.thread__name}>{thread.name}<span className={styles.thread__name__totalComments}>{thread.totalComments}</span></p>
                        <p className={styles.thread__date}>{thread.date}</p>
                        <p className={styles.thread__text}>{thread.question}</p>
                        <ul className={styles.thread__keywords}>
                            {thread.keywords.map(keyword => (
                                <li className={styles.thread__keywords__keyword} key={keyword}>{keyword}</li>
                            ))}
                        </ul>
                    </section>
                </Link>
            </li>
      </>
      ));
};



export default Thread;
