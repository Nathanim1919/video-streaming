import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoMdCloseCircle } from "react-icons/io";

interface NotifierProps {
    type: string;
    message: string;
}

export const Notifier: React.FC<NotifierProps> = ({ type, message }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <NotifierContainer className={`notifier ${visible ? "show" : "hide"} ${type}`}>
            <IoMdCloseCircle onClick={() => setVisible(false)} />
            <p id={'message'}>{message}</p>
        </NotifierContainer>
    );
};

const NotifierContainer = styled.div`
    position: fixed;
    top: 1rem;
    right: 1rem;
    background: #333;
    color: white;
    padding: 1rem 2rem;
    z-index: 1000;
    max-width: 300px;
    opacity: 0;
    visibility: hidden;
    transform: translateX(100%);
    font-size: .4rem;
    transition: opacity 0.5s ease, visibility 0.5s ease, transform 0.5s ease;
    animation: .5s slideLeft;
    
    @keyframes slideLeft {
        from{
            transform: translateX(40%);
        }
        to{
            transform: translateX(0);
        }
        
    }

    svg {
        position: absolute;
        top: .4rem;
        right: .4rem;
        cursor: pointer;
        font-size: 1rem;
    }

    p#message {
        margin: 0;
        font-size: 1rem;
    }

    &.show {
        opacity: 1;
        visibility: visible;
        transform: translateX(0);
    }

    &.hide {
        opacity: 0;
        visibility: hidden;
        transform: translateX(100%);
    }

    &.error {
        border-left: 15px solid #ff0000;
    }
    &.success {
        border-left: 10px solid #00ff00;
    }
    &.info {
        background: #1ca7f3;
    }
    &.warning {
        background: #ffcc00;
    }
`;
