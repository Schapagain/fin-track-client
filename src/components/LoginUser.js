import React,{Component} from 'react';
import { loginUser } from '../actions/authActions';
import { clearErrors}  from '../actions/errorActions';
import propTypes from 'prop-types';
import { Spinner } from 'reactstrap';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Input,
    NavLink,
    Alert,
    FormGroup,
    Label,
} from 'reactstrap';
import { connect } from 'react-redux';

class LoginUser extends Component {

    state = {
        modal: false,
        email: "",
        password: "",
        message: null,
    };

    componentDidUpdate(prevProps) {
        const { error, auth } = this.props;
        if (error !== prevProps.error) {
            if (error.id === 'LOGIN_FAIL') {
                this.setState({
                    message: error.error
                })
            }else{
                this.setState({
                    message: null,
                })
            }
        }

        // Close the modal if it's open and the user is authenticated
        if (this.state.modal && auth.isAuthenticated) this.handleToggle();
    }

    handleToggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        })
    }

    handleFormChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        const {email, password } = this.state;
        this.props.loginUser({ email, password});

    }

    render(){
        return(
            <div>
                <NavLink onClick={this.handleToggle} href='#' >
                    Login
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.handleToggle}>
                    <ModalHeader toggle={this.handleToggle}>Login</ModalHeader>
                    <ModalBody>
                        { this.state.message? <Alert color="danger">{this.state.message}</Alert>: null}
                        <Form onSubmit={this.handleSubmit} className="p-5">
                            <FormGroup>
                                <Label >Email: </Label>
                                <Input onChange={this.handleFormChange} name ="email" value={this.state.email} type="text" placeholder="Enter your email" required/>
                            </FormGroup>
                            <FormGroup>
                                <Label> Password: </Label>
                                <Input onChange={this.handleFormChange} name ="password" value={this.state.password} type="password" placeholder="Enter your password" required/>
                            </FormGroup>
                            <div className="text-center">
                                {this.props.auth.isLoading? <Spinner color="primary" />:<Button className="col-6" type="submit">Login</Button>}
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
          </div>
        )
    }
}

LoginUser.propTypes = {
    auth: propTypes.object.isRequired,
    error: propTypes.object.isRequired,
    loginUser: propTypes.func.isRequired,
    clearErrors: propTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    error: state.errorReducer
});

export default connect(mapStateToProps, { loginUser, clearErrors })(LoginUser);