import React from 'react';
import { Button, Form, Modal, Container, Navbar, Nav } from 'react-bootstrap';
import './css/base.css';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueuser: "",
            valuepassword: "",
            showAlertLogin: false,
        }
        this.validateUser = this.validateUser.bind(this);
        this.handleCloseLoginAlert = this.handleCloseLoginAlert.bind(this);
    }

    validateUser(event) {
        event.preventDefault();
        if (this.state.valueuser !== '') {
            var url = 'http://localhost:9000/login';
            var data = {
                username: this.state.valueuser,
                password: this.state.valuepassword
            };

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .catch(err => {
                    console.log("OOPS", err);
                    if (err.status === 401) {
                        console.log("nailed it");
                    }
                })
                .then(res => {
                    if (res.status === 401) { // Unauthorized
                        this.setState({ showAlertLogin: true });
                        return;
                    }
                    return res.json();
                })
                .then(response => {
                    if (response.error !== 'Invalid user') {
                        if (response.loggedinuser === this.state.valueuser) {
                            console.log(`User '${response.loggedinuser}' logged in`);
                        }
                        if (this.props.onlogin) {
                            localStorage.userValue = this.state.valueuser;
                            this.props.onlogin();
                        }
                    } else {
                        this.setState({ showAlertLogin: true });
                    }
                })
                .catch(error => console.error('Error:', error))
            ;
        }
    }

    handleCloseLoginAlert(evet) {
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
                            onChange={(ev) =>
                                this.setState({ valueuser: ev.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" autoComplete="ignore"
                            onChange={(ev) =>
                                this.setState({ valuepassword: ev.target.value })
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
                    <Modal.Body>Invalid user and/or password</Modal.Body>
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