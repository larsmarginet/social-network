import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks";
import { Link, Redirect } from "react-router-dom";
import Thread from "../Thread/Thread";
import styles from "./Threads.module.css"
import { ROUTES } from "../../consts";

const Threads = () => {
    const { dataStore } = useStores();
    return useObserver(() => (

        dataStore.currentUser ? (<>
            <ul>
                {dataStore.threads.slice().reverse().map(thread => (
                    <Thread thread={thread} key={thread.id}/>
                ))}
            </ul>

            <div className={styles.addWrapper}>
                <p className={styles.addText}>Open a thread...</p>
                <Link className={styles.addButton} to={ROUTES.add}>
                    open thread
                </Link>
            </div>
      </>) : <Redirect to={ROUTES.login}/>
        
      ));
};



export default Threads;
