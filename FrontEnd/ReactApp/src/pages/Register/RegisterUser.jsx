import  { useState } from 'react';
import axios from 'axios';
import './Register.css'
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    avatar: null,
    coverImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/users/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Registration successful', response.data);
      // You can redirect the user to another page or show a success message.
    } catch (error) {
      console.error('Registration failed', error);
      // Handle errors, show an error message, etc.
    }
  };

  return (
    <div id='maindiv'>
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full Name:</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required /><br />

        <label htmlFor="email">Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required /><br />

        <label htmlFor="username">Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleInputChange} required /><br />

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} required /><br />

        <label htmlFor="avatar">Avatar:</label>
        <input type="file" name="avatar" accept="image/*" onChange={handleInputChange} required /><br />

        <label htmlFor="coverImage">Cover Image:</label>
        <input type="file" name="coverImage" accept="image/*" onChange={handleInputChange} /><br />

        <button type="submit" value="Register" >Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
