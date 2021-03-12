import React from 'react';
import { Button, Form, Container} from 'react-bootstrap';
import './css/base.css';

class Shipped  extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            valueBoxes:[],
            valueSelect:"",
            shipShipperId:"",
            shipContainerId:"",
            shipOriginCountry:"",
            shipDestinationCountry:"",
        }
        this.submitShip = this.submitShip.bind(this);
        this.handleChangeSelectBox = this.handleChangeSelectBox.bind(this);
    }

    submitShip(){
        var url = 'http://localhost:9000/ship';
        var data = {
            //exportInspect(ctx, role, boxId, exporterId, loc, inspectionAgentId, destinationCountry, passInspection, timestamp)
            username: localStorage.userValue, 
            boxId: this.state.valueSelect,
            shipperId: this.state.shipShipperId,
            containerId: this.state.shipContainerId,
            originCountry: this.state.shipOriginCountry,
            destinationCountry: this.state.shipDestinationCountry,
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
                console.log(response)
        });
    }

    handleChangeSelectBox(event) {
        this.setState({ valueSelect: event.target.value });
    }
    
      
    componentDidMount() {
        var url = 'http://localhost:9000/querybox';
        var data = {
            username: localStorage.userValue, 
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
                let valueArray = response;
                console.log(valueArray)
                valueArray= valueArray.filter(r => r.Record[0].state === "Exported")
                this.setState({ valueBoxes: valueArray });
        });
    }


    render() { 
        return ( 
            <Container>
                <Form className="marginTop15">
                    <h3>PACKAGED</h3>
                    <Form.Group>
                        <Form.Label className="marginTop15">Select Box</Form.Label>
                        <Form.Control as="select" value={this.state.valueSelect} onChange={this.handleChangeSelectBox}>
                            <option value="">Select an option</option>
                            {this.state.valueBoxes.map((box) => {
                                    return <option value={box.Record[0].boxId} key={box.Record[0].boxId}>{box.Record[0].boxId}</option>
                                }
                            )}
                        </Form.Control>
                        <Form.Label className="marginTop15">Shipper Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter Shipper Id" 
                            onChange={(e) =>
                                this.setState({ shipShipperId: e.target.value })
                            }
                        />
                        <Form.Label className="marginTop15">Container Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter Container Id" 
                            onChange={(e) =>
                                this.setState({ shipContainerId: e.target.value })
                            }
                        />
                        <Form.Label className="marginTop15">Origin Country</Form.Label>
                        <Form.Control type="text" placeholder="Enter Origin Country" 
                            onChange={(e) =>
                                this.setState({ shipOriginCountry: e.target.value })
                            }
                        />
                        <Form.Label className="marginTop15">Destination Country</Form.Label>
                        <Form.Control type="text" placeholder="Enter Destination Country" 
                            onChange={(e) =>
                                this.setState({ shipDestinationCountry: e.target.value })
                            }
                        />
                       
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.submitShip}>Submit</Button>
                </Form>
          </Container>
        );
    }
}

export default Shipped;