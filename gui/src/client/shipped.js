import React from 'react';
import { Button, Form, Container, Modal} from 'react-bootstrap';
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
            showAlertTransaction:false,
        }
        this.submitShip = this.submitShip.bind(this);
        this.handleChangeSelectBox = this.handleChangeSelectBox.bind(this);
        this.handleCloseTransactionAlert = this.handleCloseTransactionAlert.bind(this); 
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
                this.setState({
                    valueSelect:"",
                    shipShipperId:"",
                    shipContainerId:"",
                    shipOriginCountry:"",
                    shipDestinationCountry:"",
                    showAlertTransaction :true,
                })
        });
    }

    handleChangeSelectBox(event) {
        this.setState({ valueSelect: event.target.value });
    }
    
    handleCloseTransactionAlert(evet){
        this.setState({
            showAlertTransaction: false,
        });
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
                    <h3>SHIPPED</h3>
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
                        <Form.Control type="text" placeholder="Enter Shipper Id" value={this.state.shipShipperId}
                            onChange={(e) =>
                                this.setState({ shipShipperId: e.target.value })
                            }
                        />
                        <Form.Label className="marginTop15">Container Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter Container Id" value={this.state.shipContainerId}
                            onChange={(e) =>
                                this.setState({ shipContainerId: e.target.value })
                            }
                        />
                        <Form.Label className="marginTop15">Origin Country</Form.Label>
                        <Form.Control type="text" placeholder="Enter Origin Country" value={this.state.shipOriginCountry}
                            onChange={(e) =>
                                this.setState({ shipOriginCountry: e.target.value })
                            }
                        />
                        <Form.Label className="marginTop15">Destination Country</Form.Label>
                        <Form.Control type="text" placeholder="Enter Destination Country" value={this.state.shipDestinationCountry}
                            onChange={(e) =>
                                this.setState({ shipDestinationCountry: e.target.value })
                            }
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.submitShip}>Submit</Button>
                </Form>
                <Modal show={this.state.showAlertTransaction} onHide={this.handleCloseTransactionAlert}>
                    <Modal.Header closeButton>
                    <Modal.Title>Transaction approved</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Transaction successful</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseTransactionAlert}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
          </Container>
        );
    }
}

export default Shipped;