import React from 'react';
import { Button, Form, Container, Modal} from 'react-bootstrap';
import './css/base.css';

class Distributed  extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            valueBoxes:[],
            valueSelect:"",
            distriDistributorId:"",
            distriLoc:"",
            distriDestinationRetailerId:"",
            showAlertTransaction:false,
        }
        this.submitImported = this.submitImported.bind(this);
        this.handleChangeSelectBox = this.handleChangeSelectBox.bind(this);
        this.handleCloseTransactionAlert = this.handleCloseTransactionAlert.bind(this); 
    }

    submitImported(){
        var url = 'http://localhost:9000/distributed';
        var data = {
            //importInspect(ctx, role, boxId, importerId, loc, inspectionAgentId, originCountry, passInspection, timestamp)
            username: localStorage.userValue, 
            boxId: this.state.valueSelect,
            importerId: this.state.distriDistributorId,
            loc: this.state.distriLoc,
            inspectionAgentId: this.state.distriDestinationRetailerId,
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
                    distriDistributorId:"",
                    distriLoc:"",
                    distriDestinationRetailerId:"",
                    showAlertTransaction:true,
                });

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
                valueArray= valueArray.filter(r => r.Record[0].state === "Imported")
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
                        <Form.Label className="marginTop15">Distributor Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter Distributor Id" value={this.state.distriDistributorId} 
                            onChange={(e) =>
                                this.setState({ distriDistributorId: e.target.value })
                            }
                        />
                        <Form.Label className="marginTop15">Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter Location" value={this.state.distriLoc} 
                            onChange={(e) =>
                                this.setState({ distriLoc: e.target.value })
                            }
                        />
                        <Form.Label className="marginTop15">Destination Retailer Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter Destination Retailer Id" value={this.state.distriDestinationRetailerId} 
                            onChange={(e) =>
                                this.setState({ distriDestinationRetailerId: e.target.value })
                            }
                        />
                       
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.submitImported}>Submit</Button>
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

export default Distributed;
