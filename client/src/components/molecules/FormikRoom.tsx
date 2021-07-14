import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import Input from '../atoms/Input';
import CheckRadioButton from '../atoms/CheckRadioButton';
import Button from '../atoms/Button';

import { BasicRoomData } from '../../types/types';

const CreateSchema = Yup.object().shape({
    roomName: Yup.string().min(4, 'Too short').max(15, 'Too long').required('Required!'),
    password: Yup.string()
})

const SettingsSchema = Yup.object().shape({
    roomName: Yup.string().min(4, 'Too short').max(15, 'Too long').required('Required!'),
})

export interface InitialValues {
    roomName: string;
    password: string;
    type: string;
    adminControl: boolean;
    usersNumber: number; 
}

interface IFormikRoom {
    formikType: 'create' | 'settings';
    submitted?: boolean;
    basicRoomData?: BasicRoomData | null;
    onSubmit: (values: InitialValues, formikType: string) => void;
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

const StyledInput = styled(Input)`
    margin: 10px 0px;
`

const Wrapper = styled.div`
    display: flex;
    margin-top: 10px;
    margin-bottom: 20px;
`

const StyledCheckRadioButton = styled(CheckRadioButton)`
    margin: 0px 50px;
`

const SliderText = styled.span`
    color: ${({theme}) => theme.fontColorPrimary};
    font-weight: 300;
    font-size: 1.3em;
    text-transform: uppercase;
    margin-bottom: 5px;
`

const StyledSlider = styled(Slider)`
    height: 40px;
    margin-bottom: 10px;

    .rc-slider-rail {
        background: ${({theme}) => theme.functional};
    }

    .rc-slider-handle {
        width: 20px;
        height: 20px;
        background: ${({theme}) => theme.primary};
        border: none;
    }

    .rc-slider-dot {
        width: 14px;
        height: 14px;
        bottom: -8px;
        background: ${({theme}) => theme.functionalHover};
        border: none;
        margin-left: -7px;
    }
`

const ButtonsWrapper = styled.div`
    display: flex;
    margin-top: 20px;
`

const StyledButton = styled(Button)`
    margin: 0px 10px;
`

const Create = ({formikType, basicRoomData, submitted, onSubmit}: IFormikRoom) => {
    const initialValues: InitialValues = {
        roomName: '',
        password: '',
        type: 'public',
        adminControl: false,
        usersNumber: 2
    }

    useEffect(() => {
        if (basicRoomData) {
            initialValues.type = basicRoomData.type;
            initialValues.adminControl = basicRoomData.adminControl;
            initialValues.usersNumber = basicRoomData.usersNumberMax;
            initialValues.roomName = basicRoomData.roomName;
        }
    }, [basicRoomData]); //eslint-disable-line

    return (
        <Container>
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={formikType === 'create' ? CreateSchema : SettingsSchema}
                onSubmit={values => {
                    onSubmit(values, formikType);
                }}
            >
                {({values, errors, handleChange, setFieldValue}) => (
                    <StyledForm>
                        <StyledInput onChange={handleChange} value={values.roomName} error={errors.roomName && errors.roomName} name="roomName" labelText="Room name" />
                        {formikType === 'create' && <StyledInput onChange={handleChange} type="password" value={values.password} error={errors.password && errors.password} name="password" labelText="Password" />}
                        <Wrapper>
                            <StyledCheckRadioButton onChange={handleChange} name="type" type="radio" id="type-radio-public" label="public" value="public" checked={values.type === 'public'} />
                            <StyledCheckRadioButton onChange={handleChange} name="type" type="radio" id="type-radio-private" label="private" value="private" checked={values.type === 'private'} />
                        </Wrapper>
                        <SliderText>Max people in the room</SliderText>
                        <StyledSlider value={values.usersNumber} onChange={(e) => setFieldValue('usersNumber', e)} railStyle={{ height: 10 }} trackStyle={{ display: 'none' }} marks={{ 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 }} min={2} max={6} step={1} />
                        <CheckRadioButton isCenter={false} onChange={handleChange} name="adminControl" type="checkbox" id="admin-checkbox" label="Only admin can control the video" value="adminControl" checked={values.adminControl} />
                        <ButtonsWrapper>
                            <StyledButton loading={submitted} type="submit">{formikType === 'create' ? 'Create' : 'Update'}</StyledButton>
                            {formikType === 'settings' && <StyledButton>Delete room</StyledButton>}
                        </ButtonsWrapper>
                    </StyledForm>
                )}
            </Formik>
        </Container>
    );
};

export default Create;