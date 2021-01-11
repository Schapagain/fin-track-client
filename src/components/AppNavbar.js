import React, {Component,Fragment} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
    NavLink
} from 'reactstrap';

import RegisterUser from './RegisterUser';
import LogoutUser from './LogoutUser';
import LoginUser from './LoginUser';

import { connect } from 'react-redux';
import propTypes from 'prop-types';

class AppNavbar extends Component {
    
    state = {
        isOpen: false,
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    render(){
        const { isAuthenticated, user } = this.props.auth;

        const helloText = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user ? `Hello, ${user.name}`:null} </strong>
                    </span>
                </NavItem>
            </Fragment>
        )

        const authLinks = (
            <Fragment>
                <NavItem>
                    <LogoutUser />
                </NavItem>
            </Fragment>
        )
        const guestLinks = (
            <Fragment>
                <NavItem>
                    <LoginUser/>
                </NavItem>
                <NavItem>
                    <RegisterUser/>
                </NavItem>
                
            </Fragment>
        )

        return(
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand className="navbar" href="#"><img src={require("../logo.png")} alt=""></img></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {helloText}
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        {isAuthenticated? authLinks:guestLinks}
                        <NavItem>
                            <NavLink href='https://github.com/Schapagain/finance-tracker'>Github</NavLink>
                        </NavItem>
                    </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }

}

AppNavbar.propTypes = {
    auth: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.authReducer
});

export default connect(mapStateToProps,{})(AppNavbar);