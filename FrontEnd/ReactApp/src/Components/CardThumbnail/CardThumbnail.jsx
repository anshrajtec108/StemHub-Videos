import React from 'react'

function CardThumbnail(props) {
    function onclikeHandle() {
        console.log('Thumbnail clicked');
        let videoId = props?._id
        window.location.href = `/videoplayer/${videoId}`;

    }
    // function SendToPlayListUserAcc() {
    //     let userId = playlistdata.playListOwner[0]?._id;
    //     navigate(`/dashboard/${userId}`);
    // }
    return (<div onClick={onclikeHandle}>


        <div className="each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative">
            <img className="w-full" src={props.thumbnail} alt="" />
            {/* <div className="badge absolute top-0 right-0 bg-red-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded">Live</div> */}
            <div className="desc p-4 text-gray-800">
                <a href="https://www.youtube.com/watch?v=dvqT-E74Qlo" target="_new" className="title font-bold block cursor-pointer hover:underline">{props.title}</a>
                {/* <a href="https://www.youtube.com/user/sam14319" target="_new" className="badge bg-indigo-500 text-blue-100 rounded px-1 text-xs font-bold cursor-pointer">@dynamo_gaming</a> */}
                <div style={{ display: "flex", justifyContent:"space-between" }}>
                    <span className="description text-sm block py-2 border-gray-400 mb-2" >{Math.round(props.duration)}</span><span>{props.updatedAt}</span>
                </div>
            </div>
        </div>


    </div>
    )
}

export default CardThumbnail
/* 

*/
