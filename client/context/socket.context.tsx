import { createContext, useContext, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";
import EVENTS from "../config/events";

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  roomId?: string;
  rooms: object;
}

const socket = io(SOCKET_URL);
const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  rooms: {},
});

function SocketProvider(props: any) {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState({});

  socket.on(EVENTS.SERVER.ROOMS, (responseRooms) => {
    setRooms(responseRooms);
  });

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        roomId,
        setRoomId,
        rooms,
        setRooms,
      }}
      {...props}
    />
  );
}
export const useSocket = () => useContext(SocketContext);

export default SocketProvider;
