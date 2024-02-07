
import { BrowserRouter, Routes, Route , } from 'react-router-dom';
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

function App() {
 

  return (<>
    {/* <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/shorts' element={<Shorts />} />
        <Route path='/subscription' element={<Subscription />} />
        <Route path='/playList' element={<PlayList />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter> */}
    {/* <Login/> */}
    <Home/>

    </>
    
  )
}

export default App
