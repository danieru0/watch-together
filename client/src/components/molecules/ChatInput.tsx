import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Button from '../atoms/Button';
import ButtonIcon from '../atoms/ButtonIcon';

interface Values {
    text: string;
}

interface IChatInput {
    onChangeCardClick: (type: string) => void;
    onSubmit: (text: string) => void;
}

const ChatInputSchema = Yup.object().shape({
    text: Yup.string().required('Required!')
})

const Container = styled.div`
    width: 100%;
    background: ${({theme}) => theme.primaryHover};
    display: flex;
    align-items: center;
    padding: 15px 15px;
`

const StyledForm = styled(Form)`
    display: flex;
    align-items: center;
`

const Input = styled.input`
    height: 40px;
    width: 200px;
    font-size: 1em;
    background: ${({theme}) => theme.functional};
    border: none;
    outline: none;
    color: #fff;
    padding: 0px 5px;
    margin-right: 10px;

    @media (max-width: 384px) {
        width: 140px;
    }
`

const StyledButtonIcon = styled(ButtonIcon)`
    margin-left: auto;
`

const ChatInput = ({onChangeCardClick, onSubmit}: IChatInput) => {
    const initialValues: Values = {
        text: ''
    }

    return (
        <Container>
            <Formik
                initialValues={initialValues}
                validationSchema={ChatInputSchema}
                onSubmit={(values, actions) => {
                    onSubmit(values.text);
                    actions.resetForm();
                }}
            >
                {({values, errors, handleChange}) => (
                    <StyledForm>
                        <Input type="text" onChange={handleChange} name="text" value={values.text} placeholder="Your message..." />
                        <Button type="submit" lightHover={true}>send</Button>
                    </StyledForm>
                )}
            </Formik>
            <StyledButtonIcon fontSize="1.6em" onClick={() => onChangeCardClick('users')} iconType="user" />
        </Container>
    );
};

export default ChatInput;