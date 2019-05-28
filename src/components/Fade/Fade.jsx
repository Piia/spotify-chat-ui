import React from 'react';
import { CSSTransition } from 'react-transition-group'


const Fade = props =>
    <CSSTransition in={true} timeout={900} classNames="fade">
        { props.children }
    </CSSTransition>;

export default Fade;
