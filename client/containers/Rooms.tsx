import { useRef } from "react";
import EVENTS from "../config/events";
import { useSocket } from "../context/socket.context";
import styles from "../styles/Room.module.css";

function RoomsContainer() {
  const { socket, roomId, rooms } = useSocket();
  const newRoomRef = useRef(null);

  function handleCreateRoom() {
    //get the room name
    const roomName = newRoomRef.current.value || "";

    if (!String(roomName).trim()) return;

    // emit room created event
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    // set room name input to empty string
    newRoomRef.current.value = "";
  }

  function handleJoinRoom(id) {
    if (id === roomId) return;

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, id);
  }

  return (
    <nav className={styles.wrapper}>
      <div className={styles.createRoomWrapper}>
        <input ref={newRoomRef} placeholder='Room name' />
        <button className='cta' onClick={handleCreateRoom}>
          CREATE ROOM
        </button>
      </div>

      <ul className={styles.roomList}>
        {Object.keys(rooms).map((id) => {
          return (
            <div key={id}>
              <button
                disabled={id === roomId}
                title={`Join ${rooms[id].name}`}
                onClick={() => handleJoinRoom(id)}
              >
                {rooms[id].name}
              </button>
            </div>
          );
        })}
      </ul>
    </nav>
  );
}

export default RoomsContainer;
