import { useRef } from "react";
import { useSocket } from "../context/socket.context";
import EVENTS from "../config/events";

function MessagesContainer() {
  const { socket, messages, roomId, username, setMessages } = useSocket();
  const newMessageRef = useRef(null);

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
        time: `${date.getHours()}:${date.getMinutes()}`,
      },
    ]);

    newMessageRef.current.value = "";
  }

  if (!roomId) {
    return <div />;
  }

  return (
    <div>
      {messages.map(({ message }, index) => {
        return <p key={index}>{JSON.stringify(message)}</p>;
      })}

      <div>
        <textarea rows={1} placeholder='type here...' ref={newMessageRef} />
        <button onClick={handleSendMessage}>SEND</button>
      </div>
    </div>
  );
}

export default MessagesContainer;
