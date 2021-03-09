import React from 'react';
import { Button, Form, Modal, Container, Navbar, Nav} from 'react-bootstrap';
import './css/base.css';


class Login  extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            valueuser: "",
            showAlertLogin:false,
        }
        this.validateUser = this.validateUser.bind(this);
        this.handleCloseLoginAlert = this.handleCloseLoginAlert.bind(this);
    }

    validateUser(event){
        event.preventDefault();
        if(this.state.valueuser !== ''){
            var url = 'http://localhost:9000/harvest';
            var data = {username: this.state.valueuser};

            fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if(response.error !== "Invalid user" ){
                    console.log('User pass')
                }else{
                    this.setState({
                        showAlertLogin: true,
                    });
                }
        });
        }
    }

    handleCloseLoginAlert(evet){
        this.setState({
            showAlertLogin: false,
        });
    }

    render() { 
        return ( 
            <Container>
                <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto">
                    </Nav>
                </Navbar>
                <Form className="marginTop15">
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>User</Form.Label>
                        <Form.Control type="text" placeholder="Enter user" 
                            onChange={(e) =>
                                this.setState({ valueuser: e.target.value })
                            }
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.validateUser}>
                        Sign In
                    </Button>
                </Form>
                <Modal show={this.state.showAlertLogin} onHide={this.handleCloseLoginAlert}>
                <Modal.Header closeButton>
                <Modal.Title>Transaction rejected</Modal.Title>
                </Modal.Header>
                <Modal.Body>Invalid user</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleCloseLoginAlert}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
          </Container>
        );
    }    
}

export default Login;