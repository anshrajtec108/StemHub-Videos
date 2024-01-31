import { HomeMaxOutlined, Subscriptions, VideoCallSharp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import './Sidebar.css';

function SideBar() {
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
    <div id="main">
      <div id="firstNav">
        <div id="home">
          <h3>Home</h3>
          {
            HomeMenuItem.map((item, index) => {
              console.log(index, item);

              return (<>
                <p key={index+1}>{item.path}</p>
                <Link to={item.path} key={index}>
                  <div className="icon" key={index+2}>{item.icon}</div>
                  <div className="name" key={index+3}>{item.name}</div>
                </Link> </>
              );
            })
          }
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
