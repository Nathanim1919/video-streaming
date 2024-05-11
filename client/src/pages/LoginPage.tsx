// Importing necessary components and hooks
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useAuth } from '../contexts/AuthContext';


// Components for the login page
const LoginPage: React.FC = () => {
  //  State to manage input data (username and password)
  const [data, setData] = useState({
    email:"",
    password:"",
  })


  // Accessing the login function from the AuthContext
  const {login} = useAuth();

  // Function to update state when input chnages
  const handleDataChange = 
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({
        ...data,
        [name]: e.target.value
      })
    }
 
  const handleLogin = async () => await login(data);


  const handleSocialRegister = (social: string) => {
    window.location.href = `http://localhost:3000/api/v1/auth/${social}`;
  } 

  return (
    <Container>
      <div className='back'>
        <Link to="/"><IoArrowBackOutline size={30} color='#fff' /></Link>
      </div>
      <div className='header'>
        <h1>DevSphere</h1> 
        <p>Virtual Streaming App</p>
      </div>
      <div className='form'>
        <input type="email" value={data.email} onChange={handleDataChange('email')} placeholder="Email" />
        <input type="password" value={data.password} onChange={handleDataChange('password')} placeholder="Password" />
        <button onClick={handleLogin}>Login</button>
        <Link to="/forgot-password">Forgot Password?</Link>
        <button onClick={() => handleSocialRegister('google')} className='google'><FaGoogle/>Sign in with Google Account</button>        
        <button onClick={() => handleSocialRegister('linkedin')} className='linkedin'><FaLinkedin/>Sign in with LinkedIn Account</button>
        <button onClick={() => handleSocialRegister('github')} className='github'><FaGithub/>Sign in with GitHub Account</button>
      </div>
      <p>Don't have an account? <Link to="/signup">Register</Link></p>
    </Container>
  );
};

export default LoginPage;


const Container = styled.div`
  background-color: #000000d1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  place-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: #fff;
  gap: 2rem;

  .back{
    position: absolute;
    top: 2rem;
    left: 2rem;
  }


  >*{
    margin: 0;
  }

  .header{
    display: flex;
    flex-direction: column;
    justify-content: center;


    >*{
      margin: 0;
    }
  }


  .form{
    display: flex;
    flex-direction: column;
    width: 30%;
    gap: .7rem;


    @media screen and (max-width:800px){
      width: 80%;
    }
    
    

    input{
      padding: 1rem;
      background-color: transparent;
      color: #fff;
      border: 1px solid #757373;
      font-family: inherit;
    }

    button{
      padding: .8rem 1rem;
      border: none;
      border-radius: 10px;
      font-family: inherit;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 1rem;

      &:hover{
        opacity: 0.8;
      }
    }

    button:nth-child(3){
      background-color: #007bff;
      color: #fff;
      justify-content: center;
    }

    button.google{
      background-color: #ffffff;
      color: #333;
    }

    button.linkedin{
      background-color: #0077b5;
      color: #fff;
    }

    button.github{
      background-color: #333;
      color: #fff;
    }
  }
`