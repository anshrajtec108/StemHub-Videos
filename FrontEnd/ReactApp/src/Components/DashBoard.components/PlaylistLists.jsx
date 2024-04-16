import React, { useEffect, useState } from 'react'
import SmallCardThumbnail from '../CardThumbnail/SmallCardThumbnail.jsx'
import { useDispatch, useSelector } from "react-redux";
import { makeGetRequest } from '../../services/api.js';
import { URLS } from '../../constants/Urls.js';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { savePlayList, saveRememberMeURL } from '../../store/reducers/currentPlayinfo.js';
import Loader from '../CardThumbnail/Loader.jsx';

function PlaylistLists() {
  let playlistId;
  const navigate=useNavigate()
  // const { playlistId } = useSearchParams()
   playlistId ='65b67747a96e52ac6de06187'

  const [playlistdata, setPlaylistdata] = useState({
    "_id": "65b67747a96e52ac6de06187",
    "name": "playlist_code",
    "description": "playlist_codeing question and the project",
    "videos": [
      {
        "_id": "65a73ee3bcd971f56a10ad1e",
        "thumbnail": "http://res.cloudinary.com/dr4krsosv/image/upload/v1705500164/sekv9uwr3zdxoavpbkql.png",
        "title": "Sample Video",
        "description": "A sample video description.",
        "duration": 120,
        "views": 1,
        "updatedAt": "2024-02-18T12:00:36.638Z",
        "VideoOwner": [
          {
            "_id": "65af346acbbf8215df38e25d",
            "username": "anshwerrw",
            "avatar": "http://res.cloudinary.com/dr4krsosv/image/upload/v1705981032/vbxku7nshkjscuoox61z.png"
          }
        ]
      },
      {
        "_id": "65a7de08e44e4061383a7c8d",
        "thumbnail": "http://res.cloudinary.com/dr4krsosv/image/upload/v1705500164/sekv9uwr3zdxoavpbkql.png",
        "title": "the ambedka",
        "description": "ambedkaambedkaambedkaambedka ambedka ambedka",
        "duration": 42.306706,
        "views": 0,
        "updatedAt": "2024-01-17T14:02:48.144Z",
        "VideoOwner": [
          {
            "_id": "659ac647a7b9efbbfd8d7297",
            "username": "ansh@108",
            "avatar": "http://res.cloudinary.com/dr4krsosv/image/upload/v1704642091/bsimqtuyi49tvlmbcrll.jpg"
          }
        ]
      }
    ],
    "playListOwner": [
      {
        "_id": "659ac647a7b9efbbfd8d7297",
        "username": "ansh@108",
        "avatar": "http://res.cloudinary.com/dr4krsosv/image/upload/v1704642091/bsimqtuyi49tvlmbcrll.jpg"
      }
    ]
  })
  const [error,setError]=useState({})

  let URL = `${URLS.getPlaylistById}/${playlistId}`

  let currentplayInfo = useSelector((store) => store.currentPlayinfo);
  let dispatch = useDispatch()

  playlistId = (!playlistId) ? currentplayInfo.Playlist._id : playlistId
  const getPlayListVideos = () => {
    makeGetRequest(URL,{},{})
    .then((res)=>{
      if (! res.statusCode >200) {
        setPlaylistdata(res.data)
        dispatch(savePlayList(res.data._id))
        setError({})
      }else{
        setError({ assigningValues:"error while assigning the values "})
      }
    }).catch((error)=>{
      dispatch(saveRememberMeURL(URL))
      setError({error:error})
    })
  }
  useEffect(()=>{
    getPlayListVideos()
  },[])
  function SendToPlayListUserAcc(){
    let userId = playlistdata.playListOwner[0]?._id ;
    navigate(`/dashboard/${userId}`);

  }
  return (
    <div className="main-container" style={{ height: '500px', width: '380px', overflowY: 'auto', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '10px', WebkitOverflowScrolling: 'touch' }}>
      <style>
        {`
                /* Style the scrollbar for .main-container */
                .main-container::-webkit-scrollbar {
                    width: 8px;
                }
                
                .main-container::-webkit-scrollbar-thumb {
                    background-color: #888;
                    border-radius: 10px;
                }
                
                .main-container::-webkit-scrollbar-track {
                    background-color: #f0f0f0;
                }
                `}
      </style>
      <h1>{currentplayInfo.playList.id}</h1>
      <div className="currentplaying" style={{ textAlign: 'center', backgroundColor: 'black', padding: '10px', borderRadius: '5px', color: 'white', marginBottom: '10px' }}>
        <p className="heading" style={{ fontSize: '15px', fontWeight: 'bold', margin: '0' }}>{playlistdata.name||"playlistdata.name"}</p>
        <p className="description" style={{ fontSize: '8px', margin: '0' }}>{playlistdata.description || "playlistdata.description"}</p>
        <div className="avatar" style={{ display: 'flex', alignItems: 'center' }} onClick={SendToPlayListUserAcc}>
          <img src={playlistdata.playListOwner?.avatar || '/vite.svg'} alt="Avatar" style={{ height: '25px', width: '25px', borderRadius: '50%', marginRight: '5px' }} />
          <div className="username" style={{ fontSize: '16px', color: '#888888' }}>{playlistdata.playListOwner[0]?.username || "props.username"}</div>
        </div>
      </div>
      <div className="thumbnails" style={{ overflowY: 'auto' }}>
        {playlistdata.videos.map((data, index) => {
          return <SmallCardThumbnail key={index} videos={data} videoOwner={data.VideoOwner[0]} />;
        })}
        {/* Add more SmallCardThumbnail components as needed */}
      </div>
    </div>
  )
}

export default PlaylistLists
