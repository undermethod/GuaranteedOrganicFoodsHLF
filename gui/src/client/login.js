import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './css/base.css';

const { Wallets } = require('fabric-network');
const path = require('path');

class Login  extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 

        }
    }

    async componentDidMount(){
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.get('appUser');
        if (userIdentity) {
            console.log('An identity for the user "appUser" already exists in the wallet');
            return;
        }
    }

    render() { 
        return ( 
            <Form className="marginTop15">
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>User address</Form.Label>
                    <Form.Control type="text" placeholder="Enter user" />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign In
                </Button>
            </Form>
            
        );
    }    
}

export default Login;