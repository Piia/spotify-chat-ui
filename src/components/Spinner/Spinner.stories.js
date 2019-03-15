import React from 'react';
import { storiesOf } from '@storybook/react';
import Spinner from './Spinner';
import SpinnerPage from './SpinnerPage';

storiesOf('Spinner', module)
    .add('default', () => (
        <Spinner />
    ))
    .add('SpinnerPage', () => (
        <SpinnerPage />
    )); 
