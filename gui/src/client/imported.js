import React from 'react';
import { Button, Form, Container, Modal} from 'react-bootstrap';
import './css/base.css';

class Imported  extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            valueBoxes:[],
            valueSelect:"",
            importImporterId:"",
            importLoc:"",
            importInspectionAgentId:"",
            importOriginCountry:"",
            importpassInspection:"",
        }
        this.submitImported = this.submitImported.bind(this);
        this.handleChangeSelectBox = this.handleChangeSelectBox.bind(this);
        this.handleChangeSelectInspection = this.handleChangeSelectInspection.bind(this);
        this.handleCloseTransactionAlert = this.handleCloseTransactionAlert.bind(this); 
    }

    submitImported(){
        var url = 'http://localhost:9000/imported';
        var data = {
            //importInspect(ctx, role, boxId, importerId, loc, inspectionAgentId, originCountry, passInspection, timestamp)
            username: localStorage.userValue, 
            boxId: this.state.valueSelect,
            importerId: this.state.importImporterId,
            loc: this.state.importLoc,
            inspectionAgentId: this.state.importInspectionAgentId,
            originCountry: this.state.importOriginCountry,
            passInspection: this.state.importpassInspection,
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
                    importImporterId:"",
                    importLoc:"",
                    importInspectionAgentId:"",
                    importOriginCountry:"",
                    importpassInspection:"",
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
                valueArray= valueArray.filter(r => r.Record[0].state === "Shipped")
                this.setState({ valueBoxes: valueArray });
        });
    }

    handleChangeSelectInspection(event) {
        this.setState({ importpassInspection: event.target.value });
    }

    render() { 
        return ( 
            <Container>
                <Form className="marginTop15">
                    <h3>IMPORTED</h3>
                    <Form.Group>
                        <Form.Label className="marginTop15">Select Box</Form.Label>
                        <Form.Control as="select" value={this.state.valueSelect} onChange={this.handleChangeSelectBox}>
                            <option value="">Select an option</option>
                            {this.state.valueBoxes.map((box) => {
                                    return <option value={box.Record[0].boxId} key={box.Record[0].boxId}>{box.Record[0].boxId}</option>
                                }
                            )}
                        </Form.Control>
                        <Form.Label className="marginTop15">Importer Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter Importer Id" value={this.state.importImporterId} 
                            onChange={(e) =>
                                this.setState({ importImporterId: e.target.value })
                            }
                        />
                        <Form.Label className="marginTop15">Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter Location" value={this.state.importLoc} 
                            onChange={(e) =>
                                this.setState({ importLoc: e.target.value })
                            }
                        />
                        <Form.Label className="marginTop15">Inspection Agent Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter Inspection Agent Id" value={this.state.importInspectionAgentId} 
                            onChange={(e) =>
                                this.setState({ importInspectionAgentId: e.target.value })
                            }
                        />
                        <Form.Label className="marginTop15">Origin Country</Form.Label>
                        <Form.Control type="text" placeholder="Enter Origin Country" value={this.state.importOriginCountry} 
                            onChange={(e) =>
                                this.setState({ importOriginCountry: e.target.value })
                            }
                        />
                        <Form.Label className="marginTop15">Pass Inspection</Form.Label>
                        <Form.Control as="select" value={this.state.importpassInspection} onChange={this.handleChangeSelectInspection}>
                            <option value="">Select an option</option>
                            <option value="Yes" key='1'>Yes</option>
                            <option value="No" key='2'>No</option>
                        </Form.Control>
                       
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

export default Imported;