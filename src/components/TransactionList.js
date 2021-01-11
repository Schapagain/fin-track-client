import React,{Component} from 'react';
import { ListGroup, ListGroupItem, Row } from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { connect } from 'react-redux';
import { deleteTransaction } from '../actions/transactionActions';
import propTypes from 'prop-types';
import LoadingPanel from './LoadingPanel';

const Transaction = props => {
    const {transaction, deleteTransaction} = props;
    return(
        <ListGroupItem onClick={() => deleteTransaction(transaction.id)} className= {`transaction-${transaction.type} transaction`}>
            <Row>
                <div className="col-3">{transaction.date}</div>
                <div className="col-6">{transaction.title}</div>
                <div className="col-3">{'$'+transaction.amount}</div>
            </Row>
        </ListGroupItem>
    )
}

class TransactionList extends Component {

    render(){
        const { transactions, loading } = this.props.transactions;
        return (
            <>
            
            <ListGroup id="transaction-list">
                {loading? <LoadingPanel/>:
                !transactions.length? 
                <div className="no-transactions-panel rounded p-2">
                    <p>You have no transactions in this period</p>
                </div> :
                <TransitionGroup>
                    {transactions.map(transaction => (
                        <CSSTransition key={transaction.id} timeout={500} classNames="fade">
                            <Transaction deleteTransaction={this.props.deleteTransaction} transaction={transaction}/>
                        </CSSTransition>
                    ))}
                </TransitionGroup>}
            </ListGroup>
            </>
        )
    }
}

TransactionList.propTypes = {
    deleteTransaction: propTypes.func.isRequired,
    transactions: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    transactions: state.transactionReducer
});

export default connect(mapStateToProps, { deleteTransaction })(TransactionList);