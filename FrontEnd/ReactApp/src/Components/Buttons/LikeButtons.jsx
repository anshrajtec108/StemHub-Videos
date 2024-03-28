import React, { useState } from 'react';

const LikeButton = () => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(2050);

    const handleLikeClick = () => {
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    };

    return (
        <button
            onClick={handleLikeClick}
            style={{
                width: '140px',
                height: '35px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: liked ? '#4d88ff' : '#ffffff',
                color: liked ? '#ffffff' : '#333333',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                outline: 'none',
                transition: 'background-color 0.2s, color 0.2s',
                boxShadow: liked ? '0 0 5px rgba(0, 0, 0, 0.3)' : 'none',
            }}
        >
            <svg fill={liked ? '#ffffff' : '#333333'} viewBox="0 0 24 24" height="24" width="24" style={{ marginRight: '5px', transform: liked ? 'scale(1.2)' : 'scale(1)', transition: 'fill 0.2s' }}>
                <path d="M20.84,22.75L12.1,14.01l-8.74,8.74a1,1,0,0,1-1.41-1.41l9.49-9.49a1,1,0,0,1,1.41,0l9.49,9.49A1,1,0,0,1,20.84,22.75ZM12,4A7,7,0,0,0,6.21,18.28L12,13.86l5.79,4.42A7,7,0,0,0,12,4Z" />
            </svg>
            {liked ? 'Liked!' : 'Like'}
            <span style={{ marginLeft: '5px' }}>{likeCount}</span>
        </button>
    );
};

export default LikeButton;
