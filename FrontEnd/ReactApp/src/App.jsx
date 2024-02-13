
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider , } from 'react-router-dom';
import './App.css'

import Header from './Components/HeaderNav/Header'
import RegistrationForm from './pages/Register/RegisterUser'
import Home from './pages/Home/Home'
import Shorts from './pages/Shorts/Shorts'
import Subscription from './pages/Subscriptions/Subscription'
import PlayList from './pages/PlayList/PlayList'
import Dashboard from './pages/Dashboard/Dashboard'
import SideBar from './Components/SideBar/SideBar';
import Login from './pages/Login/Login';
import Layout from './Layout';

function App() {
 
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

    {/* <Login/>
    <Dashboard/> */}
    <RouterProvider router={router}>
      
    </RouterProvider>

    </>
    
  )
}

export default App
