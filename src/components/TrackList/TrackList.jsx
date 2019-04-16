import styled from 'styled-components';

const TrackList = styled.ul`
    height: calc(100vh - 8rem);
    width: 25em;
    overflow-x: hidden;
    overflow-y: scroll;
`;
TrackList.displayName = 'TrackList';

export default TrackList;
