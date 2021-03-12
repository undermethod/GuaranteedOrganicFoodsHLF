import React from 'react';
import { Button, Form, Container, Modal} from 'react-bootstrap';
import './css/base.css';

class Exported  extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            valueBoxes:[],
            valueSelect:"",
            valueSelecInspectiont:"",
            valueExporterId:"",
            exporterlocation: "",
            valueInspectionAgentId:"",
            valueDestinationCountry:"",
            showAlertTransaction:false,
        }
        this.submitExported = this.submitExported.bind(this);
        this.handleChangeSelectBox = this.handleChangeSelectBox.bind(this);
        this.handleChangeSelectInspection = this.handleChangeSelectInspection.bind(this);
        this.handleCloseTransactionAlert = this.handleCloseTransactionAlert.bind(this); 
    }

    submitExported(){
        var url = 'http://localhost:9000/export';
        var data = {
            //exportInspect(ctx, role, boxId, exporterId, loc, inspectionAgentId, destinationCountry, passInspection, timestamp)
            username: localStorage.userValue, 
            boxId: this.state.valueSelect,
            exporterId: this.state.valueExporterId,
            loc: this.state.exporterlocation,
            inspectionAgentId: this.state.valueInspectionAgentId,
            destinationCountry: this.state.valueDestinationCountry,
            passInspection: this.state.valueSelecInspectiont
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
                    valueSelecInspectiont:"",
                    valueExporterId: "",
                    exporterlocation:"",
                    valueInspectionAgentId:"",
                    valueDestinationCountry:"",
                    showAlertTransaction:true,
                })
        });
    }

    handleChangeSelectBox(event) {
        this.setState({ valueSelect: event.target.value });
    }
    
    handleChangeSelectInspection(event) {
        this.setState({ valueSelecInspectiont: event.target.value });
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
                valueArray= valueArray.filter(r => r.Record[0].state === "Packaged")
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
                        <Form.Label className="marginTop15">Exporter Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter Exporter Id" value={this.state.valueExporterId}
                            onChange={(e) =>
                                this.setState({ valueExporterId: e.target.value })
                            }
                        />
                        <Form.Label className="marginTop15">Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter Location" value={this.state.exporterlocation}
                            onChange={(e) =>
                                this.setState({ exporterlocation: e.target.value })
                            }
                        />
                        <Form.Label className="marginTop15">Inspection Agent Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter Inspection Agent Id" value={this.state.valueInspectionAgentId}
                            onChange={(e) =>
                                this.setState({ valueInspectionAgentId: e.target.value })
                            }
                        />
                        <Form.Label className="marginTop15">Destination Country</Form.Label>
                        <Form.Control type="text" placeholder="Enter Destination Country" value={this.state.valueDestinationCountry}
                            onChange={(e) =>
                                this.setState({ valueDestinationCountry: e.target.value })
                            }
                        />
                        <Form.Label className="marginTop15">Pass Inspection</Form.Label>
                        <Form.Control as="select" value={this.state.valueSelecInspectiont} onChange={this.handleChangeSelectInspection}>
                            <option value="">Select an option</option>
                            <option value="Yes" key='1'>Yes</option>
                            <option value="No" key='2'>No</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.submitExported}>Submit</Button>
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

export default Exported;