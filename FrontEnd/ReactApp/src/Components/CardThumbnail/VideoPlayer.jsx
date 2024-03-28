import React, { useEffect, useState } from 'react';
import { makeGetRequest } from '../../services/api';
import LikeButton from '../Buttons/LikeButtons';
import ShareButton from '../Buttons/ShareButton';
import SubscribeButton from '../Buttons/SubscribeButton';

const VideoPlayer = () => {
    const videoId = '65a7e7ae97ad7e3b03973411'
    const [videoData, setVideoData] = useState({})
    const onLoad = async () => {
        makeGetRequest(`/videos/${videoId}`, {}, {})
            .then((res) => {
                console.log(res.data)
                setVideoData(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        onLoad()
    }, [])

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            margin:'12px',
        }}>
            <div className="html5-video-container" style={{ width: '700px',marginBottom:"0px" }} data-layer="0" draggable="true">
                <video
                    controls
                    tabIndex="-1"
                    className="video-stream"
                    style={{ width: '634px', height: '357px', marginLeft: "10px", marginTop: "10px", border: "1px", borderRadius: "14px" }}
                    src="http://res.cloudinary.com/dr4krsosv/video/upload/v1705500160/rrgkegqrweyuctxs4tjw.mp4"
                ></video>
                <div className="info" style={{ width: '634px',marginBottom:'0px' }}><h2 >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quas odit cumque dignissimos minus. Assumenda labore,
                </h2>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat reprehenderit consectetur, aliquam corporis sit officia cumque delectus nobis blanditiis exercitationem atque, voluptatibus ex recusandae. Doloremque provident impedit eveniet?
                        Lorem ipsum dolor sit amet consec.,tetur adipisicing elit. Aliquid aut, laborum tenetur dolores ducimus, soluta animi assumenda aperiam, qui quam numquam eum nulla dolorem culpa a voluptate ab repudiandae alias?
                    </p>
                </div>
                <div className="buttonsLSUS" style={{ height: "55px", width: "100vh", display: 'flex', justifyItems: "space-between", alignItems: 'center' }}>
                    <div className="channelDetails" style={{ display: "flex", flex: '2', justifyItems: "space-between", }}>
                        <div className="avatar" style={{flex:1}}>
                            <img src='/vite.svg' style={{height:'40px',width:'40px', borderRadius:"50%"}}/>
                            </div>
                        <div className="detail" style={{flex:2}}>
                            <div className="title" style={{}}>
                                    <h3>ANsh Raj</h3>
                                </div>
                            <div className="subscribeCount" style={{ flex: '1' }}>
                                    <h6>
                                        122222m
                                    </h6>
                                </div>
                            </div>
                    </div>
                    <div className="subscribeButton" style={{ flex: '1',  }}>
                            <SubscribeButton/>
                    </div>
                    <div className="rightButton" style={{display:'flex', flex: '5', alignItems: "end", marginLeft:'12px'}}>
                        <div className="likeButoon" style={{flex:'1',}}>
                          <LikeButton/>
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
