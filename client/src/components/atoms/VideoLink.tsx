import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Button from '../../components/atoms/Button';

interface Values {
    link: string;
}

interface IVideoLink {
    onSubmit: (link: string) => void;
    [key: string]: any;
}

const LinkSchema = Yup.object().shape({
    link: Yup.string().required('Required')
})

const StyledForm = styled(Form)`
    display: flex;
    align-items: stretch;
`

const Input = styled.input`
    width: 400px;
    background: ${({theme}) => theme.primary};
    color: ${({theme}) => theme.fontcolorSecondary};
    font-size: 1em;
    border: none;
    outline: none;
    text-align: center;
    padding: 0px 10px;

    @media (max-width: 730px) {
        width: 250px;
    }

    @media (max-width: 345px) {
        width: 200px;
    }
`

const StyledButton = styled(Button)`
    margin-left: 15px;
`

const VideoLink = ({onSubmit, ...props}: IVideoLink) => {
    const initialValues: Values = {
        link: ''
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={LinkSchema}
            onSubmit={values => {
                onSubmit(values.link);
            }}
        >
            {({values, handleChange}) => (
                <StyledForm>
                    <Input name="link" placeholder="Insert your link here" onChange={handleChange} value={values.link} {...props}/>
                    <StyledButton type="submit">Set</StyledButton>
                </StyledForm>
            )}
        </Formik>
    );
};

export default VideoLink;