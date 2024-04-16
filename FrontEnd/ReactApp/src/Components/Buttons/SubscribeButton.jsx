import { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { BiSolidBellRing } from "react-icons/bi";
import { makePostRequest } from '../../services/api';

const SubscribeButton = (props) => {
    const [subscribed, setSubscribed] = useState(props?.isSubscribe);
    console.log("subscribed from SubscribeButton ",subscribed);
    console.log("channelId from SubscribeButton ",props?.channelId);
    const handleClick = () => {
        setSubscribed(prevState => !prevState);
        makePostRequest(`/subscriptions/c/${props?.channelId}`)
    };

    return (
        <>
            <button
                style={{
                    position: "relative",
                    overflow: "hidden",
                    width: "140px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "linear-gradient(to right, #ff0000, #990000)",
                    backgroundSize: "250%",
                    backgroundPosition: "left",
                    color: "#ffd277",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transitionDuration: "1s"
                }}
                onClick={handleClick}
            >
                <span
                    style={{
                        position: "absolute",
                        color: "#ffd277",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "97%",
                        height: "90%",
                        borderRadius: "8px",
                        transitionDuration: "1s",
                        backgroundColor: "rgb(255, 68, 59)",
                        backgroundSize: "200%"
                    }}
                >
                    {subscribed ? (
                        <>
                            
                            Unsubscribe <BiSolidBellRing style={{ marginLeft: '5px' }} />
                        </>
                    ) : (
                        <>
                            Subscribe <FaBell style={{ marginLeft: '5px' }} />
                        </>
                    )}
                </span>
            </button>
        </>
    );
};

export default SubscribeButton;
