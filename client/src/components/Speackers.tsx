import styled from "styled-components"
import Image from '/home/bg.jpg'
import ProImage from '/home/live.jpeg'

export const Speakers: React.FC = () => {
    return (
        <Container>
            <div className="header-info">
                <h1>Speakers</h1>
                <p>Welcome to our event! Get ready to be inspired by our lineup of talented speakers who will share their expertise and insights.</p>
            </div>
            <div className="speakers">
                <div className="hostedBy">
                    <h1>Hosted By</h1>
                    <div className="host">
                        <div className="image">
                            <img src={Image} alt="host" />
                        </div>
                        <div className="infos">
                            <h2>John Doe</h2>
                            <p>CEO, Google</p>
                        </div>
                    </div>
                </div>

                <div className="co-hosts">
                    <h1>Our Guests</h1>
                    <div className="speak">
                        <div>
                            <div className="image">
                                <img src={Image} alt="host" />
                            </div>
                            <div className="infos">
                                <h2>Jane Smith</h2>
                                <p>CTO, Microsoft</p>
                            </div>
                        </div>
                        <div>
                            <div className="image">
                                <img src={Image} alt="host" />
                            </div>
                            <div className="infos">
                                <h2>Mark Johnson</h2>
                                <p>Founder, Apple</p>
                            </div>
                        </div>
                        <div>
                            <div className="image">
                                <img src={Image} alt="host" />
                            </div>
                            <div className="infos">
                                <h2>Mark Johnson</h2>
                                <p>Founder, Apple</p>
                            </div>
                        </div>
                        <div>
                            <div className="image">
                                <img src={Image} alt="host" />
                            </div>
                            <div className="infos">
                                <h2>Mark Johnson</h2>
                                <p>Founder, Apple</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}


const Container = styled.div`
    background-color: black;
    color: #fff;
    display: grid;
    padding: 3rem 1rem;
    margin-top: 3rem;


    .header-info{
        padding: 1rem;
        /* text-align: center; */
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        max-width: 50%;
        margin: auto;


        >*{
            margin-bottom: 0rem;
            text-align: left;
        }
    }

    .speakers{
        display: grid;
        grid-template-columns: 50% 50%;
        justify-content: center;
        width: 80%;
        margin: auto;
        flex-wrap: wrap;
        gap: 1rem;

        @media screen and (max-width: 800px){
            grid-template-columns: 100%;
        }


        .hostedBy{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1rem;

          
            .host{
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1rem;

                .image{
                    width: 100%;
                    height: 100%;
                   
                    overflow: hidden; 
                    img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }

                .infos{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    position: absolute;

                    h2{
                        font-size: 1.5rem;
                    }
                }
            }
        }

        .co-hosts{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            align-self: flex-end;
            flex: 1;

            .speak{
                
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 1rem;

                >div{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 1rem;
                    background-color: #333;
                    
                    padding:.5rem;


                    .image{
                        width: 100px;
                        height: 100px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0,0,0,.5);
                        overflow: hidden;
                        img{
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }

                    .infos{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;

                        >*{
                            margin: 0;
                        }

                        h2{
                            font-size: 1rem;
                        }

                        p{
                            color: #ddd;
                            font-size: .8rem;
                        }
                    }
                }
        }
    }
}

`