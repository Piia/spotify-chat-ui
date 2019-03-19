import React from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20vh auto auto;
`;

const SpinnerPage = () =>
    <Container>
        <Spinner />
    </Container>;

export default SpinnerPage;
