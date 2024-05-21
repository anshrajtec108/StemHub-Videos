
// import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider , } from 'react-router-dom';
import './App.css'


import Home from './pages/Home/Home'
import Shorts from './pages/Shorts/Shorts'

import PlayList from './pages/PlayList/PlayList'
import Layout from './Layout';


import ChannelView from './Components/DashBoard.components/channelView.components.jsx';
import Login from './Components/Registration.components/Login.jsx';
import VideoPlayer from './Components/CardThumbnail/VideoPlayer.jsx';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './services/ProtectedRoute.jsx';

import Search from './Components/HeaderNav.components/Search.jsx';
import VideoUpload from './Components/CardThumbnail/VideoUpload.jsx';
import History from './pages/History/History.jsx';
import RegistrationForm from './Components/Registration.components/RegisterUser.jsx';




function App() {
  
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
          path:'/playlist/:playlistId',
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
        },
        {
          path:'/video/upload',
          element: <VideoUpload />
        },
        {
          path:'/user/history',
          element:<History/>
        }
      ]
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path: '/resister',
      element: <RegistrationForm />
    }
  ])

  return (<>
    <RouterProvider router={router}>

    </RouterProvider>
</>
  )}

export default App
