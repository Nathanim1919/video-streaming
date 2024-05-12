import React from 'react';
import { FaCheckCircle } from "react-icons/fa";
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    color: #fff;
    background: #000;
    padding: 0rem;
    min-height: 100vh;
    gap: 3rem;

    >*{
        margin: 0;
    }

    .header{
        display: flex;
        flex-direction: column;
        align-items: center;

        h4{
            font-size: 1.5rem;
            color: #ddd;
            margin: 0;
        }
        h1{
            font-size: 3rem;
            margin: 0;
        }

    }


    .plans{
        width: 70%;
        gap: 2rem;
        /* place-items: center; */
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));


        div:nth-child(2){
            transform: scale(1.1);

            button{
                background-color: #c6c6ff;
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
                font-size: 1.5rem;
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


        button{
            padding: 0.6rem 3rem;
            border: none;
            font-family: inherit;
            border-radius: 30px;
            background-color: #2f2d2d;
            color: #fff;
            box-shadow: 0 10px 34px rgba(0,0,0,.2);
        }

        &:hover{
            background: #424141;
        }

        h2{
            font-size: 1.8rem;
        }

        p{
            font-size: 1.2rem;
        }



      
    }

`;

const PricingPage = () => {

    return (
        <Container>
            <div className='header'>
                <h1>Choose your plan</h1>
                <h4>Choose the plan that's right for you</h4>
            </div>
            <div className="plans">
                <div className="subscription-box">
                    <div className="head">
                        <h2>Basic</h2>
                        <p className="desc">Perfect for streamers who want to reach a small audience and build a loyal following.</p>
                    </div>
                    <div className="price">
                        <h1>0</h1>
                        <span>ETB</span>
                    </div>
                    <button>Get Started</button>
                    <div className="desc">
                        
                            <li><FaCheckCircle /><span>5 streams</span></li>
                            <li><FaCheckCircle /><span>10,000 subscribers</span></li>
                            <li><FaCheckCircle /><span>Unlimited stream time</span></li>
                       
                    </div>
                </div>
                <div className="subscription-box">
                    <div className="head">
                        <h2>Premium</h2>
                        <p className="desc">Perfect for streamers who want to reach a small audience and build a loyal following.</p>
                    </div>
                    <div className="price">
                        <h1>200</h1>
                        <span>ETB</span>
                    </div>
                    <button>Enterprise</button>
                    <div className="desc">
                       
                            <li><FaCheckCircle /><span>10 streams per month</span></li>
                            <li><FaCheckCircle /><span>10,000 subscribers</span></li>
                            <li><FaCheckCircle /><span>Unlimited stream time</span></li>
                        
                    </div>
                </div>
                <div className="subscription-box">
                    <div className="head">
                        <h2>Basic</h2>
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

