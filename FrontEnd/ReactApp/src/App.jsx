
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider , } from 'react-router-dom';
import './App.css'


import Home from './pages/Home/Home'
import Shorts from './pages/Shorts/Shorts'

import PlayList from './pages/PlayList/PlayList'
import Layout from './Layout';

import CardThumbnail from './Components/CardThumbnail/CardThumbnail.jsx';
import VideoList from './Components/DashBoard.components/VideoList.jsx';
import ChannelBannner from './Components/DashBoard.components/ChannelBannner.jsx';
import ChannelView from './Components/DashBoard.components/channelView.components.jsx';
// import AutoEvent from './Components/testing/AutoEvent.jsx';
// import LiveComment from './Components/livecomment/LiveComment.jsx';

// const env = import.meta.env.VITE_BASE_URL;

// Now you can use `env` in your component

function App() {
  // console.log("env", env)
  const router=createBrowserRouter([
    {
      path:'/',
      element:<Layout/>,
      children:[
        {
          path:"",
          element:<Home/>
        },
        {
          path:'/Short',
          element:<Shorts/>
        },
        {
          path:'/playlist',
          element:<PlayList/>
        },
      ]
    }
  ])

  return (<>
    {/* <div>{env}</div> */}
    {/* <Login/>
    <Dashboard/> */}
    {/* <RouterProvider router={router}>
      
    </RouterProvider> */}
    {/* <AutoEvent/> */}
    {/* <LiveComment/> */}
    {/* <Home/> */}
    {/* <ChannelBannner/> */}
    {/* <VideoList/> */}
    <ChannelView/>
    </>
    
  )
}

export default App
