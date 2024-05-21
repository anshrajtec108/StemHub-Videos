import { Menu, SearchOutlined, VideoCallSharp, NotificationsActiveOutlined, Close } from "@mui/icons-material";
import './Header.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from '../SideBar.components/SideBar';
import { useDispatch, useSelector } from "react-redux";
import { savesideBarStatus } from "../../store/reducers/currentPlayinfo";



function Header(props) {
  // console.log("data from header ",props.data)
  const [show, setshow] = useState(false)
  const[ newQuery,setNewQuery]=useState(true)

  const user = JSON.parse(localStorage.getItem('userObj'))
    
  let dispatch = useDispatch()
  console.log("user",user);
  function handle_avatar() {
    if (show) {
      console.log("something went wrong in handle_avatar header")
    }
    setshow(true)
  }
  function handle_userinfo() {
    if (!show) {
      console.log("something went wrong in handle_userinfo header")
    }
    setshow(false)
  }
  const [searchTerm, setSearchTerm] = useState('');
  const navigator = useNavigate();
  
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      
      navigator(`/search/${searchTerm}/${newQuery}`);
      setSearchTerm('')
    }
  };

  const handleToVideoUpload=()=>{
    navigator('/video/upload')
  }
  const handleToHomePage=()=>{
    navigator('/')
  }
 
  const handleToggleSidebar = () => {
    dispatch(savesideBarStatus())
  };

 
  return (<>
    <div id='headerMain' style={{ height: "56px" }}>
      <div id="left">
        <div id="menu" onClick={handleToggleSidebar}>
          <Menu />
        </div>
        <div id="logo" onClick={handleToHomePage}>
          <img src="data:image/png;base64,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" alt="Logo" />
        </div>
      </div>
      <div id="center">
        <div id="search">
        
            <input id="searchInput" type="search" placeholder="Search" name="Search" value={searchTerm} onChange={handleChange} onKeyDown={handleKeyPress} />
            <div id="searchLogo">
              <label htmlFor="searchInput" style={{ color: 'black' }}><SearchOutlined /></label>
           
          </div>
        </div>
      </div>

      <div id="right">
        <div id="creatLogo" onClick={handleToVideoUpload}>
          <VideoCallSharp />
        </div>
        <div id="notification">
          <NotificationsActiveOutlined />
        </div>
        <div id="userAvatar">
          <img onClick={handle_avatar} src={user?.avatar}  alt="" />

        </div>
      </div>

    </div>
    <div id="hiddendivinfo" style={{ display: show ? 'block' : 'none', position: 'absolute', zIndex: 999 }}>
      <div id="userinfo">
        <div id="frist">
          <img src={user?.avatar} alt="" />
          <p id="thex" onClick={handle_userinfo} ><Close /></p>
        </div>

        <h3>{user?.fullName}</h3><br></br>
        <h4>{user?.username}</h4><br></br>
        <h4>{user?.email}</h4><br></br>
        <h3><a href={`/dashboard/${user?._id}`} style={{color:'pink'}}>view your channel</a></h3>
      </div>
    </div></>
  )
}

export default Header
