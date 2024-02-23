import React, { useEffect } from 'react';

function AutoEvent() {
    useEffect(() => {
        // const eventSource = new EventSource('http://localhost:8080/api/v1/event/autoevents');

        eventSource.onmessage = function (event) {
            const eventData = JSON.parse(event.data);
            console.log('Received event:', eventData);
            // Update UI or perform actions based on received event
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div className="App">
            {/* Your React application UI */}
        </div>
    );
}

export default AutoEvent;
