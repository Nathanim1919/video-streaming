// Import necessary components and hooks
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaGoogle } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext';


// Component for user registration
const RegisterPage: React.FC = () => {

  // State to manage user registration data
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    profession: "",
  });

// Access the register function from the authentication context
  const {register} = useAuth();


  // Handle data change for input fields
  const handleDataChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [name]: e.target.value
    })
  }


  // Handle user registration
  const handleRegister = async () => {await register(data)};
  

  return (
    <Container>
        <div className='back'>
        <Link to="/"><IoArrowBackOutline size={30} color='#fff' /></Link>
      </div>
      <div className='header'>
        <h1>Dev-Sphere</h1> 
        <p>Virtual Streaming App</p>
      </div>
      <div className='form'>
        <input type='text' value={data.fullName} onChange={handleDataChange('fullName')} placeholder='Full Name'/>
        <input type="email" value={data.email} onChange={handleDataChange('email')} placeholder="Email" />
        <input type="password" value={data.password} onChange={handleDataChange("password")} placeholder="Password" />
        <input type="text" value={data.profession} onChange={handleDataChange('profession')} placeholder="Profession" />
        <button className='submit' onClick={handleRegister}
          disabled={Object.values(data).some((val) => !val)}
        >Register</button>
        <button className='google'><FaGoogle/>Sign up with Google Account</button>
        <button className='linkedin'><FaLinkedin/>Sign up with LinkedIn Account</button>
        <button className='github'><FaGithub/>Sign up with GitHub Account</button>
      </div>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </Container>
  );
};

export default RegisterPage;


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

    button.submit{
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