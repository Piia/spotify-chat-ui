import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Timer from 'components/Timer/Timer';
import { format } from 'components/Timer/utils';

const TimerWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2em;
    padding: 0 ${props => props.theme.spacing.sm};
`;
TimerWrapper.displayName = 'TimerWrapper';

const Time = styled.span`
    font-family: ${props => props.theme.font.family.verdana};
    font-size: ${props => props.theme.font.size.sm};
    font-weight: ${props => props.theme.font.weight.normal};
    color: ${props => props.theme.colors.black};
`;
Time.displayName = 'Time';


const TimerPanel = ({ isPlaying, progressMillis, trackDurationMillis }) =>
    <TimerWrapper>
        <Time><Timer isPlaying={ isPlaying } progressMillis={ progressMillis } /></Time>
        <Time>{ format(trackDurationMillis) }</Time>
    </TimerWrapper>;

TimerPanel.displayName = 'TimerPanel';

TimerPanel.defaultProps = {
    isPlaying: false,
    progressMillis: 0,
    trackDurationMillis: 0,
};

TimerPanel.propTypes = {
    isPlaying: PropTypes.bool,
    progressMillis: PropTypes.number,
    trackDuratioMillis: PropTypes.number,
}

export default TimerPanel;
