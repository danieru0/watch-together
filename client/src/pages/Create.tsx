import React from 'react';
import styled from 'styled-components';

import FormikRoom, { InitialValues } from '../components/molecules/FormikRoom';

const Container = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Create = () => {
    const handleCreateRoomSubmit = (values: InitialValues) => {
        console.log(values);
    }

    return (
        <Container>
            <FormikRoom onSubmit={handleCreateRoomSubmit} formikType="create" />
        </Container>
    );
};

export default Create;