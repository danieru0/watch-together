import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../app/hooks';

import { setLogin } from '../features/auth/authSlice';

import { useSocketContext } from '../context/socketContext';

import useSocketError from '../hooks/useSocketError';

import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';

const LoginSchema = Yup.object().shape({
    login: Yup.string().min(4, 'Too short!').max(12, 'Too long!').required('Required!')
})

interface Values {
    login: string;
}

const Container = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const StyledButton = styled(Button)`
    margin-top: 15px;
`

const Login = () => {
    const socket = useSocketContext();
    const dispatch = useAppDispatch();
    const loginError = useSocketError();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const initialValues: Values = {
        login: ''
    }

    const handleLoginSubmit = (values: Values) => {
        if (formSubmitted) return false;
        if (!socket) return false;
        setFormSubmitted(true);

        socket.emit('requestLogin', values.login);

        socket.on('sendLogin', (login, userId) => {
            setFormSubmitted(false);

            dispatch(setLogin({
                login,
                userId
            }));
        })
    }

    useEffect(() => {
        if (loginError) {
            alert(loginError);
        }
    }, [loginError]);

    useEffect(() => {
        return () => {socket && socket.off('sendLogin')}
    }, [socket]);

    return (
        <Container>
            <Formik
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={values => {
                    handleLoginSubmit(values);
                }}
            >
                {({values, errors, handleChange}) => (
                    <StyledForm>
                        <Input onChange={handleChange} error={errors.login && errors.login as string} name="login" value={values.login} labelText="login" />
                        <StyledButton loading={formSubmitted} type="submit">login</StyledButton>
                    </StyledForm>
                )}
            </Formik>
        </Container>
    );
};

export default Login;