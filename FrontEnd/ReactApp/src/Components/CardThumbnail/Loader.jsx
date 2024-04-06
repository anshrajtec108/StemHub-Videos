import React from 'react';
import './cssFile.css'; // Import CSS file for styling

function Loader() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
               
            }}
        >
            <div
                style={{
                    width: '60px',
                    height: '60px',
                    border: '10px solid #ccc',
                    borderTop: '10px solid #3498db',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                }}
            ></div>
            <style>
                {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
            </style>
        </div>
    );
}

export default Loader;
