import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { theme } from '../../theme/theme';

type iconType = 'sign-out-alt';
type fontColor = 'primary' | 'notSelected' | undefined;

interface IButtonIcon {
    iconType: iconType;
    fontColor?: fontColor;
    fontSize?: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    [key: string]: any;
}

interface ContainerProps {
    fontcolor?: fontColor;
    fontSize?: string;
}

const handleFontColor = (color: fontColor) => {
    switch(color) {
        case "primary":
            return theme.fontColorPrimary;
        case "notSelected":
            return theme.notSelected;
        default: return theme.fontColorPrimary;
    }
}

const Container = styled.button<ContainerProps>`
    color: ${({fontcolor}) => handleFontColor(fontcolor)};
    background: none;
    border: none;
    cursor: pointer;
    font-size: ${({fontSize}) => fontSize ? fontSize : '1.5em'};
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
`

const ButtonIcon = ({iconType, fontColor, fontSize, onClick, ...props}: IButtonIcon) => {
    return (
        <Container onClick={onClick} fontcolor={fontColor} fontSize={fontSize} {...props}>
            <FontAwesomeIcon icon={iconType} />
        </Container>
    );
};

export default ButtonIcon;