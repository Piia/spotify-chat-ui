import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Fade = (props: any) => (
    <TransitionGroup>
        <CSSTransition {...props} appear timeout={280} classNames="fade" />
    </TransitionGroup>
);

export default Fade;
