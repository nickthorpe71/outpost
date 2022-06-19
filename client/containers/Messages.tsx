import { useRef, useEffect } from "react";
import { useSocket } from "../context/socket.context";
import EVENTS from "../config/events";
import styles from "../styles/Messages.module.css";

function MessagesContainer() {
  const { socket, messages, roomId, username, setMessages } = useSocket();
  const newMessageRef = useRef(null);
  const messageEndRef = useRef(null);

  const date = new Date();

  function handleSendMessage() {
    const message = newMessageRef.current.value;
    if (!String(message).trim()) return;

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username });

    setMessages([
      ...messages,
      {
        username: "You",
        message,
        time: date.toLocaleTimeString(),
      },
    ]);

    newMessageRef.current.value = "";
  }

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!roomId) {
    return <div />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.messageList}>
        {messages.map(({ message, username, time }, index) => {
          return (
            <div key={index} className={styles.message}>
              <div key={index} className={styles.messageInner}>
                <span className={styles.messageSender}>
                  {username} - {time}
                </span>
                <span className={styles.messageBody}>{message}</span>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>
      <div className={styles.messageBox}>
        <textarea
          rows={1}
          placeholder='Tell us what you are thinking'
          ref={newMessageRef}
        />
        <button onClick={handleSendMessage}>SEND</button>
      </div>
    </div>
  );
}

export default MessagesContainer;
