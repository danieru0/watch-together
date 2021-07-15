import React from 'react';
import styled, { css } from 'styled-components';

interface ICheckRadioButton {
    type: 'radio' | 'checkbox';
    id: string;
    label: string;
    value: string;
    isCenter?: boolean;
    checked: boolean;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    [key: string]: any;
}

interface InputProps {
    iscenter: boolean;
}

const Container = styled.div``

const Input = styled.input<InputProps>`
    &:checked, &:not(:checked) {
        position: absolute;
        left: -9999px;
    }

    &:checked + label:before, &:not(:checked) + label:before {
        content: '';
        display: block;
        width: 40px;
        height: 40px;
        background: ${({theme}) => theme.functional};

        ${({iscenter}) => iscenter && css`margin: auto;`}

        margin-bottom: 5px;
    }

    &:checked + label:after, &:not(:checked) + label:after {
        content: '';
        position: absolute;
        top: 10px;
        right: 0;
        left: ${({iscenter}) => iscenter ? '0px' : '10px'};
        width: 20px;
        height: 20px;
        background: ${({theme}) => theme.primary};
        opacity: 0;

        ${({iscenter}) => iscenter && css`margin: auto;`}
    }

    &:checked + label:after {
        opacity: 1;
    }
`

const Label = styled.label`
    position: relative;
    cursor: pointer;
    color: ${({theme}) => theme.fontColorPrimary};
    font-weight: 300;
    font-size: 1.3em;
    user-select: none;
    text-transform: uppercase;

    @media (max-width: 430px) {
        font-size: 0.9em;
    }
`

const CheckRadioButton = ({type, id, label, value, name, isCenter = true, onChange, checked, ...props}: ICheckRadioButton) => {
    return (
        <Container {...props}>
            <Input iscenter={isCenter} onChange={onChange} name={name} value={value} checked={checked} type={type} id={id} />
            <Label htmlFor={id}>{label}</Label>
        </Container>
    );
};

export default CheckRadioButton;