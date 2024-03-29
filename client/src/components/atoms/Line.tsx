import React from 'react';
import styled from 'styled-components';

interface ILine {
    [key: string]: any;
}

const Container = styled.div`
    width: 500px;
    height: 5px;
    background: ${({theme}) => theme.primary};

    @media (max-width: 500px) {
        width: 100%;
    }
`

const Line = ({...props}: ILine) => {
    return (
        <Container {...props}/>
    );
};

export default Line;