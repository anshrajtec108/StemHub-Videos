
// import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider , } from 'react-router-dom';
import './App.css'


import Home from './pages/Home/Home'
import Shorts from './pages/Shorts/Shorts'

import PlayList from './pages/PlayList/PlayList'
import Layout from './Layout';

import CardThumbnail from './Components/CardThumbnail/CardThumbnail.jsx';
import VideoList from './Components/DashBoard.components/VideoList.jsx';
import ChannelBannner from './Components/DashBoard.components/ChannelBannner.jsx';
import ChannelView from './Components/DashBoard.components/channelView.components.jsx';
import Login from './Components/Registration.components/Login.jsx';
import VideoPlayer from './Components/CardThumbnail/VideoPlayer.jsx';
import Loader from './Components/CardThumbnail/Loader.jsx';
import SmallCardThumbnail from './Components/CardThumbnail/smallCardThumbnail.jsx';
import PlaylistLists from './Components/DashBoard.components/PlaylistLists.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './services/ProtectedRoute.jsx';
import CommentList from './Components/Comment/Comment.jsx';
import Search from './Components/HeaderNav.components/Search.jsx';


// import AutoEvent from './Components/testing/AutoEvent.jsx';
// import LiveComment from './Components/livecomment/LiveComment.jsx';

// const env = import.meta.env.VITE_BASE_URL;

// Now you can use `env` in your component

function App() {
  // console.log("env", env)
  const router=createBrowserRouter([
    {
      path:'/',
      element: <ProtectedRoute Component={Layout}></ProtectedRoute>,
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
        {
          path: '/dashboard/:userId',
          element: <ChannelView />
        },
        {
          path: '/videoplayer/:videoId',
          element: <VideoPlayer />
        },
        {
          path:'/search/:query/:newQuery',
          element: <Search />
        }
      ]
    },
    {
      path:'/login',
      element:<Login/>
    }
  ])

  return (<>
    {/* <div>{env}</div> */}
    {/* <Login/> */}
    {/* <Dashboard/> */}
    {/* <RouterProvider router={router}>
      
    </RouterProvider> */}
    {/* <AutoEvent/> */}
    {/* <LiveComment/> */}
    {/* <Home/> */}
    {/* <ChannelBannner/> */}
    {/* <VideoList/> */}
    {/* <ChannelView/> */}
    {/* <VideoPlayer/>    */}
    {/* <SmallCardThumbnail/> */}
    {/* <PlaylistLists/> */}
     {/* <Loader/> */}
    {/* <LiveStream/> */}
    {/* <RTMPVideoPlayer/> */}
    {/* <CardThumbnail/> */}
    {/* <CommentList/> */}


    <RouterProvider router={router}>

    </RouterProvider>
</>
  )}

export default App
