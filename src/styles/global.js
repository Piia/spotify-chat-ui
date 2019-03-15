import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${props => props.theme.colors.outerSpace};
    }
`;

export default GlobalStyle;
