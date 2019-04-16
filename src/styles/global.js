import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${props => props.theme.colors.voodoo};

        ul {
            list-style-type: none;
            margin-top: 0;
            margin-bottom: 0;
            padding-left: 0;
        }

        ::-webkit-scrollbar {
            display: none;
        }
    }

    ::-webkit-scrollbar {
        width: 10px;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: ${props => props.theme.colors.strikemaster};
        border: 1px solid ${props => props.theme.colors.black};
    }
`;

export default GlobalStyle;
