import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

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
    const initialValues: Values = {
        login: ''
    }

    return (
        <Container>
            <Formik
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={values => {
                    console.log(values)
                }}
            >
                {({values, errors, handleChange}) => (
                    <StyledForm>
                        <Input onChange={handleChange} error={errors.login && errors.login as string} name="login" value={values.login} labelText="login" />
                        <StyledButton type="submit">login</StyledButton>
                    </StyledForm>
                )}
            </Formik>
        </Container>
    );
};

export default Login;