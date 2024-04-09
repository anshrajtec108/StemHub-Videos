import React from 'react';

function SmallCardThumbnail(props) {
    const handleClick = () => {
        let videoId = props.videos?._id;
        window.location.href = `/videoplayer/${videoId}`;
    };
    function calculateTimeDifference(updatedAt) {
        const currentDate = new Date();
        const updatedDate = new Date(updatedAt);

        // Calculate time difference in milliseconds
        const timeDifference = currentDate - updatedDate;

        // Convert milliseconds to seconds, minutes, hours, days, months, and years
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (years >= 1) {
            return `${years} year${years > 1 ? 's' : ''} ago`;
        } else if (months >= 1) {
            return `${months} month${months > 1 ? 's' : ''} ago`;
        } else if (days >= 1) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours >= 1) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes >= 1) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return '1 minute ago'; // Minimum 1 minute
        }
    }
    function formatteddurationFuction(seconds){
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        if(hours>=1){
            return `${hours} hour `
        }else if(minutes >= 1){
            return `${minutes} minutes`
        }else{
            return `${Math.floor(seconds)} seconds`
        }
    }
    const updatedAt = props.videos.updatedAt; // Example updated date
    const formattedTimeDifference = calculateTimeDifference(updatedAt);
  
    const seconds = props.videos?.duration
    const formattedDuration = formatteddurationFuction(seconds)
    console.log(formattedDuration);
    return (
        <div onClick={handleClick} className="card-container" style={{ height: '180px', width: '350px', display: 'flex', alignItems: 'center', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginTop: "20px", backgroundColor: '#ffffff', overflow: 'hidden' }}>
            <img className="thumbnail-image" src={props.videos?.thumbnail || '/vite.svg'} alt="" style={{ height: '100%', width: 'auto', objectFit: 'cover', marginRight: '10px' }} />
            <div className="card-details" style={{ flexGrow: 1, padding: '8px' }}>
                <div className="title" style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '14px', color: '#333333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.videos?.title || "Default Title"}</div>
                <div className="description" style={{ marginBottom: '5px', fontSize: '12px', color: '#666666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.videos?.description || "Default Description"}</div>
                <div className="avatar" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={props.videoOwner?.avatar || '/vite.svg'} alt="Avatar" style={{ height: '20px', width: '20px', borderRadius: '50%', marginRight: '5px' }} />
                    <div className="username" style={{ fontSize: '12px', color: '#888888' }}>{props.videoOwner?.username || "Default Username"}</div>
                </div>
                <div className="details" style={{ display: 'flex', alignItems: 'center', }}>
                    <div className="date" style={{ fontSize: '10px', color: '#999999', marginRight:"14px"}}>{formattedTimeDifference || "Default Date"}</div>
                    <div className="duration" style={{ fontSize: '10px', color: '#999999' }}>{formattedDuration || "Default duration"}</div>
                </div>
                <div className="views" style={{ fontSize: '10px', color: '#999999' }}>{props.videos?.views || "Default views"}</div>
               
            </div>
        </div>
    );
}

export default SmallCardThumbnail;
