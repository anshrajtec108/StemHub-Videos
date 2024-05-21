import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const port = process.env.PORT || 8000;
const socketPort = process.env.SOCKET_PORT || 3000;

let server;

// Connect to MongoDB and start Express server
connectDB()
    .then(() => {
        server = app.listen(port, () => {
            console.log(`Express server is running at PORT ${port}`);
        });

        // Start the Socket.IO server
        const httpServer = createServer(app);
        const io = new Server(httpServer, {
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

        httpServer.listen(socketPort, () => {
            console.log(`Socket.IO server is running on port ${socketPort}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed:", err);
    });
