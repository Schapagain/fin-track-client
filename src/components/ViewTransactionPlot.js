import React, { Component } from 'react';
import { getTransactions } from '../actions/transactionActions';
import propTypes from 'prop-types';
import Plot from 'react-plotly.js';
import { getCategoricalAmounts, getCumulativeAmounts, getMonthlyCategoricalAmounts, getCurrentFilter } from '../utils';
import { connect } from 'react-redux';
import moment from 'moment';
import LoadingPanel from './LoadingPanel';

class ViewTransactionPlot extends Component {

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
        const { transactions, loading } = this.props.transactions;
        const { startDate, endDate, category, type, aggregate } = this.props.filters;
        const plotType = type === ''? 'scatter':'bar';
        const { xvalues, yvalues } = (aggregate || category)? getMonthlyCategoricalAmounts(transactions) : (type  === ''? getCumulativeAmounts(transactions): getCategoricalAmounts(transactions));
        return(
            <div>
                {loading? <LoadingPanel/> : yvalues.length? <Plot style={{width: '100%',height: '100%'}}
                    data={[
                    {type: plotType, x: xvalues, y: yvalues},
                    ]}
                    layout={{
                        autosize: true,
                        title: {text: `${getCurrentFilter(type,category)} from ${moment(startDate).format('MMM Do')} to ${moment(endDate).format('MMM Do')}`},
                        yaxis: {
                            title: {text: 'Net transaction amounts ($)'}
                        },
                    }}
                    config={{displayModeBar:false,responsive:true}}
                    useResizeHandler={true}
                /> : null}
          </div>
        );
    }
}

ViewTransactionPlot.propTypes = {
    getTransactions: propTypes.func.isRequired,
    transactions: propTypes.object.isRequired,
    filters: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    transactions: state.transactionReducer,
    filters: state.filterReducer
});

export default connect(mapStateToProps, { getTransactions })(ViewTransactionPlot);