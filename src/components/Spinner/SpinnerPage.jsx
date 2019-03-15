import React from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';

const Container = styled.div`
    margin: auto;
`;

const SpinnerPage = () =>
    <Container>
        <Spinner />
    </Container>;

export default SpinnerPage;
