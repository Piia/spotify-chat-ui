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

    .fade-enter, .fade-appear {
        opacity: 0.01;
        
    }

    .fade-enter.fade-enter-active, .fade-appear.fade-appear-active {
        opacity: 1;
        transition: opacity 280ms ease-in;
    }

    .fade-exit {
        opacity: 1;
        
    }

    .fade-exit.fade-exit-active {
        opacity: 0.01;
        transition: opacity 280ms ease-out;
    }
`;

export default GlobalStyle;
