import styled from 'styled-components';

const TrackList = styled.ul`
    background-color: ${props => props.theme.colors.goblin};
    height: 65vh;
    width: 25em;
    overflow-x: hidden;
    overflow-y: scroll;
`;
TrackList.displayName = 'TrackList';

export default TrackList;
