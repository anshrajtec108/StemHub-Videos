import { useState } from 'react';


import axios from 'axios';
import './Register.css'
import { makePostRequest } from '../../services/api';
import { URLS } from '../../constants/Urls';
// import Header from '../../Components/HeaderNav/Header';
// import Home from '../Home/Home';
function Login() {
  const [data, setdata] = useState("")
  const [nameData, setNameData] = useState("")
  const [password, setpassword] = useState("")

  const handleSubmit = function (e) {
    e.preventDefault()
    console.log("nameData", nameData)
    let sendTheData = {
      [nameData]: data,
      password: password,
    }
    const login_URL = URLS.userLogin
    makePostRequest(login_URL, {}, sendTheData, {})
      .then((res) => {
        if (res.success) {
          // history.push('/home', { data: res.data });
          console.log(res.data)
        }
      }).catch((error) => {
        console.log(error);
      })
  };
  return (
    <div id='maindiv'>
      <form onSubmit={(e) => (handleSubmit(e))}>
        <label htmlFor='EmailUsername'>Email OR Username</label><br></br>
        <input
          type='text'
          id='EmailUsername'
          placeholder='username or Email'
          onChange={(e) => (setdata(e.target.value))}
          value={data}
        />

        <div className="radio-container">
          <label htmlFor="email">Email</label>
          <input
            type="radio"
            id="email"
            className='radio'
            name="dataSendName"
            onChange={() => (setNameData("email"))} />

          <label htmlFor="username">Username</label>
          <input
            type="radio"
            id="username"
            className='radio'
            name="dataSendName"
            onChange={() => (setNameData("username"))}
          />

        </div>

        <label >Password</label>
        <input
          type='password'
          placeholder='password'
          onChange={(e) => (setpassword(e.target.value))}
          value={password}
        />

        <button type='submit' >Submit</button>
      </form>
    </div>

  );

}

export default Login;
