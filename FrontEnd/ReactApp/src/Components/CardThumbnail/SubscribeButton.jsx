const SubscribeButton = () => {
    return (
        <>
            <button
                style={{
                    position: "relative",
                    overflow: "hidden",
                    width: "140px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "linear-gradient(to right, #77530a, #ffd277, #77530a, #77530a, #ffd277, #77530a)",
                    backgroundSize: "250%",
                    backgroundPosition: "left",
                    color: "#ffd277",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transitionDuration: "1s"
                }}
                onClick={() => console.log('Button clicked')}
            >
                <span
                    style={{
                        position: "absolute",
                        content: "SUBSCRIBE",
                        color: "#ffd277",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "97%",
                        height: "90%",
                        borderRadius: "8px",
                        transitionDuration: "1s",
                        backgroundColor: "255, 68, 59",
                        backgroundSize: "200%"
                    }}
                >
                    SUBSCRIBE
                </span>
            </button>
        </>
    );
};

export default SubscribeButton;
