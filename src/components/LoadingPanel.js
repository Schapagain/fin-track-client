import React from 'react';
import { Spinner, Row } from 'reactstrap';

const LoadingPanel = (props) => {
  return (
    <Row className="justify-content-center p-5" id="loading-panel">
        <Spinner/>
    </Row>
  );
}

export default LoadingPanel;