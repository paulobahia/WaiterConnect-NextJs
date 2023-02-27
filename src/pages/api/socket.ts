import { Server } from "socket.io";
import websocketHandler from "../../utils/websocketHandler";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  io.listen(7070)
  res.socket.server.io = io;

  const onConnection = (socket) => {
    websocketHandler(io, socket);
  };

  io.on("connection", onConnection);

  console.log("Setting up socket");
  res.end();
}