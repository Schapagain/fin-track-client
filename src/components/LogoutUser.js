import React, { Component, Fragment } from 'react';
import { logoutUser } from '../actions/authActions';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';
import propTypes from 'prop-types';

class LogoutUser extends Component {

    render(){
        return(
            <Fragment>
                <NavLink onClick={this.props.logoutUser} href='#'>Logout</NavLink>
            </Fragment>
        )
    }
}

LogoutUser.propTypes = ({
    logoutUser: propTypes.func.isRequired
});

export default connect(null, { logoutUser })(LogoutUser);