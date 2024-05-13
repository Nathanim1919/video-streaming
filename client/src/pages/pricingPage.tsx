import { FaCheckCircle } from "react-icons/fa";
import styled from 'styled-components';
import BgImage from '/image/pattern.png';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    color: #fff;
    background-image: linear-gradient(50deg, #000000, #07212fee), url(${BgImage});
    background-position: center;
    background-size: cover;
    padding: 1rem;
    min-height: 100vh;
    gap: 3rem;

    >*{
        margin: 0;
    }

    .header{
        a{
            position: absolute;
            top: 1rem;
            left: 10rem;
            color:#fff;
            font-size: 2rem;
        }
        div{
            display: flex;
            flex-direction: column;
            align-items: center;
    
            h4{
                font-size: 1rem;
                color: #8b8787;
                margin: 0;
            }
            h1{
                font-size: 3rem;
                margin: 0;
            }

        }

    }


    .plans{
        width: 60%;
        gap: 2rem;
        /* place-items: center; */
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));


        div:nth-child(2){
            transform: scale(1.14);

          

            button{
                background-color: #c6c6ff;
                color:#333
            }
            
        }
    }


    .subscription-box{
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        justify-content: space-between;
        gap: 1rem;
       
        /* width: 30%; */
        padding: 2rem;
        background: linear-gradient(34deg, #181717, #041542);
        border-radius: 10px;
        transition: all .3s ease;
        cursor: pointer;
        border:1px solid #c6c6ff;


        >button#popular{
            background: #222121;
            position: absolute;
            top: 1rem;
            right: 1rem;
            padding: .3rem 1rem;
            color:#fff;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            border:1px solid #6d6d8d
        }


        .price{
            display: flex;
            align-items: center;
            gap: 1rem;

            h1{
                font-size: 4rem;
                font-weight: 500;
                margin: 0;

            }

            span{
                font-size: 1rem;
            }


        }

        .desc{
            
                display: flex;
                flex-direction: column;
                gap: .5rem;
                width: 100%;
                /* background-color: red; */

                li{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    gap: 1rem;
                    width: 100%;
                    border-bottom: 1px solid #3b3b47;
                    padding: .4rem 0;
                }
            
        }

        .head{
            display: flex;
            flex-direction: column;
            gap: .5rem;
            margin-top: 3rem;

            p{
                font-size: .8rem;
                color: #9f9a9a;
            }

            >*{
                margin: 0;
            }
        }


        button{
            padding: 0.6rem 3rem;
            border: none;
            font-family: inherit;
            border-radius: 30px;
            background-color: #2f2d2d;
            color: #fff;
            box-shadow: 0 10px 34px rgba(0,0,0,.2);


            &:hover{
                cursor: pointer;
                opacity: .9;
            }
        }

      

        h2{
            font-size: 1.8rem;
        }

        p{
            font-size: 1.2rem;
        }



      
    }

    .subscription-box:nth-child(2){
        background: linear-gradient(-145deg, #2e2c2c, #06124d);
        .head{
            h2{
                color: #1d99dc;
            }
        }
    }

`;

const PricingPage = () => {

    return (
        <Container>
            <div className='header'>
                <Link to={'/me'}><IoMdArrowRoundBack/></Link>
                <div>
                    <h1>Choose your plan</h1>
                    <h4>Choose the plan that's right for you</h4>
                </div>
            </div>
            <div className="plans">
                <div className="subscription-box">
                    <div className="head">
                        <h2>Basic</h2>
                        <p className="desc">Perfect for streamers who want to reach a small audience and build a loyal following.</p>
                    </div>
                    <div className="price">
                        <h1>0</h1>
                        <span>ETB/month</span>
                    </div>
                    <button>Get Started</button>
                    <div className="desc">
                        
                            <li><FaCheckCircle /><span>5 streams</span></li>
                            <li><FaCheckCircle /><span>10,000 subscribers</span></li>
                            <li><FaCheckCircle /><span>Unlimited stream time</span></li>
                       
                    </div>
                </div>
                <div className="subscription-box">
                    <button id="popular">
                        Popular
                    </button>
                    <div className="head">
                        <h2>Premium</h2>
                        <p className="desc">Perfect for streamers who want to reach a small audience and build a loyal following.</p>
                    </div>
                    <div className="price">
                        <h1>200</h1>
                        <span>ETB/month</span>
                    </div>
                    <button>Get Started</button>
                    <div className="desc">
                       
                            <li><FaCheckCircle /><span>10 streams per month</span></li>
                            <li><FaCheckCircle /><span>10,000 subscribers</span></li>
                            <li><FaCheckCircle /><span>Unlimited stream time</span></li>
                        
                    </div>
                </div>
                <div className="subscription-box">
                    <div className="head">
                        <h2>Ultimate</h2>
                        <p className="desc">Perfect for streamers who want to reach a small audience and build a loyal following.</p>
                    </div>
                    <button>Contact sale</button>
                    <div className="desc">
                       
                            <li><FaCheckCircle /><span>Unlimited streams</span></li>
                            <li><FaCheckCircle /><span>10,000 subscribers</span></li>
                            <li><FaCheckCircle /><span>Unlimited stream time</span></li>
                      
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default PricingPage;

