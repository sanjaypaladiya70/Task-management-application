import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'

const Signup = () => {

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: Email, password: Password }),
      });

      const result = await response.json();
      if (result.success) {
        
        localStorage.setItem('userName', result.user.name); 

        navigate('/main');
      } else {
        alert('Sign-in failed: ' + result.message);
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };


  return (
    <div className='flex align-middle justify-center'>
        <div className='my-40'>
          <div className='text-center font-semibold text-xl'>Sign in</div>
          <div>
              <input type="text" className='my-2 w-80' name='email' placeholder='your email' value={Email} onChange={(e) => setEmail(e.target.value)} /> <br />
              <input type="text" className='my-2 w-80' placeholder='password' name='password' value={Password} onChange={(e) => setPassword(e.target.value)} /> <br />
              <div className='flex justify-center'><button onClick={handleSignIn} className='text-center rounded-md py-1 px-3 bg-green-500'>Sign in</button></div>
          </div>
          <br /><br />
          <span>Not have an account</span>
          <Link className='mx-1 px-1 rounded-sm bg-green-500' to="/register">Register</Link>
        </div>
        
    </div>
    
  )
}

export default Signup
