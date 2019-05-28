import React from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';

const Container = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const SpinnerPage = () =>
    <Container>
        <Spinner />
    </Container>;

export default SpinnerPage;
