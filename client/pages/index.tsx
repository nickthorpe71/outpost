import styles from '../styles/Home.module.css'
import {useSocket} from '../context/socket.context';

import RoomsContainer from '../containers/Rooms';
import MessagesContainer from '../containers/Messages';
import { useRef } from 'react';

export default function Home() {
  const {socket, username, setUsername} = useSocket();
  const usernameref = useRef(null);

  function handleSetUsername() {
    const _username = usernameref.current.value;
    if (_username) {
      setUsername(_username);
      localStorage.setItem("username", _username);
    }
  }

  return <div>
    {!username && (
      <div>
        <div className={styles.usernameWrapper}>
          <div className={styles.usernameInner}>
          </div>
        </div>
        <input placeholder="username" ref={usernameref} />
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
}
