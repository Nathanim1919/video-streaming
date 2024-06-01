
// qrCodeUrl Props
// Purpose: This component will display the QR code for the user's event ticket.
// It will be used in the EventTicket component.

import React from 'react';
import QRCode from 'qrcode.react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';



export const EventTicket: React.FC<{ qrCodeUrl: string }> = ({ qrCodeUrl }) => {

        return (
                <Container>
                    <Content>
                        <div className="div">
                            <h1>Success!</h1>
                            <h2>You have successfully RSVPed for the event. 🎉</h2>
                        </div>

                        <p>Your ticket with the QR code will be available for download and viewing in the My RSVPs tab.</p>
                        {/* <QRCode value={qrCodeUrl} /> */}
                        <h3>Thank you for your RSVP, and we look forward to seeing you at the event!</h3>
                        <Link to={'/my-rvsps'}>Click here to get your tickets</Link>
                    </Content>
                </Container>
            );
}


const Container = styled.div`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    z-index: 12;
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`

const Content = styled.div`
    background-color: #393737;
    color: #e7e2e2;
    max-width: 400px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0 10px 34px rgba(0,0,0,1);
    margin-top: 2rem;
    border-top: 6px solid red;
    border-bottom: 10px solid red;


    a{
        color: #fff;
        text-decoration: none;
        background-color: #212020;
        box-shadow: 0 10px 20px rgba(0,0,0,.2);
        padding: .8rem;
    }

    .div{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;

        >*{
            margin:.3rem 0;
        }
        >h1{
            font-size: 2.3rem;
            color: #333;
            color: green;
        }
    }
`
