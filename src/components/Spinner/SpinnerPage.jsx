import React from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';
import Fade from 'components/Fade/Fade';

const Container = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const SpinnerPage = () =>
    <Fade>
        <Container>
            <Spinner />
        </Container>
    </Fade>;

export default SpinnerPage;
