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
        if(key === 'linkHarvest' && localStorage.userValue === 'producer'){
          this.setState({panel: <Harvest/>})
        }
        if(key === 'linkPackaged' && localStorage.userValue === 'packager'){
          this.setState({panel: <Packaged/>})
        }
        if(key === 'linkExported' && localStorage.userValue === 'exporter'){
          this.setState({panel: <Exported/>})
        }
        if(key === 'linkShipped' && localStorage.userValue === 'shipper'){
            this.setState({panel: <Shipped/>})
        }
        if(key === 'linkImported' && localStorage.userValue === 'importer'){
        this.setState({panel: <Imported/>})
        }
        if(key === 'linkDistributed' && localStorage.userValue === 'distributor'){
        this.setState({panel: <Distributed/>})
        }
        if(key === 'linksignout'){
            if(this.props.onlogout){
                delete localStorage.userValue
                this.props.onlogout()   
            }
        }
    }

    render() { 
        return ( 
            <Container>
                <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <a className="navLink" href='#' onClick={this.clickmenu.bind(this, "linkHarvest")}>Harvest</a>
                    <a className="navLink" href='#' onClick={this.clickmenu.bind(this, "linkPackaged")}>Packaged</a>
                    <a className="navLink" href='#' onClick={this.clickmenu.bind(this, "linkExported")}>Exported</a>
                    <a className="navLink" href='#' onClick={this.clickmenu.bind(this, "linkShipped")}>Shipped</a>
                    <a className="navLink" href='#' onClick={this.clickmenu.bind(this, "linkImported")}>Imported</a>
                    <a className="navLink" href='#' onClick={this.clickmenu.bind(this, "linkDistributed")}>Distributed</a>
                    <a className="navLink" href='#' onClick={this.clickmenu.bind(this, "linksignout")}>Sing Out</a>
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