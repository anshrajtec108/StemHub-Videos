import React, { useEffect, useState } from 'react';
import { makeGetRequest } from '../../services/api';
import LikeButton from '../Buttons/LikeButtons';
import ShareButton from '../Buttons/ShareButton';
import SubscribeButton from '../Buttons/SubscribeButton';
import { useParams } from 'react-router-dom';

const VideoPlayer = () => {
    const { videoId } = useParams();
    const [videoData, setVideoData] = useState({});
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const FetchVideoInfo = async () => {
        try {
            const res = await makeGetRequest(`/videos/${videoId}`, {}, {});
            console.log(res.data);
            setVideoData(res.data[0]);
            if (res.data && videoData) {
                // Only make additional API calls if videoData contains valid data
                await isUserIsSubscribed(res.data.channelId);
                await isVideoIsLikedByUser(videoId);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const isUserIsSubscribed = async (channelId) => {
        try {
            const res = await makeGetRequest(`/subscriptions/isSubscribed/${channelId}`, {}, {});
            setIsSubscribed(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const isVideoIsLikedByUser = async (videoId) => {
        try {
            const res = await makeGetRequest(`/likes/isVideoLiked/${videoId}`, {}, {});
            setIsLiked(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        FetchVideoInfo();
    }, [videoId]); 

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            margin:'12px',
        }}>
            <div style={{ width: '700px',marginBottom:"0px" }} data-layer="0" draggable="true">
                <video
                    controls
                    tabIndex="-1"
                    className="video-stream"
                    style={{ width: '634px', height: '357px', marginLeft: "10px", marginTop: "10px", border: "1px", borderRadius: "14px" }}
                    src={videoData.videoFile ||"http://res.cloudinary.com/dr4krsosv/video/upload/v1705500160/rrgkegqrweyuctxs4tjw.mp4"}
                ></video>
                <div style={{ width: '634px',marginBottom:'0px' }}><h2 >
                  {videoData.title || "the title is missing error "}
                </h2>
                    <p>
                        {videoData.description || "the description is missing error "}
                    </p>
                </div>
                <div className="buttonsLSUS" style={{ height: "55px", width: "100vh", display: 'flex', justifyItems: "space-between", alignItems: 'center' }}>
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
                    <div className="rightButton" style={{display:'flex', flex: '5', alignItems: "end", marginLeft:'12px'}}>
                        <div className="likeButoon" style={{flex:'1',}}>
                            <LikeButton likeCount={videoData?.likesCount } isLiked={isLiked} />
                        </div>
                        <div className="shareButton" style={{ flex: '1' ,}}>
                            <ShareButton/>
                        </div>
                    </div>   
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
