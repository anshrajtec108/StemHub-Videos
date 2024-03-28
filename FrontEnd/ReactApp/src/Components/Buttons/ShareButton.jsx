import React, { useState } from 'react';

const ShareButton = () => {
    const [showModal, setShowModal] = useState(false);
    const [copied, setCopied] = useState(false);

    const copyLink = () => {
        const el = document.createElement('textarea');
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    const closePopup = () => {
        setShowModal(false);
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block', color:'black', }}>
            <button
                onClick={() => setShowModal(true)}
                style={{
                    width: '140px',
                    height: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: '#ff7043',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'background-color 0.2s, color 0.2s',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                }}
            >
                Share
            </button>
            {showModal && (
                <div
                    className="share-modal"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 999,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#ffffff',
                            padding: '20px',
                            borderRadius: '10px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                            maxWidth: '300px',
                        }}
                    >
                        <button
                            onClick={closePopup}
                            style={{
                                top: '10px',
                                right: '10px',
                                border: '1px black',
                                background: 'none',
                                fontSize: '20px',
                                cursor: 'pointer',
                                fontWeight:"bolder"
                            }}
                        >
                            <h2>X</h2>
                        </button>
                        <h3 style={{ marginBottom: '10px', textAlign: 'center' }}>Share Link</h3>
                        <input
                            type="text"
                            value={window.location.href}
                            readOnly
                            style={{
                                width: '100%',
                                padding: '5px',
                                marginBottom: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                            }}
                        />
                        <button
                            onClick={copyLink}
                            style={{
                                width: '100%',
                                padding: '8px',
                                marginBottom: '10px',
                                backgroundColor: '#ff7043',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                outline: 'none',
                                transition: 'background-color 0.2s, color 0.2s',
                            }}
                        >
                            {copied ? 'Copied!' : 'Copy Link'}
                        </button>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button
                                style={{
                                    flex: '1',
                                    padding: '8px',
                                    backgroundColor: '#3b5998',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    outline: 'none',
                                    transition: 'background-color 0.2s, color 0.2s',
                                    marginRight: '5px',
                                }}
                            >
                                Share on Facebook
                            </button>
                            <button
                                style={{
                                    flex: '1',
                                    padding: '8px',
                                    backgroundColor: '#00acee',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    outline: 'none',
                                    transition: 'background-color 0.2s, color 0.2s',
                                    marginLeft: '5px',
                                }}
                            >
                                Share on Twitter
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShareButton;
