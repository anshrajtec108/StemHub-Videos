import { useState } from 'react';
import Cookies from 'js-cookie';

import axios from 'axios';
import './Register.css'
import { makePostRequest } from '../../services/api';
import { URLS } from '../../constants/Urls';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveUserId, saveUserObj } from '../../store/reducers/user';



function Login() {
  const navigator= useNavigate()
  const [data, setdata] = useState("")
  const [nameData, setNameData] = useState("")
  const [password, setpassword] = useState("")
  let dispatch = useDispatch()
  const handleSubmit = function (e) {
    e.preventDefault()
    console.log("nameData", nameData)
   
    let sendTheData = {
      [nameData]: data,
      password: password,
    }
    console.log("sendTheData", sendTheData);
    const login_URL = URLS.userLogin
    makePostRequest(login_URL, {}, sendTheData, {})
      .then((res) => {
        if (res.success) {
          Cookies.set('accessToken', res.data?.accessToken);
          dispatch(saveUserObj(res.data.user))
          let userId = res.data.user._id
          dispatch(saveUserId(userId))
          localStorage.setItem('userObj', JSON.stringify(res.data.user))
          return navigator('/');
          // console.log(res.data)
        }
      }).catch((error) => {
        alert(`ERROR FROM LOGIN error:${error.message}`)
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
