import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import Spinner from './Spinner';
import SpinnerPage from './SpinnerPage';

storiesOf('Spinner', module)
    .addDecorator(withKnobs)
    .add('default', () => {
        const size = number('Size (em)', 7);
        return <Spinner size={size} />;
    })
    .add('SpinnerPage', () => <SpinnerPage />);
