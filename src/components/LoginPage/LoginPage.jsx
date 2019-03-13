import React from 'react';

export default function LoginPage(props) {
    return <div><a href={process.env.REACT_APP_BACKEND_LOGIN_URL}>Log in</a></div>;
}