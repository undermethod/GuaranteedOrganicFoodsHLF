import React from 'react';
import { Container,Navbar, Nav} from 'react-bootstrap';
import './css/base.css';
import Harvest from "./harvest"
import Packaged from "./packaged"
import Exported from "./exported"
import Shipped from "./shipped"
import Imported from "./imported"
import Distributed from "./distributed"


class Services  extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            profile: "",
            panel: ""
        }
        this.clickmenu = this.clickmenu.bind(this);
    }

    clickmenu(key){
        if(key === 'linkHarvest'){
          this.setState({panel: <Harvest/>})
        }
        if(key === 'linkPackaged'){
          this.setState({panel: <Packaged/>})
        }
        if(key === 'linkExported'){
          this.setState({panel: <Exported/>})
        }
        if(key === 'linkShipped'){
            this.setState({panel: <Shipped/>})
        }
        if(key === 'linkImported'){
        this.setState({panel: <Imported/>})
        }
        if(key === 'linkDistributed'){
        this.setState({panel: <Distributed/>})
        }
    }

    validateUser(event){
        event.preventDefault();
        if(this.state.valueuser !== ''){
            var url = 'http://localhost:9000/harvest';
            var data = {username: this.state.valueuser};

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
                <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <a className="navLink" onClick={this.clickmenu.bind(this, "linkHarvest")}>Harvest</a>
                    <a className="navLink"onClick={this.clickmenu.bind(this, "linkPackaged")}>Packaged</a>
                    <a className="navLink"onClick={this.clickmenu.bind(this, "linkExported")}>Exported</a>
                    <a className="navLink"onClick={this.clickmenu.bind(this, "linkShipped")}>Shipped</a>
                    <a className="navLink"onClick={this.clickmenu.bind(this, "linkImported")}>Imported</a>
                    <a className="navLink"onClick={this.clickmenu.bind(this, "linkDistributed")}>Distributed</a>
                </Nav>
                </Navbar>
                <div>
                    {this.state.panel}
                </div>
          </Container>
        );
    }    
}
export default Services;