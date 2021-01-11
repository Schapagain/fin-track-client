
import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { setCategory, setType, setAggregate } from '../actions/filterActions';
import { getTransactions } from '../actions/transactionActions';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getCurrentFilter } from '../utils';

class PickCategory extends Component {

  shouldComponentUpdate(nextProps){
      const { category, type } = this.props.filters;
      const { category:nextCategory, type:nextType } = nextProps.filters;
      if (!(category === nextCategory && type === nextType)) this.props.getTransactions();
      return true;
  }

  state = {
    dropdownOpen: false
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  };

  render(){
    let { category, type } = this.props.filters;
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {getCurrentFilter(type,category)}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={()=>{this.props.setCategory('');this.props.setType('');this.props.setAggregate(false)}}>All transactions</DropdownItem>
          <DropdownItem disabled>Incomes</DropdownItem>
          <DropdownItem onClick={()=>{this.props.setType('income');this.props.setCategory('');this.props.setAggregate(false)}}> All Incomes</DropdownItem>
          <DropdownItem onClick={()=>{this.props.setCategory('');this.props.setType('income');this.props.setAggregate(true)}}>Monthly Incomes</DropdownItem>
          <DropdownItem onClick={()=>{this.props.setCategory('work');this.props.setType('income');this.props.setAggregate(false)}}>Work</DropdownItem>
          <DropdownItem onClick={()=>{this.props.setCategory('wyzant');this.props.setType('income');this.props.setAggregate(false)}}>Wyzant Tutoring</DropdownItem>
          <DropdownItem onClick={()=>{this.props.setCategory('teaching and tutoring');this.props.setType('income');this.props.setAggregate(false)}}>Teaching and Tutoring</DropdownItem>
          <DropdownItem onClick={()=>{this.props.setCategory('refunds');this.props.setType('income');this.props.setAggregate(false)}}>Refunds</DropdownItem>
          <DropdownItem divider />
          <DropdownItem disabled>Expenses</DropdownItem>
          <DropdownItem onClick={()=>{this.props.setType('expense');this.props.setCategory('');this.props.setAggregate(false)}}> All Expenses</DropdownItem>
          <DropdownItem onClick={()=>{this.props.setCategory('');this.props.setType('expense');this.props.setAggregate(true)}}>Monthly expenses</DropdownItem>
          <DropdownItem onClick={()=>{this.props.setCategory('eat out');this.props.setType('expense');this.props.setAggregate(false)}}>Eat Out</DropdownItem>
          <DropdownItem onClick={()=>{this.props.setCategory('education');this.props.setType('expense');this.props.setAggregate(false)}}>Education</DropdownItem>
          <DropdownItem onClick={()=>{this.props.setCategory('alcohol');this.props.setType('expense');this.props.setAggregate(false)}}>Alcohol</DropdownItem>
          <DropdownItem onClick={()=>{this.props.setCategory('grocery');this.props.setType('expense');this.props.setAggregate(false)}}>Grocery</DropdownItem>
          <DropdownItem onClick={()=>{this.props.setCategory('bills and utilities');this.props.setType('expense');this.props.setAggregate(false)}}>Bills and utilities</DropdownItem>
          <DropdownItem onClick={()=>{this.props.setCategory('miscellaneous');this.props.setType('expense');this.props.setAggregate(false)}}>Miscellaneous</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

PickCategory.propTypes = {
  getTransactions: propTypes.func.isRequired,
  setCategory: propTypes.func.isRequired,
  setAggregate: propTypes.func.isRequired,
  setType: propTypes.func.isRequired,
}

const mapStateToProps = state => ({
  filters: state.filterReducer
});

export default connect(mapStateToProps, {getTransactions, setCategory, setType, setAggregate })(PickCategory);