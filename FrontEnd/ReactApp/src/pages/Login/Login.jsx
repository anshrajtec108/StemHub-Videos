import { useState } from 'react';
import axios from 'axios';
import '../Register/Register.css'
function Login() {
 const[data , setdata]=useState("")
 const[nameData,setNameData]=useState("")
 const [password , setpassword]=useState("")

  function handleSubmit(e){
    console.log("nameData",nameData)
    e.preventDefault();
    let obj={
      [nameData]:data,
      password:password,
    }
    console.log("obj    ",obj)
    axios.post("http://localhost:8080/api/v1/users/login",obj)
    .then((res)=>{
      console.log(res.data)
    })
  }
  return (
    <div id='maindiv'>
      <form  onSubmit={(e)=>(handleSubmit(e))}>
     <input 
        type='text'
        placeholder='username or Email'
        onChange={(e)=>(setdata(e.target.value))}
        value={data}
     />
     <select onChange={(e)=>setNameData("email"||e.target.value)} required>
     <option value="email" className='radio-container'>Email</option>
     <option value="username" className='radio-container'>Username</option>
     </select>

     <input 
        type='password'
        placeholder='password'
        onChange={(e)=>(setpassword(e.target.value))}
        value={password}
     />

     <button type='submit' >Submit</button>
     </form>
    </div>
    
  );
}

export default Login;
