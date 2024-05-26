import styled from "styled-components"
import Image from '/home/bg.jpg'

export const SimilarEvents = () => {
    return (
        <Conatainer className="container">
            <h1>Other Events you may like</h1>
            <div className="events">
                <div className="event">
                    <div className="image">
                        <img src={Image} alt="" />
                    </div>
                    <div className="infos">
                       <div className="date">
                          <p>May</p>
                          <h2>17</h2>
                       </div>
                        <div className="info">
                                <h2>Empowering Women in Tech</h2>
                                <p>Wednesday, June 12th, 2024 | 12:00 PM - 2:00 PM</p>
                        </div>
                    </div>
                </div>
               
                <div className="event">
                    <div className="image">
                        <img src={Image} alt="" />
                    </div>
                    <div className="infos">
                       <div className="date">
                          <p>May</p>
                          <h2>17</h2>
                       </div>
                        <div className="info">
                                <h2>Empowering Women in Tech</h2>
                                <p>Wednesday, June 12th, 2024 | 12:00 PM - 2:00 PM</p>
                        </div>
                    </div>
                </div>
                <div className="event">
                    <div className="image">
                        <img src={Image} alt="" />
                    </div>
                    <div className="infos">
                       <div className="date">
                          <p>May</p>
                          <h2>17</h2>
                       </div>
                        <div className="info">
                                <h2>Empowering Women in Tech</h2>
                                <p>Wednesday, June 12th, 2024 | 12:00 PM - 2:00 PM</p>
                        </div>
                    </div>
                </div>
                <div className="event">
                    <div className="image">
                        <img src={Image} alt="" />
                    </div>
                    <div className="infos">
                       <div className="date">
                          <p>May</p>
                          <h2>17</h2>
                       </div>
                        <div className="info">
                                <h2>Empowering Women in Tech</h2>
                                <p>Wednesday, June 12th, 2024 | 12:00 PM - 2:00 PM</p>
                        </div>
                    </div>
                </div>
                <div className="event">
                    <div className="image">
                        <img src={Image} alt="" />
                    </div>
                    <div className="infos">
                       <div className="date">
                          <p>May</p>
                          <h2>17</h2>
                       </div>
                        <div className="info">
                                <h2>Empowering Women in Tech</h2>
                                <p>Wednesday, June 12th, 2024 | 12:00 PM - 2:00 PM</p>
                        </div>
                    </div>
                </div>
                <div className="event">
                    <div className="image">
                        <img src={Image} alt="" />
                    </div>
                    <div className="infos">
                       <div className="date">
                          <p>May</p>
                          <h2>17</h2>
                       </div>
                        <div className="info">
                                <h2>Empowering Women in Tech</h2>
                                <p>Wednesday, June 12th, 2024 | 12:00 PM - 2:00 PM</p>
                        </div>
                    </div>
                </div>
                <div className="event">
                    <div className="image">
                        <img src={Image} alt="" />
                    </div>
                    <div className="infos">
                       <div className="date">
                          <p>May</p>
                          <h2>17</h2>
                       </div>
                        <div className="info">
                                <h2>Empowering Women in Tech</h2>
                                <p>Wednesday, June 12th, 2024 | 12:00 PM - 2:00 PM</p>
                        </div>
                    </div>
                </div>
                <div className="event">
                    <div className="image">
                        <img src={Image} alt="" />
                    </div>
                    <div className="infos">
                       <div className="date">
                          <p>May</p>
                          <h2>17</h2>
                       </div>
                        <div className="info">
                                <h2>Empowering Women in Tech</h2>
                                <p>Wednesday, June 12th, 2024 | 12:00 PM - 2:00 PM</p>
                        </div>
                    </div>
                </div>
            </div>
        </Conatainer>
    )
}


const Conatainer = styled.div`
    width: 100%;
    background-color: #151515;
    padding: 2rem 0;


    >h1{
        color: #fff;
        margin-left: 2rem;
        width: 80%;
        margin: auto;
        padding: 3rem 0;
    }


    .events{
        width: 80%;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;

        .event{
            background-color: #242323;
            color: #fff;
            border-radius: 10px;
            overflow: hidden;

            .image{
                max-height: 200px;
                overflow: hidden;
            }

            .infos{
                display: grid;
                grid-template-columns: .15fr .85fr;
                padding: 1rem;
                gap: 1rem;

                .info{
                    h2{
                        font-size: 1rem;
                    }

                    p{
                        font-size: .8rem;
                        color: #bdb9b9;
                    }
                }

                .date{
                    background-color: red;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    padding: 0.4rem;
                    box-shadow: 0 20px 40px rgba(0,0,0,.2);
                    border-radius: 6px;


                    h2{
                        font-size: 1.7rem;
                    }


                    >*{
                        margin: 0;
                    }
                }
            }
            img{
                width: 100%;
            }
        }
    }
`