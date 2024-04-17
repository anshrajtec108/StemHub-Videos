import React, { useEffect, useState } from 'react';
import { makeGetRequest } from '../../services/api';
import LikeButton from '../Buttons/LikeButtons';
import ShareButton from '../Buttons/ShareButton';
import SubscribeButton from '../Buttons/SubscribeButton';
import { useParams } from 'react-router-dom';
import CommentList from '../Comment/Comment'


const VideoPlayer = () => {
    const { videoId } = useParams();
    let channelId;
    const [videoData, setVideoData] = useState({});
    const [isSubscribed, setIsSubscribed] = useState('false');
    const [isLiked, setIsLiked] = useState(false);

    const FetchVideoInfo = async () => {
        try {
            const res = await makeGetRequest(`/videos/${videoId}`, {}, {});
            console.log(res.data[0]);
            setVideoData(res.data[0]);
            channelId = res.data[0].channelId
            if ( videoData) {
                // Only make additional API calls if videoData contains valid data
                await isVideoIsLikedByUser(videoId);
              
                await isUserIsSubscribed(channelId);
                
            }
        } catch (error) {
            console.log(error);
        }
    };

    const isUserIsSubscribed = async (channelId) => {
        try {
            console.log(channelId);
            const res = await makeGetRequest(`/subscriptions/isSubscribed/${channelId}`, {}, {});
            if (res.data===true){
            setIsSubscribed(true); }
            else{
                setIsSubscribed(false)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const isVideoIsLikedByUser = async (videoId) => {
        try {
            const res = await makeGetRequest(`/likes/isVideoLiked/${videoId}`, {}, {});
            console.log("isVideoIsLikedByUser",res.data)
            if (res.data === true) {
                setIsLiked(true);
            }
            else {
                setIsLiked(false)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        FetchVideoInfo();
    }, []); 
   
    return (
        <div className="main" style={{
            width: '99%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'row',
            margin: '12px',
            flexWrap: 'wrap', /* Allow items to wrap to the next line */
            justifyContent: 'flex-start', 
            overflow:'hidden'/* Align items starting from the left */
        }}>
            <style>
                {`
                @media (max-width: 700px) {
                    /* Media query for screens smaller than 700px */
                    .main {
                          flex-direction: column;
                            width: 100vh;
                            overflow-y: auto;
                    }
                },
               
            `}
            </style>
            {/* Define the media query outside of the JSX */}
           
            <div style={{
                width: '100%',
                marginBottom: '12px', // Increase margin for spacing
                borderRadius: '14px',
                flex:'1',
              }} data-layer="0" draggable="true">
                <video
                    controls
                    tabIndex="-1"
                    className="video-stream"
                    style={{ width: '95%', height: '357px', marginLeft: "10px", marginTop: "10px", border: "1px", borderRadius: "14px" }}
                    src={videoData.videoFile ||"http://res.cloudinary.com/dr4krsosv/video/upload/v1705500160/rrgkegqrweyuctxs4tjw.mp4"}
                ></video>
                <div style={{ width: '634px',marginBottom:'0px' }}><h2 >
                  {videoData.title || "the title is missing error "}
                </h2>
                    <p>
                        {videoData.description || "the description is missing error "}
                    </p>
                </div>
                <div className="buttonsLSUS" style={{ height: "55px", width: "100%", display: 'flex', justifyItems: "space-between", alignItems: 'center' }}>
                    <div className="channelDetails" style={{ display: "flex", flex: '2', justifyItems: "space-between", }}>
                        <div className="avatar" style={{flex:1}}>
                            <img src={videoData.avatar || '/vite.svg'} style={{height:'40px',width:'40px', borderRadius:"50%"}}/>
                            </div>
                        <div className="detail" style={{flex:2}}>
                            <div className="ChannelName" style={{}}>
                                <h3>{videoData.username}</h3>
                                </div>
                            <div className="subscribeCount" style={{ flex: '1' }}>
                                    <h6>
                                    {videoData.subscribersCount || null}
                                    </h6>
                                </div>
                            </div>
                    </div>
                    <div className="subscribeButton" style={{ flex: '1',  }}>
                        <SubscribeButton isSubscribe={isSubscribed} channelId={videoData.channelId }/>
                    </div>
                    <div className="rightButton" style={{display:'flex', flex: '2', alignItems: "center", justifyContent:'space-between',marginLeft:'12px'}}>
                        <div className="likeButoon" style={{flex:'1',}}>
                            <LikeButton likeCount={videoData?.likesCount} isLiked={isLiked} videoId={videoId}/>
                        </div>
                        <div className="shareButton" style={{ flex: '1' ,}}>
                            <ShareButton/>
                        </div>
                    </div>   
                </div>
            </div>
            <div className="comment" style={{ width: '100%', marginBottom: "0px", flex: '1' }} >
              <style>
                {`
                  @media (max-width: 700px) {
                    /* Media query for screens smaller than 700px */
                    .comment {
                         width:100vh;
                    }
                    .buttonsLSUS{
                        flex-direction: column;
                         aligntems: start;
                        margin-bottom:29px
                    }
                }`
                }
              </style>
                <CommentList videoId={videoId} />
            </div>
            
        
        </div>
    );
};

export default VideoPlayer;
