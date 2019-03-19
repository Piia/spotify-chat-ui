import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${props => props.theme.colors.outerSpace};

        ul {
            list-style-type: none;
            margin-top: 0;
            margin-bottom: 0;
            padding-left: 0;
        }
    }
`;

export default GlobalStyle;
