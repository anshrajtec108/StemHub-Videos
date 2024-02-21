import React from 'react'
import { Outlet } from 'react-router-dom'


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
