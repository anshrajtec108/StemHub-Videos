import { History, HomeMaxOutlined, Subscriptions, VideoCallSharp } from "@mui/icons-material";
import { Link } from "react-router-dom";

import "./Sidebar.css";
import { Menu } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { savesideBarStatus } from "../../store/reducers/currentPlayinfo";

function SideBar() {

  let sideBarStore = useSelector((store) => store.currentPlayinfo);
  let sideBarStatus =sideBarStore.sideBar
  console.log("sideBarStatus", sideBarStatus);
  let dispatch = useDispatch()
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
    {
      path: "/user/history",
      name: "History",
      icon: <History />,
    }
  ];
  const handleToggleSidebar = () => {
    console.log('handleToggleSidebar');
    dispatch(savesideBarStatus())
  };
  return (
    <div className={`sidebar`} style={{ display: sideBarStatus ? 'block' : 'none' }}>
      <div id="menu" onClick={handleToggleSidebar} style={{ margin: '10px' }}>
        <Menu />
      </div>
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
