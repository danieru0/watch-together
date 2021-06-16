import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type buttonType = 'submit' | 'button' | 'reset';

interface IButton {
    children: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: buttonType;
    to?: string;
    [key: string]: any;
}

const ContainerButton = styled.button`
    border: none;
    background: ${({theme}) => theme.primary};
    color: ${({theme}) => theme.fontColorPrimary};
    text-transform: uppercase;
    font-family: ${({theme}) => theme.fontFamily};
    padding: 10px 20px;
    font-size: 1em;
    cursor: pointer;
    outline: none;
    transition: background .2s;
    
    &:hover, &:focus {
        background: ${({theme}) => theme.primaryHover};
    }
`

const ContainerLink = styled(Link)`
    background: ${({theme}) => theme.primary};
    color: ${({theme}) => theme.fontColorPrimary};
    text-decoration: none;
    padding: 10px 20px;
    cursor: pointer;
    outline: none;
    text-transform: uppercase;
    transition: background .2s;

    &:hover, &:focus {
        background: ${({theme}) => theme.primaryHover};
    }
`

const Button = ({children, onClick, type = 'button', to, ...props}: IButton) => {
    if (to) {
        return (
            <ContainerLink to={to}>
                {children}
            </ContainerLink>
        )
    }

    return (
        <ContainerButton type={type} onClick={onClick} {...props}>
            {children}
        </ContainerButton>
    );
};

export default Button;