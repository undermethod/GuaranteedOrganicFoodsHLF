import React from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import Login from "./client/login"
import Services from "./client/services"
import Logo from "./client/img/logogof_tittle.png";
import "./client/css/base.css";

class App  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      panel: <Services/>
    }
}
  /*clickmenu(key){
    if(key == 'linkRequest'){
      this.setState({panel: <RequestLoan/>})
    }
    if(key == 'linkPayment'){
      this.setState({panel: <Payment/>})
    }
    panel: <RequestLoan/>,
    {this.state.panel}
  }*/

  render() { 
  return (
    <Container fluid="md" style={{marginTop: "25px"}}>
      <Row style={{background: "#"}} >
          <Col style={{display: "inline-flex"}}>
          </Col><Col style={{
                      display: "contents",
                  }}>
              <img src={Logo} alt="Logo"/>
          </Col>
      </Row>
      <div>
          {this.state.panel}
      </div>
    </Container>
    );
  }
}

export default App;
