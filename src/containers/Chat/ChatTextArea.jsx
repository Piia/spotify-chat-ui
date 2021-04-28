import React from 'react';
import styled from 'styled-components';

const InputTextArea = styled.textarea`
    height: 5rem;
    max-height: 5rem;
    min-height: 5rem;
    resize: none;
    padding: ${props => props.theme.spacing.xs};
    box-sizing: border-box;
    background-color: ${props => props.theme.colors.outerSpace};
    color: ${props => props.theme.colors.magnolia};
    width: 100%;
    border: 1px solid ${props => props.theme.colors.black};

    &:focus {
        outline: none;
    }
`;
InputTextArea.displayName = 'InputTextArea';

const ChatTextArea = ({
    model,
    property,
    onChange,
    onKeyPress,
    placeholder,
    disabled,
}) => {
    return (
        <InputTextArea
            value={model && property && model[property]}
            onChange={event => onChange(property, event.target.value)}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            spellCheck="false"
        />
    );
};

export default ChatTextArea;
