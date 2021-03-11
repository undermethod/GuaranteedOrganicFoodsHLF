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