import dotenv from "dotenv";
import connectDB from "./db/index.js";
import  app  from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const port = process.env.PORT || 8000;
const socketPort = process.env.SOCKET_PORT || 3000;

// Start the Express server
connectDB()
    .then(() => {
        const server = app.listen(port, () => {
            console.log(`Express server is running at PORT ${port}`);
        });

        // Start the Socket.IO server
        const io = new Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });

        let roomName;

        io.on("connection", (socket) => {
            console.log("A new client connected");

            socket.on('joinRoom', (room) => {
                socket.join(room);
                roomName = room;
                console.log(`Client joined room: ${room}`);
            });

            socket.on("liveComment", (data) => {
                console.log("Received live comment:", data);
                io.to(roomName).emit("sendLiveComment", data);
            });
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed:", err);
    });
