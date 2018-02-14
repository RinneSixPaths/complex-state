import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';

import mainBg from '../../img/twilights.jpg';

import { setupMainBg, setupHeader, setupBlankBlock, entry } from '../Anima';

import "../../css/shinobiStyle.css";
import "../../css/fonts.css";
import "bootstrap/dist/css/bootstrap.css";
import { FormControl, Button, Col, Table } from "react-bootstrap";

import Header from './Header/Header';
import Navigator from './Navigator/Navigator';
import Footer from './Footer/Footer';

const pageColor = 'rgb(255, 143, 31)';
const description = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like';

export default class Shinobies extends Component {
    
    constructor(props) {
        super(props);
        
        this.readMoreClick = this.readMoreClick.bind(this);
    }
    
    componentDidMount() {
        entry();
    }
    
    readMoreClick(e) {
        e.target.innerHTML = description;
    }
    
    render() {
        return (
            <div className="main-bg-wrapper" style={ setupMainBg(mainBg) }>
                <Navigator className="twilight"/>
                <Header style={ setupHeader(pageColor) }/>
                <div className="workfield" style={ setupBlankBlock() }>
                    <Table className="table-shinobi-container" responsive>
                      <thead>
                        <tr>
                          <th className="th-shinobi-container"><div>Table heading</div></th>
                          <th className="th-shinobi-container"><div>Table heading</div></th>
                          <th className="th-shinobi-container"><div>Table heading</div></th>
                          <th className="th-shinobi-container"><div>Table heading</div></th>
                          <th className="th-shinobi-container"><div>Table heading</div></th>
                          <th className="th-shinobi-container"><div>Table heading</div></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="td-shinobi-container"><div>Table cell</div></td>
                          <td className="td-shinobi-container"><div>Table cell</div></td>
                          <td className="td-shinobi-container"><div>Table cell</div></td>
                          <td className="td-shinobi-container" onClick={this.readMoreClick}><div>click me</div></td>
                          <td className="td-shinobi-container"><div><Button bsStyle="warning" bsSize="large">Register</Button></div></td>
                          <td className="td-shinobi-container"><div><Button bsStyle="danger" bsSize="large">Delete</Button></div></td>
                        </tr>
                        <tr>
                          <td className="td-shinobi-container"><div>Table cell</div></td>
                          <td className="td-shinobi-container"><div>Table cell</div></td>
                          <td className="td-shinobi-container"><div>Table cell</div></td>
                          <td className="td-shinobi-container"><div>Table cell</div></td>
                          <td className="td-shinobi-container"><div><Button bsStyle="warning" bsSize="large">Register</Button></div></td>
                          <td className="td-shinobi-container"><div><Button bsStyle="danger" bsSize="large">Delete</Button></div></td>
                        </tr>
                        <tr>
                          <td className="td-shinobi-container"><div>Table cell</div></td>
                          <td className="td-shinobi-container"><div>Table cell</div></td>
                          <td className="td-shinobi-container"><div>Table cell</div></td>
                          <td className="td-shinobi-container"><div>Table cell</div></td>
                          <td className="td-shinobi-container"><div><Button bsStyle="warning" bsSize="large">Register</Button></div></td>
                          <td className="td-shinobi-container"><div><Button bsStyle="danger" bsSize="large">Delete</Button></div></td>
                        </tr>
                      </tbody>
                    </Table>
                </div>
                <Footer />
            </div>
        ) 
    }
}
