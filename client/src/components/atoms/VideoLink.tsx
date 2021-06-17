import React from 'react';
import styled from 'styled-components';

interface IVideoLink {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    [key: string]: any;
}

const Container = styled.input`
    height: 40px;
    width: 400px;
    background: ${({theme}) => theme.primary};
    color: ${({theme}) => theme.fontcolorSecondary};
    font-size: 1em;
    border: none;
    outline: none;
    text-align: center;
    padding: 0px 10px;
`

const VideoLink = ({value, onChange, ...props}: IVideoLink) => {
    return (
        <Container placeholder="Insert your link here" onChange={onChange} value={value} {...props}/>
    );
};

export default VideoLink;