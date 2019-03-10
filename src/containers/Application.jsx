import React, { PureComponent, Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';

import Page from 'components/Page/Page';
import NavBar from 'containers/NavBar/NavBar';

class Application extends PureComponent {
    render() {

        return (
            <ThemeProvider theme={theme}>
                <Fragment>
                    <NavBar />
                    <Page />
                </Fragment>
            </ThemeProvider>
        );
    }
}

export default Application;
