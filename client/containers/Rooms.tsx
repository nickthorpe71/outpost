import { useRef } from "react";
import { useSocket } from "../context/socket.context";
import EVENTS from "../config/events";

function RoomsContainer() {
  const { socket, roomId, rooms } = useSocket();
  const newRoomRef = useRef(null);

  function handleCreateRoom() {
    // get room name
    const roomName = newRoomRef.current.value || "";
    if (!String(roomName).trim()) return;

    // emit room created event
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    // set room name input back to empty string
    newRoomRef.current.value = "";
  }

  return (
    <nav>
      <div>
        <input ref={newRoomRef} placeholder='Room name' />
        <button onClick={handleCreateRoom}>CREATE ROOM</button>
      </div>
    </nav>
  );
}

export default RoomsContainer;
