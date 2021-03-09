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
        if(this.state.valueuser !== ''){
            var url = 'http://localhost:9000/harvest';
            var data = {
                username: this.state.valueuser, 
                weight: this.state.valueWeight,
                location: this.state.valueLocation,
                producerID:this.state.valueproducerID
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
                <Form className="marginTop15">
                    <h3>HARVEST</h3>
                    <Form.Group>
                        <Form.Label className="marginTop15">Producer ID</Form.Label>
                        <Form.Control type="text" placeholder="Enter ID" 
                            onChange={(e) =>
                                this.setState({ valueproducerID: e.target.value })
                            }
                        />
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

export default Harvest;