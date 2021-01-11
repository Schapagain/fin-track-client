import React,{ Component } from 'react';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { setStartDate, setEndDate } from '../actions/filterActions';
import { getTransactions } from '../actions/transactionActions';
import propTypes from 'prop-types';
import "react-datepicker/dist/react-datepicker.css";

class PickDateRange extends Component {

  componentDidMount(){
    this.props.getTransactions();
  }

  componentDidUpdate(){
      this.props.getTransactions();
  }

  shouldComponentUpdate(nextProps){
      const { startDate, endDate } = this.props.filters;
      const { startDate:nextStartDate, endDate:nextEndDate } = nextProps.filters;
      return !(startDate.getTime() === nextStartDate.getTime()) || !(endDate.getTime() === nextEndDate.getTime());
  }

  render(){
      const { startDate,endDate } = this.props.filters;
      return (
          <>
            <DatePicker
              selected={startDate}
              onChange={date => this.props.setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              showMonthYearPicker
            />
            <DatePicker
              selected={endDate}
              onChange={date => this.props.setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              showMonthYearPicker
            />
        </>
      );
    }
    
  };

PickDateRange.propTypes = {
    getTransactions: propTypes.func.isRequired,
    setStartDate: propTypes.func.isRequired,
    setEndDate: propTypes.func.isRequired,
    filters: propTypes.object.isRequired
}

const mapStateToProps = state => ({
    filters: state.filterReducer
});

export default connect(mapStateToProps, { getTransactions, setStartDate, setEndDate })(PickDateRange);