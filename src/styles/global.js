import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${props => props.theme.colors.outerSpace};
    }

    ul {
        list-style-type: none;
    }
`;

export default GlobalStyle;
