import React,{Component} from 'react';
import moment from 'moment';
import { addTransaction } from '../actions/transactionActions';
import propTypes from 'prop-types';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Input,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';
import { connect } from 'react-redux';

class AddTransaction extends Component {

    state = {
        modal: false,
        amount: "",
        title: "",
        category: "",
        type: "",
        date: moment().format("YYYY-MM-DD")
    }

    handleToggle = () => {
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

        const newTransaction = {
            amount: this.state.amount,
            title: this.state.title,
            category: this.state.category,
            date: this.state.date,
            type: this.state.type,
        }

        this.props.addTransaction(newTransaction);
    }

    render(){

        const incomeCategories = (
            <Input defaultValue="" onChange={this.handleFormChange} type="select" name ="category" required>
                            <option value="" disabled>Pick a Category</option>
                            <option value="Work">Work</option>
                            <option value="Wyzant">Wyzant</option>
                            <option value="Teaching and Tutoring">Teaching and tutoring</option>
                            <option value="Refunds">Refunds</option>
            </Input>
        );

        const expenseCategories = (
            <Input defaultValue="" onChange={this.handleFormChange} type="select" name ="category" required>
                            <option value="" disabled>Pick a Category</option>
                            <option value="Education">Education</option>
                            <option value="Gadgets">Gadgets</option>
                            <option value="Health and Fitness">Health and Fitness</option>
                            <option value="Personal Care">Personal Care</option>
                            <option value="Bills and Utilities">Bills and Utilities</option>
                            <option value="Books">Books</option>
                            <option value="Grocery">Grocery</option>
                            <option value="Eat Out">Eat out</option>
                            <option value="Alcohol">Alcohol</option>
                            <option value="Miscellaneous">Miscellaneous</option>
            </Input>
        );

        const noneCategories = (
            <Input defaultValue="" onChange={this.handleFormChange} type="select" name ="category" required>
                <option value="" disabled>Pick a transaction type first</option>
            </Input>           
        );


        return(
            <div>
            <Button color="dark" className="mb-3" onClick={this.handleToggle}>Add new transaction</Button>
            <Modal isOpen={this.state.modal} toggle={this.handleToggle}>
                <ModalHeader toggle={this.handleToggle}>Add a new Transaction</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleSubmit} className="p-5">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                            <Input onChange={this.handleFormChange} name ="amount" value={this.state.amount} type="number" placeholder="Enter the amount" required />
                        </InputGroup>
                        <Input onChange={this.handleFormChange} name ="title" value={this.state.title} type="text" placeholder="What was this about?" required/>

                        <Input defaultValue="" onChange={this.handleFormChange} type="select" name ="type" required>
                            <option value="" disabled>Pick a transaction type</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </Input>
                        {this.state.type === ""? noneCategories: this.state.type === 'income'? incomeCategories:expenseCategories}
                        <Input className="mb-3" onChange={this.handleFormChange} name ="date" type="date" defaultValue={this.state.date}/>
                        <div className="text-center">
                            <Button className="col-6" type="submit">Save</Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
          </div>
        )
    }
}

AddTransaction.propTypes = {
    addTransaction: propTypes.func.isRequired,
    transactionReducer: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    transactionReducer: state.transactionReducer
});

export default connect(mapStateToProps, { addTransaction })(AddTransaction);