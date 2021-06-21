import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type buttonType = 'submit' | 'button' | 'reset';

interface IButton {
    children: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: buttonType;
    to?: string;
    lightHover?: boolean;
    loading?: boolean;
    [key: string]: any;
}

interface ContainerButtonProps {
    lighthover?: boolean;
}

const ContainerButton = styled.button<ContainerButtonProps>`
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
        background: ${({theme, lighthover}) => lighthover ? theme.primaryHoverLight : theme.primaryHover};
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

const Button = ({children, onClick, type = 'button', to, loading, lightHover, ...props}: IButton) => {
    if (to) {
        return (
            <ContainerLink to={to}>
                {children}
            </ContainerLink>
        )
    }

    return (
        <ContainerButton disabled={loading} lighthover={lightHover} type={type} onClick={onClick} {...props}>
            {
                loading ? (
                    <FontAwesomeIcon icon="circle-notch" spin />
                ) : (
                    children
                )
            }
        </ContainerButton>
    );
};

export default Button;