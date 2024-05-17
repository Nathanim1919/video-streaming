// Import necessary components and hooks
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaGoogle } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import { useAuth } from '../contexts/AuthContext';
import { GrRadialSelected } from "react-icons/gr";
import OrgRegistration from '../components/OrgRegistration';


// Component for user registration
const RegisterPage: React.FC = () => {

  // State to manage user registration data
  const [data, setData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    profession: "",
  });
  const [isPersonal, setIsPersonal] = useState(true);

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
    <Container>
        <div className='back'>
        <Link to="/"><IoArrowBackOutline size={30} color='#fff' /></Link>
      </div>
      <div className='header'>
        <h1>Dev-Sphere</h1>
        <p>Virtual Streaming App</p>
      </div>
      <div className="per-org">
        {/* <p>Register as a</p> */}
        <div className="btns">
          <button className={isPersonal?'active':""} onClick={()=>setIsPersonal(true)}><GrRadialSelected/>Personal</button>
          <button className={!isPersonal?'active':""} onClick={() => setIsPersonal(false)}><GrRadialSelected/>Organisation</button>
        </div>
      </div>
     {isPersonal? <div className='form'>
        <input type='text' value={data.fullName} onChange={handleDataChange('fullName')} placeholder='Full Name'/>
        <input type='text' value={data.username} onChange={handleDataChange('username')} placeholder='Username'/>
        <input type="email" value={data.email} onChange={handleDataChange('email')} placeholder="Email" />
        <input type="password" value={data.password} onChange={handleDataChange("password")} placeholder="Password" />
        <input type="text" value={data.profession} onChange={handleDataChange('profession')} placeholder="Profession" />
        <button className='submit' onClick={handleRegister}
          disabled={Object.values(data).some((val) => !val)}
        >Register</button>
        <button onClick={() => handleSocialRegister('google')} className='google'><FaGoogle/>Sign up with Google Account</button>        
        <button onClick={() => handleSocialRegister('linkedin')} className='linkedin'><FaLinkedin/>Sign up with LinkedIn Account</button>
        <button onClick={() => handleSocialRegister('github')} className='github'><FaGithub/>Sign up with GitHub Account</button>
      </div>:<OrgRegistration/>}
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
  gap: 1rem;

  .back{
    position: absolute;
    top: 2rem;
    left: 2rem;
  }

  .per-org{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 1rem 0;
    font-family: inherit;

    >*{
      margin: 0;
    }

    .btns{
      display: flex;
      gap: 1rem;

      button{
        color:#b3adad;
        background-color: transparent;
        display: flex;
        align-items: center;
        gap: .5rem;
        border: none;
        font-family: inherit;
        cursor: pointer;
        transition: 0.3s;

        &:hover{
          opacity: 0.8;
        }
      }

      button.active{
        color: #ffdd00;
        position: relative;
        font-size: 1.03rem;
        font-weight: 600;
      }
    }
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
    animation: slideup 2s ease;
    

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
  }
`