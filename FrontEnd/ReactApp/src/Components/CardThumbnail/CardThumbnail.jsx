import React from 'react'
import { useNavigate } from 'react-router-dom';

function CardThumbnail(props) {
    let videoId = props?.id
    const navigator=useNavigate()
    function onclikeHandleVideo() {
        console.log('Thumbnail clicked');
       
            console.log(" props?._id", props?.id);
      navigator( `/videoplayer/${videoId}`);
    }
    function SendToPlayListUserAcc() {
        let userId = props.videoOwner?._id;
        console.log("userId", userId);
        navigator(`/dashboard/${userId}`);
    }
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
    function formatteddurationFuction(seconds) {
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        if (hours >= 1) {
            return `${hours} hour `
        } else if (minutes >= 1) {
            return `${minutes} minutes`
        } else {
            return `${Math.floor(seconds)} seconds`
        }
    }
    const createdAt = props.createdAt;
    console.log("updatedAt", createdAt);
    const formattedTimeDifference = calculateTimeDifference(createdAt);

    const seconds = props?.duration
    const formattedDuration = formatteddurationFuction(seconds)

    return (

      
        <div className="each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative">
            <div onClick={onclikeHandleVideo} style={{ cursor: 'pointer' }}>
                <img className="w-full" src={props.thumbnail ||"https://www.google.com/imgres?imgurl=https%3A%2F%2Fhelpdeskgeek.com%2Fwp-content%2Fpictures%2F2021%2F09%2Fyoutube-error.jpeg&tbnid=Tkg0dl6VcFBV-M&vet=10CAIQxiAoAGoXChMI0IDai9bXhQMVAAAAAB0AAAAAEAc..i&imgrefurl=https%3A%2F%2Fhelpdeskgeek.com%2Fhow-to%2Fhow-to-fix-an-error-occurred-please-try-again-later-on-youtube%2F&docid=tLvdOt12ofcUAM&w=1024&h=556&itg=1&q=youtube%20errorthumbnail%20img&ved=0CAIQxiAoAGoXChMI0IDai9bXhQMVAAAAAB0AAAAAEAc"} alt="" />
            {/* <div className="badge absolute top-0 right-0 bg-red-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded">Live</div> */}
            <div className="desc p-4 text-gray-800">
                    <a href={`/videoplayer/${videoId}`} target="_new" className="title font-bold block cursor-pointer hover:underline">{props.title}</a>
                {/* <a href="https://www.youtube.com/user/sam14319" target="_new" className="badge bg-indigo-500 text-blue-100 rounded px-1 text-xs font-bold cursor-pointer">@dynamo_gaming</a> */}
                <div style={{ display: "flex", justifyContent:"space-between" }}>
                        <span className="description text-sm block py-2 border-gray-400 mb-2" >{formattedDuration}</span><span>{formattedTimeDifference}</span>
                </div>
                </div>
            </div>
            <div className="avatar" style={{ display: 'flex', alignItems: 'center', cursor:'pointer',}} onClick={SendToPlayListUserAcc}>
                    <img src={props.videoOwner?.avatar || '/vite.svg'} alt="Avatar" style={{ height: '30px', width: '30px', borderRadius: '50%', marginRight: '5px' }} />
                    <div className="username" style={{ fontSize: '16px', color: '#888888' }}>{props.videoOwner?.username || "Default Username"}</div>
               
            </div>
        </div>


    )
}

export default CardThumbnail
/* 

*/
