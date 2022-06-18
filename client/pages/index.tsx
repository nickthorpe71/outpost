import { useRef, useEffect } from "react";
import { useSocket } from "../context/socket.context";
import styles from "../styles/Home.module.css";

import RoomsContainer from "../containers/Rooms";
import MessagesContainer from "../containers/Messages";

export default function Home() {
  const { socket, username, setUsername } = useSocket();
  const usernameRef = useRef(null);

  function handleSetUsername() {
    const _username = usernameRef.current.value;
    if (_username) {
      setUsername(_username);
      localStorage.setItem("username", _username);
    }
  }

  useEffect(() => {
    usernameRef.current.value = localStorage.getItem("username") || "";
  }, []);

  return (
    <div>
      {!username && (
        <div>
          <div className={styles.usernameWrapper}>
            <div className={styles.usernameInner}></div>
          </div>
          <input placeholder='username' ref={usernameRef} />
          <button onClick={handleSetUsername}>START</button>
        </div>
      )}
      {username && (
        <div className={styles.container}>
          <RoomsContainer />
          <MessagesContainer />
        </div>
      )}
    </div>
  );
}
