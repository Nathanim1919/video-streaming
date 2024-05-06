import styled from "styled-components"
import coverImage from '/image/join.jpg'


export const TopStreamers = () => {
    const streamers = [
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
            <h1>Top Streamers</h1>
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
                                       <h3>{streamer.name}</h3>
                                        <p>{streamer.profession}</p>
                                    </div>
                                </div>
                                <button>follow</button>
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
    padding: 2rem 1rem;
    color: #fff;

    .streamerList {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        place-items: center;
        margin: auto;
        gap: 1rem;

        > div {
            background-color: #000000d1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 10px;
            grid-column: span 2;
            box-shadow: 0 10px 30px #000000d1;
            width: 100%;
            &:nth-child(even) {
                grid-column: span 1;


                .info{
                    h3{
                        font-size: .9rem;
                    }

                    p{
                        font-size: .7rem;
                    }
                }
            }

            button{
                background-color: #ffffff;
                padding: .5rem 1rem;
                border-radius: 5px;
                color: #333;
                border: none;
                cursor: pointer;
                font-family: inherit;
                margin-right: 1rem;
            }


            .profile{
                display: grid;
                grid-template-columns: .3fr 1fr;
                background-color: #471f1f;
                gap: .5rem;
                padding: 1rem;
                align-items: center;
                justify-content: flex-start;
                border-radius: 10px;
                margin: 1rem;
                position: relative;
                /* width: 100%; */

                .profilePic{
                    width: 50px;
                    height: 50px;
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
                    }

                    p{
                        color: #fff;
                        margin: 0;
                    }
                }
            }
        }
    }
`