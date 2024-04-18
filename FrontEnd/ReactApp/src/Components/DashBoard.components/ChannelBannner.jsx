import React, { useEffect, useState } from 'react'
import './DashBoard.css'
import SubscribeButton from '../Buttons/SubscribeButton'
import { makeGetRequest } from '../../services/api'
import { useParams } from 'react-router-dom'


function ChannelBannner() {
    const { userId } = useParams()
    const [data,setData]=useState({})

    async function fetchChannelData(){
       try {
           const res = await makeGetRequest(`/users/c/${userId}`,{},{})
           if (res.statusCode <=200)
           setData (res.data)
           console.log("ChannelBannner",data);
       } catch (error) {
        alert(`ERROR from Channel Banner   ${error}`)
           console.log("ERROR from Channel Banner ",error);
       }
    }
    useEffect(()=>{
        fetchChannelData()
        console.log("from ChannelBannner ");
    },[])

    return (
        <div>
            <div style={{ margin: '8px', backgroundSize: 'cover', height: '190px', width: '95%', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <img style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '8px' }} src={data.coverImage} alt='channelBanner' />
            </div>
            <div className="channelDetails" style={{ display: 'flex', justifyContent:'space-around',alignItems:'center',  marginTop: '10px' }}>
                <div id="left" style={{ flex: '20' }}>
                    <img style={{ height: '100px', width: '100px', objectFit: 'cover', borderRadius: '50%', margin:'12px' }} src={data.avatar} alt='logo' />
                    <div>
                        <p style={{ fontSize: '34px', color: '#777' ,flexDirection:'column'}}>{data.username}</p>
                        <h2 style={{ marginBottom: '5px' }}>{data.fullName}</h2>
                    </div>
                    <div id="subscribeInfo" style={{marginLeft:'70px'}}>
                        <SubscribeButton isSubscribe={data.issubscribed} channelId={userId} />
                    </div>
                </div>
            
                <div id="right" style={{ flex: '15' ,flexDirection:'column'}}>
                    <p style={{ fontSize: '24px', color: '#887', }}>Subscribers: {data.subscribersCount}</p>
                    <p style={{ fontSize: '24px', color: '#887', }}>Channels Subscribed To: {data.channelsSubscribedToCount}</p>
                </div>
            </div>
        </div>
    );
}

export default ChannelBannner
