import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks";
import Thread from "../Thread/Thread";

const Threads = () => {
    const { dataStore } = useStores();
    return useObserver(() => (
        <>
            <ul>
                {dataStore.threads.map(thread => (
                    <Thread thread={thread} key={thread.id}/>
                ))}
            </ul>
      </>
      ));
};



export default Threads;
