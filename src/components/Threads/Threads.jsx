import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks";
import { Link } from "react-router-dom";
import Thread from "../Thread/Thread";
import styles from "./Threads.module.css"

const Threads = () => {
    const { dataStore } = useStores();
    return useObserver(() => (
        <>
            <ul>
                {dataStore.threads.slice().reverse().map(thread => (
                    <Thread thread={thread} key={thread.id}/>
                ))}
            </ul>

            <div className={styles.addWrapper}>
                <p className={styles.addText}>Open a thread...</p>
                <Link className={styles.addButton} to='/add'>
                    open thread
                </Link>
            </div>
      </>
      ));
};



export default Threads;
