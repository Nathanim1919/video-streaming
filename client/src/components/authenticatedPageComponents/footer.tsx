import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const FooterContainer = styled.footer`
    color: #fff;
    display: flex;
    justify-content: center;
    //align-items: center;
    font-size: 1.1rem;
    width: 100vw;

    .container{
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
    }

    .footer-container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80vw;
        gap: 2rem;

        @media screen and (max-width:800px){
            flex-direction: column;
            align-items: center;
            width: 100vw;
        }
    }

    .footer-logo{
        display: flex;
        flex-direction: column;
        gap: 1rem;

        >*{
            margin: 0;
        }

        p{
            width: 400px;
            color: #ddd;
        }
    }

    .footer-links{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 30vw;
        padding: 2rem;
    }

    .footer-credits{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30vw;
    }

    ul{
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        list-style: none;
        padding: 0;
    }

    a{
        text-decoration: none;
        color: #262525;
        transition: all 0.3s ease-in-out;

        &:hover{
            color: #ff0000;
        }
    }

    .social-icon{
        color: #fff;
        font-size: 1.5rem;
        transition: all 0.3s ease-in-out;

        &:hover{
            color: #ff0000;
        }
    }

    @media screen and (max-width:800px){
        .footer-links{
            width: 80vw;
        }
        .footer-logo{
            width: 80vw;
            text-align: center;
        }
        .footer-credits{
            width: 80vw;
            text-align: center;
    }
`;

const Footer = () => {
    return (
        <FooterContainer className='footer'>
            <div className='container'>
                <div className='footer-container'>
                    <div className='footer-logo'>
                        <h1>Eventify</h1>
                        <p>
                            We are a community of developers that are passionate about helping others learn to code.
                        </p>
                        <p>
                            We are a non-profit organization dedicated to providing a safe and welcoming environment for all of our members.
                        </p>
                    </div>
                    <div className='footer-links'>
                        <ul>
                            <li><a href='https://www.facebook.com/devsphe.io' target='_blank' rel='noreferrer'><FaFacebook className='social-icon'/></a></li>
                            <li><a href='https://twitter.com/devspheio' target='_blank' rel='noreferrer'><FaTwitter className='social-icon'/></a></li>
                            <li><a href='https://www.instagram.com/devsphe.io/' target='_blank' rel='noreferrer'><FaInstagram className='social-icon'/></a></li>
                            <li><a href='https://www.linkedin.com/company/devsphe/' target='_blank' rel='noreferrer'><FaLinkedin className='social-icon'/></a></li>
                        </ul>
                        <ul>
                            <li>Information about the company</li>
                            <li>Legal stuff (Terms of Service, Privacy Policy, etc.)</li>
                            <li>Contact information</li>
                            <li>Social media links</li>
                        </ul>
                    </div>
                </div>
                    <div className='footer-credits'>
                        <p>&copy; Eventify 2024</p>
                    </div>
            </div>
        </FooterContainer>
    )
}

export default Footer
