import styled from "styled-components"
import coverImage from '/image/join.jpg'
import { Link } from "react-router-dom"


export const TopStreamers = () => {
    const streamers = [
        {
            name: "Nathanim Tadele 1",
            followers: 1000,
            profession: "Software Engineer"
        },
        {
            name: "Nathanim Tadele 2",
            followers: 2000,
            profession: "Software Engineer"
        },
        {
            name: "Nathanim Tadele 3",
            followers: 3000,
            profession: "Software Engineer"
        },
        {
            name: "Nathanim Tadele 1",
            followers: 1000,
            profession: "Software Engineer"
        },
        {
            name: "Nathanim Tadele 2",
            followers: 2000,
            profession: "Software Engineer"
        },
        {
            name: "Nathanim Tadele 3",
            followers: 3000,
            profession: "Software Engineer"
        },
        {
            name: "Nathanim Tadele 1",
            followers: 1000,
            profession: "Software Engineer"
        },
        {
            name: "Nathanim Tadele 2",
            followers: 2000,
            profession: "Software Engineer"
        },
        {
            name: "Nathanim Tadele 3",
            followers: 3000,
            profession: "Software Engineer"
        },
        {
            name: "Nathanim Tadele 1",
            followers: 1000,
            profession: "Software Engineer"
        },
        {
            name: "Nathanim Tadele 2",
            followers: 2000,
            profession: "Software Engineer"
        },
        {
            name: "Nathanim Tadele 3",
            followers: 3000,
            profession: "Software Engineer"
        },
        {
            name: "Streamer 2",
            followers: 2000,
            profession: "Software Engineer"
        },
        {
            name: "Streamer 3",
            followers: 3000,
            profession: "Software Engineer"
        },
        {
            name: "Streamer 1",
            followers: 1000,
            profession: "Software Engineer"
        },
        {
            name: "Streamer 2",
            followers: 2000,
            profession: "Software Engineer"
        },
        {
            name: "Streamer 3",
            followers: 3000,
            profession: "Software Engineer"
        },
        {
            name: "Streamer 2",
            followers: 2000,
            profession: "Software Engineer"
        },
        {
            name: "Streamer 3",
            followers: 3000,
            profession: "Software Engineer"
        },
        {
            name: "Streamer 1",
            followers: 1000,
            profession: "Software Engineer"
        },
        {
            name: "Streamer 2",
            followers: 2000,
            profession: "Software Engineer"
        },
        {
            name: "Streamer 3",
            followers: 3000,
            profession: "Software Engineer"
        },
    ]
    return (
        <Container>
            <div className="header">
            <h1>Get to know The Top Streamers around the globe</h1>
            <Link to={'/streamers'}>Browse All</Link>
            </div>
            <div className="streamerList">
                {
                    streamers.map((streamer, index) => {
                        return (
                            <div key={index} className="streamer">
                                <div className="profile">
                                    <div className='profilePic'>
                                        <img src={coverImage} alt="profile" />
                                    </div>
                                    <div className="info">
                                       <h3>{(streamer.name).slice(0, 10)}</h3>
                                        <p>{(streamer.profession).slice(0, 10)}..</p>
                                    </div>
                                </div>
                                <div className="btn">
                                    <button>follow</button>
                                    <p>200 followers</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </Container>
    )
}


const Container = styled.div`
    background: linear-gradient(to right, #2e2e83 10%, rgba(0, 0, 0, 0.8));
    padding: 10rem 1rem;
    color: #fff;
    position: relative;
    top: -8rem;

    .header{
        display: flex;
        justify-content: space-around;
        align-items: center;


        a{
            color: #fff;
            text-decoration: none;

            &:hover{
                color: #ddd;
            }
        }
    }

    .streamerList {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-auto-rows: minmax(100px, auto);
        place-items: end;
        margin: auto;
        gap: 1rem;

        > div {
            background-color: #000000d1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 10px;
            box-shadow: 0 3px 10px #000000d1;
            width: 100%;


            &:nth-child(even) {
                grid-column: span 0;
               
            }

            
            &:nth-child(odd) {
                grid-column: span 2;


                .info{
                    h3{
                        font-size: .9rem;
                    }

                    p{
                        font-size: .7rem;
                    }
                }
            }

            .btn{
                display: flex;
                flex-direction: column;
                margin-right: 1rem;

                >*{
                    margin: 0;

                }
                p{
                    font-size: .7rem;
                    color: #716a6a;
                }
            }

            button{
                background: linear-gradient(to right, #217aff, #0e2f9d);
                padding:.3rem .5rem;
                border-radius: 5px;
                color: #e9e3e3;
                border: none;
                cursor: pointer;
                font-family: inherit;
                margin-right: 1rem;
            }


            .profile{
                display: grid;
                grid-template-columns: .3fr 1fr;
                background-color: #471f1f;
                /* background-color: #740445; */
                gap: .5rem;
                padding: 1rem;
                align-items: center;
                justify-content: flex-start;
                border-radius: 10px;
                margin: 1rem;
                position: relative;
                /* width: 100%; */

                .profilePic{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    overflow: hidden;

                    img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }

                .info{
                    display: flex;
                    flex-direction: column;
                    /* align-items: center; */
                    h3{
                        color: #fff;
                        margin: 0;
                        font-size: .9rem;
                    }

                    p{
                        color: #aaa5a5;
                        margin: 0;
                        font-size: .8rem;
                    }
                }
            }
        }
    }
`