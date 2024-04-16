import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Components/HeaderNav.components/Header'
import SideBar from './Components/SideBar.components/SideBar'


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
