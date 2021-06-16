import React from 'react';
import styled from 'styled-components';

interface ILine {
    [key: string]: any;
}

const Container = styled.div`
    width: 500px;
    height: 5px;
    background: ${({theme}) => theme.primary};
`

const Line = ({...props}: ILine) => {
    return (
        <Container {...props}/>
    );
};

export default Line;