import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makePatchRequest } from '../../services/api';
import { saveChangeInHistory, savechangeInPlayList, saveisChangeFromHistory } from '../../store/reducers/currentPlayinfo';

function SmallCardThumbnail(props) {
    let PlaylistId =props?.PlaylistId
   
    let videoId = props.videos?._id;
   let currentplayInfo = useSelector((store) => store.currentPlayinfo);
    let user = useSelector((store) => store.user);
    let dispatch = useDispatch()
    let CurrentuserId = user.userId
    let IsPlayList = currentplayInfo.IsplayList
    const navigate= useNavigate()
    const [showDelete,setShowDelete]=useState(false)
    const handleThumbnailClick = () => {
      
       navigate(`/videoplayer/${videoId}`);
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

    function SendToPlayListUserAcc(e) {
        e.stopPropagation();
        let userId = props.videoOwner?._id;
        navigate(`/dashboard/${userId}`);
    }
    function ShowDeleteOption(){
        console.log('props.playListOwnerDetail?._id', props.playListOwnerDetail?._id);
        console.log('CurrentuserId', CurrentuserId);
        console.log('IsPlayList', IsPlayList);
        const userObjString = localStorage.getItem('userObj');
        const userObj = JSON.parse(userObjString);
        if (IsPlayList && (props.playListOwnerDetail?._id == userObj._id)){
            setShowDelete(true)
        } else if (props.historyPage){
            setShowDelete(true)
        }else{
            setShowDelete(false)
        }
    }
     async function handelDelete(e){
        e.stopPropagation();
        if(IsPlayList){
            console.log("delete is click");
            const res = await makePatchRequest(`/playlist/remove/${videoId}/${PlaylistId}`,{},{},{})
            console.log('res delee playList video',res);
            dispatch(savechangeInPlayList())
        } else if (props.historyPage){
            console.log('props.historyPage', props.historyPage);
            const res = await makePatchRequest(`/users/history/remove/${videoId}`,{},{},{})
            console.log('res delee history video', res);
            dispatch(saveChangeInHistory())
            dispatch(saveisChangeFromHistory(true))
        }    else{
            alert('ERROR on Delete event ')
        }

        // console.log("delete is click");
    }
    useEffect(()=>{
        ShowDeleteOption()
    }, [props.historyPage, IsPlayList, props.playListOwnerDetail?._id,])
    // useEffect(()=>{
    //     return ()=>{
    //         dispatch(saveisChangeFromHistory(true))
    //     }
    // },[])
    return (
        <div className="card-container" style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginTop: "20px", backgroundColor: '#ffffff', overflow: 'hidden' }}>
            <style jsx>{`
    button:hover {
       
        background-color: lightgrey;
    }
`}</style>
            <div onClick={handleThumbnailClick} style={{ height: '180px', width: '100%', display: 'flex', alignItems: 'center', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff', overflow: 'hidden' }} >
                <img className="thumbnail-image" src={props.videos?.thumbnail || '/vite.svg'} alt="" style={{ flex: 1, height: '100%', minWidth: '350px', maxWidth: '380px', marginRight: '10px' }} />
                <div className="card-details" style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column' }}>
                    <div className="title" style={{ width: '100%',maxWidth:'90%' ,fontWeight: 'bold', marginBottom: '5px', fontSize: '14px', color: '#333333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'flex',}}>
                        {props.videos?.title || "Default Title"}
                      
                    </div>
                    <div className="description" style={{ marginBottom: '5px', fontSize: '12px', color: '#666666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {props.videos?.description || "Default Description"}
                    </div>
                    <div className="avatar" style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                        <img src={props.videoOwner?.avatar || '/vite.svg'} alt="Avatar" style={{ height: '20px', width: '20px', borderRadius: '50%', marginRight: '5px' }} onClick={SendToPlayListUserAcc} />
                        <div className="username" style={{ fontSize: '12px', color: '#888888' }} onClick={SendToPlayListUserAcc}>
                            {props.videoOwner?.username || "Default Username"}
                            <button onClick={handelDelete}> <span style={{ position: 'relative', display: showDelete ? 'block' : 'none', marginLeft: '60px', fontSize: '19px', fontWeight: 'bold' }}>❌</span></button>
                        </div>
                    </div>
                    <div className="details" style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                        <div className="date" style={{ fontSize: '10px', color: '#999999', marginRight: "14px" }}>
                            {formattedTimeDifference || "Default Date"}
                        </div>
                        <div className="duration" style={{ fontSize: '10px', color: '#999999' }}>
                            {`${formattedDuration}...` || "Default duration"}
                        </div>
                    </div>
                    <div className="views" style={{ fontSize: '10px', color: '#999999', marginTop: '5px' }}>
                        {`${props.videos?.views} views.` || 0}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SmallCardThumbnail;
