import { HomeMaxOutlined, Subscriptions, VideoCallSharp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import './Sidebar.css';
import { useState } from "react";

function SideBar() {
  const [istrue , setIstre]=useState(true)
  let HomeMenuItem = [
    {
      path: '/',
      name: "Home",
      icon: <HomeMaxOutlined />,
    },
    {
      path: '/shorts',
      name: "Shorts",
      icon: <VideoCallSharp />,
    },
    {
      path: '/subscription',
      name: "Subscription",
      icon: <Subscriptions />,
    }
  ];

  return (
    <div id=" page-size main ">
      <div id="firstNav">
        <div id="home">
          <h3>Home</h3>
          {HomeMenuItem.map((item, index) => {
            console.log(index, item);
            return (
              <>
                <Link to={item.path} key={index}>
                  <div className="icon" key={index + 2}>{item.icon}</div>
                  <div className="name" style={istrue ? { "display": "block" ,"backgroundColor":"red"} : { "display": "none" }} key={index + 3}>{item.name}</div>
                </Link>
              </>
            );
          })}
        </div>
      </div>
      <div id="you"></div>
      <div id="subscription"></div>
      <div id="explore"></div>
      <div id="settings"></div>
    </div>
  );
}

export default SideBar;
