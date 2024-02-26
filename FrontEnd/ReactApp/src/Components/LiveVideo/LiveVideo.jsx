import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import SimplePeer from 'simple-peer';

function LiveVideo() {
    const [peer, setPeer] = useState(null);
    const webcamRef = useRef(null);

    useEffect(() => {
        const initializePeer = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                const peerInstance = new SimplePeer({ initiator: true, stream });

                peerInstance.on('signal', data => {
                    // Send peer signal to the server or other peer
                    console.log('Sending signal:', data);
                });

                peerInstance.on('stream', stream => {
                    // Handle incoming stream
                    console.log('Incoming stream:', stream);
                });

                setPeer(peerInstance);
            } catch (error) {
                console.error('Error accessing media devices:', error);
            }
        };

        initializePeer();

        // Cleanup function
        return () => {
            if (peer) {
                peer.destroy();
            }
        };
    }, [peer]); // Add peer to the dependency array

    return (
        <div className="App">
            <h1>Live Streaming App</h1>
            <div className="webcam-container">
                <Webcam ref={webcamRef} muted={true} />
            </div>
        </div>
    );
}

export default LiveVideo;
