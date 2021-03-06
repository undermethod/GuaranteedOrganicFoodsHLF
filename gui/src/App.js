import React from 'react';
import { Nav, Container, Row, Col, Navbar } from 'react-bootstrap';
import Login from "./client/login"
import Logo from "./client/img/logogof_tittle.png";
import "./client/css/base.css";

class App  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      
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
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
        </Nav>
      </Navbar>
      <div>
          <Login></Login>
      </div>
    </Container>
    );
  }
}

export default App;
