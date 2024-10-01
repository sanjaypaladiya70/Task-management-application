import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Register = () => {

    const navigate = useNavigate(); // Initialize the navigate function

    const [userData, setUserData] = useState({
        email: '',
        name: '',
        password: ''
      });
    
      const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
    
          const result = await response.json();
          if (result.success) {
            alert('User registered successfully');
            navigate('/')
          } else {
            alert(result.message);
          }
        } catch (error) {
          console.error('Error registering user:', error);
        }
      };
    

  return (
    <div className='flex align-middle justify-center'>
        <div className='my-40'>
          <div className='text-center font-semibold text-xl'>Register</div>
          <div>
              <input type="text" className='my-2 w-80' name='email' placeholder='your email' value={userData.email} onChange={handleChange} /> <br />
              <input type="text" className='my-2 w-80' name='name' placeholder='Your name' value={userData.name} onChange={handleChange} /> <br />
              <input type="text" className='my-2 w-80' placeholder='password' name='password' value={userData.password} onChange={handleChange} /> <br/>

              <div className='flex justify-center'><button onClick={handleSubmit} className='text-center rounded-md py-1 px-3 bg-green-500'>Register</button></div>
          </div>
          <br /><br />
          
        </div>
        
    </div>
  )
}

export default Register
