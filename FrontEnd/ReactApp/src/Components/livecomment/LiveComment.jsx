import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";

const host = "ws://localhost:3000"; // Replace with your Socket.IO server URL
const socket = io.connect(host);

function LiveComment() {
    const [data, setData] = useState("");
    const [input, setInput] = useState("");
    const room = "all"; // Room name

    useEffect(() => {
        // Join the room when the component mounts
        socket.emit('joinRoom', room);

        // Set up event listener for 'sendLiveComment' event
        socket.on('sendLiveComment', (comment) => {
            setData(prevData => prevData + JSON.stringify(comment));
        });

        // Clean up event listener when component unmounts
        return () => {
            socket.off('sendLiveComment');
        };
    }, [room]); // Re-run effect when the room changes

    const handleClick = () => {
        if (input.trim() !== '') {
            // Emit the comment to the specific room
            socket.emit('liveComment', { comment: input.trim(), room });
            setInput('');
        }
    };

    return (
        <div>
            <h2>Live Comments</h2>
            <div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your comment"
                />
                <button onClick={handleClick}>Send</button>
            </div>
            <div>
                <strong>Comments:</strong>
                <div style={{ whiteSpace: 'pre-wrap' }}>{data}</div>
            </div>
        </div>
    );
}

export default LiveComment;
