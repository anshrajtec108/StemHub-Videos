const NodeMediaServer = require("node-media-server");
const http = require("http").createServer();
const io = require("socket.io")(http);

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    allow_origin: "*",
    webroot: "./www", // Serve static files from this directory
  },
};

const nms = new NodeMediaServer(config);

nms.on("postPublish", (id, streamPath, args) => {
  // This event fires when a stream is published
  console.log("Stream started publishing:", streamPath);
  // Here you can broadcast an event with stream metadata to your frontend
  const metadata = {
    title: args.title || "Untitled",
    description: args.description || "",
    channel: args.channel || "Unknown",
    streamUrl: `http://yourdomain.com/live/${streamPath}.flv`, // Assuming FLV format
  };
  // Emit metadata to all connected clients
  io.emit("streamMetadata", metadata);
});

nms.run();

http.listen(8001, () => {
  console.log("Socket server listening on *:8001");
});
