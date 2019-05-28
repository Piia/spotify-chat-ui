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

    /* ENTER TRANSITION */
    /* Declare transition start properties*/
    .fade-enter {
        transform: translateX(-100vw);
        opacity: 0;
        position: absolute;
        
    }

    /* Declare transition properties */
    .fade-enter.fade-enter-active {
        transform: translateX(0);
        opacity: 1;
        transition: all 600ms linear 600ms;
    }

    /* EXIT TRANSITION */
    .fade-exit {
        transform: translateX(0);
        opacity: 1;
        
    }

    .fade-exit.fade-exit-active {
        transform: translateX(100vw);
        opacity: 0;
        transition: all 600ms linear
    }
`;

export default GlobalStyle;
