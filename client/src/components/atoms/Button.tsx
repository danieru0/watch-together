import React from 'react';
import styled from 'styled-components';

type buttonType = 'submit' | 'button' | 'reset';

interface IButton {
    children: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: buttonType;
    [key: string]: any;
}

const Container = styled.button`
    border: none;
    background: ${({theme}) => theme.primary};
    color: ${({theme}) => theme.fontColorPrimary};
    text-transform: uppercase;
    font-family: ${({theme}) => theme.fontFamily};
    font-size: 1em;
    padding: 10px 20px;
    cursor: pointer;
    outline: none;
    transition: background .2s;
    
    &:hover, &:focus {
        background: ${({theme}) => theme.primaryHover};
    }
`

const Button = ({children, onClick, type = 'button', ...props}: IButton) => {
    return (
        <Container type={type} onClick={onClick} {...props}>
            {children}
        </Container>
    );
};

export default Button;