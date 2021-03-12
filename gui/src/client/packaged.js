import React from 'react';
import { Button, Form, Container} from 'react-bootstrap';
import './css/base.css';
class Packaged  extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            pcklocation: "",
            pckpackerid:"",
            valueBoxes:[],
            valueSelect:""
        }
        this.submitPackaged = this.submitPackaged.bind(this);
        this.handleChangeSelectBox = this.handleChangeSelectBox.bind(this);
    }

    submitPackaged(){
        var url = 'http://localhost:9000/packaged';
        var data = {
            //ctx, role, boxId, loc, packagerId, timestamp
            username: localStorage.userValue, 
            boxId: this.state.valueSelect,
            location: this.state.pcklocation,
            packagerId: this.state.pckpackerid
        };
        console.log('Value log', this.state.valueSelect)

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
                valueArray= valueArray.filter(r => r.Record[0].state === "Harvest")
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
                        <Form.Label className="marginTop15">Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter location" 
                            onChange={(e) =>
                                this.setState({ pcklocation: e.target.value })
                            }
                        />
                        <Form.Label className="marginTop15">Packager ID</Form.Label>
                        <Form.Control type="text" placeholder="Enter packager id" 
                            onChange={(e) =>
                                this.setState({ pckpackerid: e.target.value })
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