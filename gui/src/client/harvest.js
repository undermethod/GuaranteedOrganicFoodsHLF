import React from 'react';
import { Button, Form, Container} from 'react-bootstrap';
import './css/base.css';

class Harvest  extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            valueuser: 'Producer',
            valueWeight: "",
            valueLocation:"",
            valueproducerID:"",
        }
        this.submitHarvest = this.submitHarvest.bind(this);
    }

    submitHarvest(evt){
        var url = 'http://localhost:9000/harvest';
        var data = {
            username: this.state.valueuser, 
            weight: this.state.valueWeight,
            location: this.state.valueLocation,
            producerID:this.state.valueproducerID
        };

        fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
                console.log('Esta es la respuesta del Harvest',response)
                this.setState({
                    valueWeight: "",
                    valueLocation:"",
                    valueproducerID:"",
                })
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
                    <h3>HARVEST</h3>
                    <Form.Group>
                        <Form.Label className="marginTop15">Producer ID</Form.Label>
                        <Form.Control type="text" placeholder="Enter ID" value={this.state.valueproducerID}
                            onChange={(e) =>
                                this.setState({ valueproducerID: e.target.value })
                            }
                        />
                        <Form.Label className="marginTop15">Weight</Form.Label>
                        <Form.Control type="text" placeholder="Enter weight" value={this.state.valueWeight}
                            onChange={(e) =>
                                this.setState({ valueWeight: e.target.value })
                            }
                        />
                        <Form.Label className="marginTop15">Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter location" value={this.state.valueLocation}
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

export default Harvest;