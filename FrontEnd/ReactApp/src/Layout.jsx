import React from 'react'
import SideBar from './Components/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import Header from './Components/HeaderNav/Header'

function Layout() {
  return (
    <div>
      <Header/>
      <SideBar/>
      <Outlet/>
    </div>
  )
}

export default Layout
