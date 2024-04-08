import React, { useState } from 'react'
import SmallCardThumbnail from '../CardThumbnail/SmallCardThumbnail.jsx'
import {  useSelector } from "react-redux";

function PlaylistLists() {
  const [playlistdata,setPlaylistdata]=useState([])
  let currentplayInfo = useSelector((store) => store.currentPlayinfo);
  console.log(currentplayInfo);
  const getPlayListVideos = () => {

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

      </div>
      <div className="thumbnails" style={{ overflowY: 'auto' }}>
        <SmallCardThumbnail />
  
        {/* Add more SmallCardThumbnail components as needed */}
      </div>
    </div>
  )
}

export default PlaylistLists
