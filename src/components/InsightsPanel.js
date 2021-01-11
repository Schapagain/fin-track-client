import React, { Component } from 'react';
import { getTransactions } from '../actions/transactionActions';
import propTypes from 'prop-types';
import { getTotalExpense, getTotalIncome } from '../utils';
import { connect } from 'react-redux';

class InsightsPanel extends Component {

    state = {
        modal: false,
        days: [],
        amounts: [],
    }

    handleToggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    render(){
        const { transactions } = this.props.transactions;
        const totalExpense = getTotalExpense(transactions);
        const totalIncome = getTotalIncome(transactions);
        const expensePercent = Number(totalExpense*100/totalIncome).toFixed(1);
        return(
            <>
            {transactions.length? <div className="insights-panel rounded p-2 mt-3">
               <p>You've spent {expensePercent}% of your income this period</p>
            </div> : null }
            </>
        );
    }
}

InsightsPanel.propTypes = {
    getTransactions: propTypes.func.isRequired,
    transactions: propTypes.object.isRequired,
    filters: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    transactions: state.transactionReducer,
    filters: state.filterReducer
});

export default connect(mapStateToProps, { getTransactions })(InsightsPanel);