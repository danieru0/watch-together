import React from 'react';
import styled from 'styled-components';

interface IInput {
    value: string;
    labelText: string;
    error?: string;
    placeholder?: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    [key: string]: any;
}

const Container = styled.label`
    display: flex;
    flex-direction: column;
    color: ${({theme}) => theme.fontColorPrimary};
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: uppercase;
    font-weight: 300;
    margin-bottom: 5px;
    letter-spacing: 1px;
`

const Text = styled.span`
    font-size: 1.2em;
`

const Error = styled.span`
    color: ${({theme}) => theme.red};
    font-size: 0.6em;
`

const Inputt = styled.input`
    height: 50px;
    width: 280px;
    font-size: 1.3em;
    background: ${({theme}) => theme.functional};
    border: none;
    outline: none;
    color: #fff;
    padding: 0px 5px;
`

const Input = ({value, labelText, error, placeholder, name, onChange, ...props}: IInput) => {
    return (
        <Container {...props}>
            <Wrapper>
                <Text>{labelText}</Text>
                { error && <Error>{error}</Error> }
            </Wrapper>
            <Inputt onChange={onChange} name={name} value={value} placeholder={placeholder} />
        </Container>
    );
};

export default Input;