import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useHistory } from 'react-router-dom';

import { selectRoom, setPasswordAfterCreation } from '../features/room/roomSlice';

import { useSocketContext } from '../context/socketContext';

import useSocketError from '../hooks/useSocketError';

import FormikRoom, { InitialValues } from '../components/molecules/FormikRoom';

const Container = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Create = () => {
    const socket = useSocketContext();
    const dispatch = useAppDispatch();
    const roomSelector = useAppSelector(selectRoom);
    const history = useHistory();
    const formError = useSocketError();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [roomId, setRoomId] = useState('');

    const handleCreateRoomSubmit = (values: InitialValues, formikType: string) => {
        if (formSubmitted) return false;
        if (!socket) return false;
        setFormSubmitted(true);

        if (formikType === 'create') {
            socket.emit('requestCreateRoom', values);

            socket.on('sendRoomCreationStatus', roomId => {
                setRoomId(roomId);
                dispatch(setPasswordAfterCreation(values.password));
            });
        }
    }

    useEffect(() => {
        if (roomId) {
            history.push(`/room/${roomId}`);
        }
    }, [roomSelector.passwordAfterCreation, roomId, history])

    useEffect(() => {
        if (formError) {
            alert(formError);
        }
    }, [formError]);

    useEffect(() => {
        return () => {socket && socket.off('sendRoomCreationStatus')}
    }, [socket]);

    return (
        <Container>
            <FormikRoom submitted={formSubmitted} onSubmit={handleCreateRoomSubmit} formikType="create" />
        </Container>
    );
};

export default Create;