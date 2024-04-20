import { HomeMaxOutlined, Subscriptions, VideoCallSharp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Sidebar.css";

function SideBar({ sideBar }) {
  console.log('sideBar prop:', sideBar);
  const [isTrue, setIsTrue] = useState(true);
  useEffect(() => {
    console.log('props.sideBar', sideBar);
  }, [sideBar]);
  let homeMenuItems = [
    {
      path: "/",
      name: "Home",
      icon: <HomeMaxOutlined />,
    },
    {
      path: "/shorts",
      name: "Shorts",
      icon: <VideoCallSharp />,
    },
    {
      path: "/subscription",
      name: "Subscription",
      icon: <Subscriptions />,
    },
  ];

  return (
    <div className={`sidebar`} style={{ display: `${isTrue ? "block" : "none"}` }}>
      <div className="firstNav">
        <div className="home">
          <h3>Home</h3>
          {homeMenuItems.map((item, index) => (
            <Link to={item.path} key={index}>
              <div className="icon">{item.icon}</div>
              <div className="name">{item.name}</div>
            </Link>
          ))}
        </div>
      </div>
      {/* Other sidebar sections go here */}
    </div>
  );
}

export default SideBar;
