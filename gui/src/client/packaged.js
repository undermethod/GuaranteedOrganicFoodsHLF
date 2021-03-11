import React from 'react';
import { Button, Form, Container} from 'react-bootstrap';
import './css/base.css';

class Packaged  extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            pcklocation: "",
            pckpackerid:"",
        }
        this.submitHarvest = this.submitPackaged.bind(this);
    }

    submitPackaged(evt){

    }

    componentDidMount() {
        var url = 'http://localhost:9000/querybox';
        var data = {
            username: localStorage.userValue, 
        };

        fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log(response)
        });
    }

    handleCloseLoginAlert(evet){
        this.setState({
            showAlertLogin: false,
        });
    }

    render() { 
        return ( 
            <Container>
                <Form className="marginTop15">
                    <h3>PACKAGED</h3>
                    <Form.Group>
                        <Form.Label className="marginTop15">Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter location" 
                            onChange={(e) =>
                                this.setState({ valueWeight: e.pcklocation.value })
                            }
                        />
                        <Form.Label className="marginTop15">Packager ID</Form.Label>
                        <Form.Control type="text" placeholder="Enter packager id" 
                            onChange={(e) =>
                                this.setState({ valueLocation: e.pckpackerid.value })
                            }
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.submitPackaged}>Submit</Button>
                </Form>
          </Container>
        );
    }    
}

export default Packaged;