import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';


const BasicText = styled.p`
    font-family: ${props => props.theme.font.family.georgia};
    font-size: ${props => props.theme.font.size.md};
    font-weight: ${props => props.theme.font.weight.normal};
    color: ${props => props.theme.colors.voodoo};
`;


class Page extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.loggedIn) {
            return <div>Logging in (i wanna be a spinner)...</div>;
        } else {
            return <BasicText>Hello Page!</BasicText>;
        }
    }
}


const mapStateToProps = state => ({'loggedIn': state.loggedIn});

export default connect(mapStateToProps)(Page);