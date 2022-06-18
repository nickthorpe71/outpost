import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
import logger from "./utils/logger";

const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
  },
};

function socket({ io }: { io: Server }) {
  logger.info(`Socket enabled`);

  io.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`User connected ${socket.id}`);

    socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
      console.log({ roomName });

      // create roomId

      // add a new room to the rooms object

      // join the room(roomId)

      // broadcast event saying there is a new room

      // emit back to room creator with all rooms

      // emit event back to room creator saying they have joined a room
    });
  });
}

export default socket;
