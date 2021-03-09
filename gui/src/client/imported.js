import React from 'react';
import { Button, Form, Container} from 'react-bootstrap';
import './css/base.css';

class Imported  extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            valueWeight: "",
            valueLocation:"",
        }
        this.submitHarvest = this.submitHarvest.bind(this);
    }

    submitHarvest(evt){

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
                <h3>IMPORTED</h3>
                    <Form.Group>
                        <Form.Label className="marginTop15">Weight</Form.Label>
                        <Form.Control type="text" placeholder="Enter weight" 
                            onChange={(e) =>
                                this.setState({ valueWeight: e.target.value })
                            }
                        />
                        <Form.Label className="marginTop15">Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter location" 
                            onChange={(e) =>
                                this.setState({ valueLocation: e.target.value })
                            }
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.submitHarvest}>Submit</Button>
                </Form>
          </Container>
        );
    }    
}

export default Imported;