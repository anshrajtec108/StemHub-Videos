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
        navigator(`/dashboard/${userId}`);
    }
    return (

      
        <div className="each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative">
            <div onClick={onclikeHandleVideo} style={{ cursor: 'pointer' }}>
            <img className="w-full" src={props.thumbnail} alt="" />
            {/* <div className="badge absolute top-0 right-0 bg-red-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded">Live</div> */}
            <div className="desc p-4 text-gray-800">
                    <a href={`/videoplayer/${videoId}`} target="_new" className="title font-bold block cursor-pointer hover:underline">{props.title}</a>
                {/* <a href="https://www.youtube.com/user/sam14319" target="_new" className="badge bg-indigo-500 text-blue-100 rounded px-1 text-xs font-bold cursor-pointer">@dynamo_gaming</a> */}
                <div style={{ display: "flex", justifyContent:"space-between" }}>
                    <span className="description text-sm block py-2 border-gray-400 mb-2" >{Math.round(props.duration)}</span><span>{props.updatedAt}</span>
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
