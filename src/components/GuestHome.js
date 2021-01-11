import React, { Component } from 'react';
import Typed  from 'typed.js';
import { Row,Col, Container } from 'reactstrap';
import guestImage1 from '../guestImage1.png';
import guestImage2 from '../guestImage2.png';

class GuestHome extends Component {
    componentDidMount() {
        const strings = [
          '^500 Start tracking your own finances',
          'Visualize data and gain unique insights',
          'Login or register to get started',
          ];
        
        const titleStrings = [
          'TrackIt'
        ];
        const options = {
                strings: strings,
                typeSpeed: 30,
                backSpeed: 50,
                loop: true,
                fadeOut: true,
                showCursor: false,
            };
          
        const titleOptions = {
            strings: titleStrings,
            typeSpeed: 30,
            showCursor: false,
        }

        this.typed = new Typed('.typed-span', options);
        this.typedTitle = new Typed('.typed-span-title',titleOptions);
    }
  
    componentWillUnmount() {
        this.typed.destroy();
    }
  
    render() {
      return (
        <Container>
            <Row className="justify-content-center p-2">
              <Col className="mb-3" xs="10" sm="6" md="6">
                  <div className="typed-canvas rounded">
                      <p className="typed-span-title" ></p>
                      <p className="typed-span" ></p>
                  </div>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col className="mb-2" xs="10" sm="5" md="5">
                <img style={{"width":"100%","height":"100%"}} className="rounded" src={guestImage1} alt="sample plot"></img>
              </Col>
              <Col className="mb-2" xs="10" sm="5" md="5">
                <img style={{"width":"100%","height":"100%"}} className="rounded" src={guestImage2} alt="sample plot"></img>
              </Col>
            </Row>
        </Container>
      );
    }
  }
  
  export default GuestHome;