// Import necessary components and hooks
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaGoogle } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useAuth } from '../contexts/AuthContext';


// Component for user registration
const OrgRegistration: React.FC = () => {

  // State to manage user registration data
  const [data, setData] = useState({
    name: "",
    sector: "",
    email: "",
    password: "",
    // profession: "",
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

  const handleSocialRegister = (social: string) => {
    window.location.href = `http://localhost:3000/api/v1/auth/${social}`;
  } 
  

  return (
      <Form className='form'>
        <input type='text' value={data.name} onChange={handleDataChange('fullName')} placeholder='Org Name'/>
        <input type='text' value={data.sector} onChange={handleDataChange('username')} placeholder='Org sector'/>
        <input type="email" value={data.email} onChange={handleDataChange('email')} placeholder="Org Email" />
        <input type="password" value={data.password} onChange={handleDataChange("password")} placeholder="Org Password" />
        {/* <input type="text" value={data.profession} onChange={handleDataChange('profession')} placeholder="Profession" /> */}
        <button className='submit' onClick={handleRegister}
          disabled={Object.values(data).some((val) => !val)}
        >Register</button>
        <button onClick={() => handleSocialRegister('google')} className='google'><FaGoogle/>Sign up with Google Account</button>        
        <button onClick={() => handleSocialRegister('linkedin')} className='linkedin'><FaLinkedin/>Sign up with LinkedIn Account</button>
        <button onClick={() => handleSocialRegister('github')} className='github'><FaGithub/>Sign up with GitHub Account</button>
      </Form>
  );
};

export default OrgRegistration

// Styling for the component
const Form = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    gap: .7rem;
    animation: slideup 1s ease;
    

    @keyframes slideup {
        from{
            opacity: 0;
            transform: translateY(30px);
        }
        to{
            opacity: 1;
            transform: translateY(0);
        }
    }


    @media screen and (max-width:800px){
      width: 80%;
    }
    
    

    input{
      padding: 1rem;
      background-color: transparent;
      color: #fff;
      border: 1px solid #eeff021c;
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
`