import React, { Component } from 'react';

import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';
import ViewTransactionPlot from './ViewTransactionPlot';
import PickDateRange from './PickDateRange';
import { Container, Row, Col } from 'reactstrap';

import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getTransactions } from '../actions/transactionActions';
import PickCategory from '../components/PickCategory';
import GuestHome from './GuestHome';
import InsightsPanel from './InsightsPanel';

class MainContainer extends Component {

  render(){
    const { isAuthenticated } = this.props.auth;

    const authContainer = (
      <Container id="main-panel">
            <Row className="ml-1">
              <AddTransaction />
            </Row>
            <Row className="mb-2 ml-1">
              <PickDateRange />
              <Col className="col-4">
              <PickCategory />
              </Col>
            </Row>
            <Row className="pb-3">
              <Col className="mb-2" xs="12" sm="12" md="12" lg="6">
                <TransactionList/>
              </Col>
              <Col xs="12" sm="12" md="12" lg="6">
                <ViewTransactionPlot/>
                <InsightsPanel />
              </Col>
            </Row>
          </Container>
    )

    const guestContainer = (
      <Container id="main-panel">
        <Row className="justify-content-center">
          <GuestHome />
        </Row>
      </Container>
    )

    return (
      <>
        {isAuthenticated? authContainer:guestContainer}
      </>
    );
  }
}

MainContainer.propTypes = {
  auth: propTypes.object.isRequired,
  getTransactions: propTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.authReducer,
  getTransactions: state.getTransactions,
});

export default connect(mapStateToProps,{ getTransactions })(MainContainer);