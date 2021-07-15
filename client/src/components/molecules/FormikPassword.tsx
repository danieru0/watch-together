import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';

interface Values {
    password: string;
}

interface IFormikPassword {
    formSubmitted: boolean;
    passwordError: string;
    onSubmit: (passwordValue: string) => void;
}

interface TextProps {
    passworderror: boolean;
}

const PasswordSchema = Yup.object().shape({
    password: Yup.string().required('Required!')
})


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

const StyledIcon = styled(FontAwesomeIcon)`
    color: ${({theme}) => theme.primary};
    font-size: 4em;
    margin-bottom: 5px;
`

const Text = styled.span<TextProps>`
    color: ${({theme, passworderror}) => passworderror ? theme.red : theme.fontColorPrimary};
    font-size: 1.5em;
    font-weight: 300;
    user-select: none;
    margin-bottom: 30px;
    text-align: center;
`

const StyledButton = styled(Button)`
    margin-top: 15px;
`

const FormikPassword = ({formSubmitted, passwordError, onSubmit}: IFormikPassword) => {
    const initialValues: Values = {
        password: ''
    }

    return (
        <Container>
            <Formik
                initialValues={initialValues}
                validationSchema={PasswordSchema}
                onSubmit={values => {
                    onSubmit(values.password);
                }}
            >
                {({values, errors, handleChange}) => (
                    <StyledForm>
                        <StyledIcon icon="lock" />
                        <Text passworderror={passwordError ? true : false}>{passwordError ? passwordError : 'This room is password protected.'}</Text>
                        <Input type="password" onChange={handleChange} error={errors.password && errors.password as string} name="password" value={values.password} labelText="password" />
                        <StyledButton loading={formSubmitted} type="submit">Join</StyledButton>
                    </StyledForm>
                )}
            </Formik>
        </Container>
    );
};

export default FormikPassword;