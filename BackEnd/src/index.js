import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { createServer } from "http"; // Import createServer from the built-in 'http' module
import { Server } from "socket.io"; // Import Server from 'socket.io'

dotenv.config({
    path: './env'
});

let server;

connectDB()
    .then(() => {
        server = app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at PORT ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed:", err);
    });

// Create an HTTP server using the app
const httpServer = createServer(app);

// Create a new instance of Socket.IO server and attach it to the HTTP server
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Event handler for new connections
io.on("connection", (socket) => {
    console.log("A new client connected");
    
    socket.on('joinRoom', (room) => {
        socket.join(room); // Join the specified room
        console.log(`Client joined room: ${room}`);
    });

    // Event listener for 'liveComment'
    socket.on("liveComment", (data) => {
        console.log("Received live comment:", data);
        io.to("all").emit("sendLiveComment", data); // Emit to 'all' room
    });
});

// Start listening on the server
const PORT = process.env.SOCKET_PORT || 3000; // Specify a default port for the Socket.IO server
httpServer.listen(PORT, () => {
    console.log(`Socket.IO server is running on port ${PORT}`);
});
