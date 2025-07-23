const WebSocket = require("ws"); // Import WebSocket Library

const PORT = 5000; // Setting Port. Online may not need it

const webSocketServer = new WebSocket.Server({
  // Setup WebSocket
  port: PORT,
});

webSocketServer.on("connection", function (socket) {
  console.log("A client has connected!");
  // console.log(socket._socket.remoteAddress);

  socket.on("message", function (message) {
    console.log("Received: " + message);

    webSocketServer.clients.forEach(function (client) {
      // client.send(message); // Send message received to all connected clients

      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on("close", () => {
    console.log("A client has disconnected!");
  });
});

console.log(new Date() + " Server is listening on port " + PORT);
