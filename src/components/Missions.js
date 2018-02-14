import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';

import mainBg from '../../img/night.jpg';
import swipe from '../../img/swipe.png';

import { setupMainBg, setupHeader, setupBlankBlock, entry } from '../Anima';

import "../../css/missionStyle.css";
import "../../css/fonts.css";
import "bootstrap/dist/css/bootstrap.css";
import { FormControl, Button, Col, Table, Well } from "react-bootstrap";
import Panel from "react-bootstrap";

import Header from './Header/Header';
import Navigator from './Navigator/Navigator';
import Footer from './Footer/Footer';

const pageColor = 'rgb(31, 134, 255)';

export default class Missions extends Component {
    
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        entry();
    }
    
    render() {
        return (
            <div className="main-bg-wrapper" style={ setupMainBg(mainBg) }>
                <Navigator className="night"/>
                <Header style={ setupHeader(pageColor) }/>
                <div className="workfield" style={ setupBlankBlock() }>
                    
                    <Table className="table-mission-container" responsive>
                      <thead>
                        <tr>
                          <th className="th-mission-container"><div>Table heading</div></th>
                          <th className="th-mission-container"><div>Table heading</div></th>
                          <th className="th-mission-container"><div>Table heading</div></th>
                          <th className="th-mission-container"><div>Table heading</div></th>
                          <th className="th-mission-container"><div>Table heading</div></th>
                          <th className="th-mission-container"><div>Table heading</div></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="td-mission-container">Table cell</td>
                          <td className="td-mission-container">Table cell</td>
                          <td className="td-mission-container">Table cell</td>
                          <td className="td-mission-container">Table cell</td>
                          <td className="td-mission-container"><div><Button bsStyle="info" bsSize="large">Register</Button></div></td>
                          <td className="td-mission-container"><div><Button bsStyle="danger" bsSize="large">Delete</Button></div></td>
                        </tr>
                        <tr>
                          <td className="td-mission-container">Table cell</td>
                          <td className="td-mission-container">Table cell</td>
                          <td className="td-mission-container">Table cell</td>
                          <td className="td-mission-container">t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like</td>
                          <td className="td-mission-container"><div><Button bsStyle="info" bsSize="large">Register</Button></div></td>
                          <td className="td-mission-container"><div><Button bsStyle="danger" bsSize="large">Delete</Button></div></td>
                        </tr>
                        <tr>
                          <td className="td-mission-container">Table cell</td>
                          <td className="td-mission-container">Table cell</td>
                          <td className="td-mission-container">Table cell</td>
                          <td className="td-mission-container">Table cell</td>
                          <td className="td-mission-container"><div><Button bsStyle="info" bsSize="large">Register</Button></div></td>
                          <td className="td-mission-container"><div><Button bsStyle="danger" bsSize="large">Delete</Button></div></td>
                        </tr>
                      </tbody>
                    </Table>
                </div>
                <Footer />
            </div>
        ) 
    }
}