import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';

import mainBg from '../../img/twilights.jpg';

import { 
    setupMainBg, 
    setupHeader, 
    setupBlankBlock, 
    entry 
} from '../Anima';

import "../../css/shinobiStyle.css";
import "../../css/fonts.css";
import "bootstrap/dist/css/bootstrap.css";
import { 
    FormControl, 
    Button,
    Col,
    Table,
    Well, 
    Modal,
    DropdownButton,
    MenuItem 
} from "react-bootstrap";

import Header from './Header/Header';
import Navigator from './Navigator/Navigator';
import Footer from './Footer/Footer';

const pageColor = 'rgb(255, 143, 31)';
const blankDescriptionTemplate = 'Click to view description';
const description = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like';

const mockMissions = [{
    id: 1,
	rank: 'S',
	price: '1000 $',
	sensei: 'Yoda',
	description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like'
},
{
    id: 2,
	rank: 'B',
	price: '100 yen',
	sensei: 'Skywalker',
	description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like'
},
{
    id: 3,
	rank: 'D',
	price: '5 $',
	sensei: 'Shifu',
	description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like'
}];

export default class Shinobies extends Component {
	
    constructor(props) {
        super(props);
        
        this.readMoreClick = this.readMoreClick.bind(this);
    }
    
    componentDidMount() {
        entry();
    }
    
    readMoreClick(e) {
		const clickedNode = (e.target.children[0] || e.target);
		const currentText = clickedNode.textContent;
		
		if (currentText == blankDescriptionTemplate) {
			clickedNode.textContent = description;
		} else {
			clickedNode.textContent = blankDescriptionTemplate;
		}
    }
    
    render() {
        const missions = mockMissions;
        return (
            <div className="main-bg-wrapper" style={ setupMainBg(mainBg) }>
                <Navigator className="twilight"/>
                <Header style={ setupHeader(pageColor) }/>
                <div className="workfield" style={setupBlankBlock()}>
                    <Table className="table-shinobi-container" responsive>
                      <thead>
						<tr>
                          <th className="th-shinobi-container table-titile" colSpan="6">
                              <div>Test</div>
                          </th>
                        </tr>
                        <tr>
                          <th className="th-shinobi-container">
                              <div>
                                Rank
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                Price $
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                Sensei
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                Description
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                Edit
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                Delete
                              </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {missions.map((mission, index) => (
                            <tr key={index}>
                              <td className="td-shinobi-container">
                                  <div>
                                    {mission.rank}
                                  </div>
                              </td>
                              <td className="td-shinobi-container">
                                  <div>
                                    {mission.price}
                                  </div>
                              </td>
                              <td className="td-shinobi-container">
                                  <div>
                                    {mission.sensei}
                                  </div>
                              </td>
                              <td className="td-shinobi-container view-description" onClick={this.readMoreClick}>
                                  <div data-desc={mission.description}>
                                    {blankDescriptionTemplate}
                                  </div>
                              </td>
                              <td className="td-shinobi-container">
                                  <div>
                                      <Button 
                                          bsStyle="info" 
                                          bsSize="large" 
                                          onClick={() => {this.handleEditShow(mission)}}>
                                            Edit
                                      </Button>
                                  </div>
                              </td>
                              <td className="td-shinobi-container">
                                  <div>
                                      <Button 
                                          bsStyle="danger" 
                                          bsSize="large" 
                                          onClick={() => {this.deleteMission( mission)}}>
                                            Delete
                                      </Button>
                                  </div>
                                </td>
                            </tr>
                        ))}
                      </tbody>
					  <thead>
                        <tr>
                          <th className="th-shinobi-container">
                              <div>
                                Exel
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                PDF
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                CSV
                              </div>
                          </th>
                          <th className="th-shinobi-container" colSpan="3">
                              <div>
                                Add new mission
                              </div>
                          </th>
                        </tr>
                      </thead>
						<tbody>
						   <tr>
							  <td className="td-shinobi-container" >
                                  <div>
                                      <Button 
                                              bsStyle="success" 
                                              bsSize="large"       
                                              disabled={!this.props.missions} 
                                              onClick={this.generateMissionsExel}>
                                          Exel
                                      </Button>
                                  </div>
                              </td>
							  <td className="td-shinobi-container">
                                  <div>
                                    <Button 
                                          bsStyle="danger" 
                                          bsSize="large" 
                                          disabled={!this.props.missions} 
                                          onClick={this.generateMissionsPdf}>
                                        PDF
                                    </Button>
                                  </div>
                              </td>
							  <td className="td-shinobi-container" >
                                  <div>
                                    <Button 
                                          bsStyle="warning" 
                                          bsSize="large" 
                                          disabled={!this.props.missions} 
                                          onClick={this.generateMissionsCsv}>
                                        CSV
                                    </Button>
                                  </div>
                              </td>
							  <td className="td-shinobi-container" colSpan="3">
								  <div>
                                    <Button 
                                          bsStyle="success" 
                                          bsSize="large" 
                                          onClick={this.handleShow} 
                                          disabled={!this.props.missions}>
                                        Add new
                                    </Button>
                                 </div>
							 </td>
						  </tr>
						</tbody>
                    </Table>
                     
                </div>
                <Footer />
            </div>
        ) 
    }
}

/*<div className="workfield" style={ setupBlankBlock() }>
                    <Table className="table-shinobi-container" responsive>
                      <thead>
						<tr>
                          <th className="th-mission-container table-titile" colSpan="6"><div>Shinobies</div></th>
                        </tr>
                        <tr>
                          <th className="th-shinobi-container"><div className="centrify-title">Table heading</div></th>
                          <th className="th-shinobi-container"><div className="centrify-title">Table heading</div></th>
                          <th className="th-shinobi-container"><div className="centrify-title">Table heading</div></th>
                          <th className="th-shinobi-container"><div className="centrify-title">Table heading</div></th>
                          <th className="th-shinobi-container"><div className="centrify-title">Table heading</div></th>
                          <th className="th-shinobi-container"><div className="centrify-title">Table heading</div></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="td-shinobi-container"><div>Table cell</div></td>
                          <td className="td-shinobi-container"><div>Table cell</div></td>
                          <td className="td-shinobi-container"><div>Table cell</div></td>
                          <td className="td-shinobi-container view-description" onClick={this.readMoreClick}>
							  <div>
							  	{blankDescriptionTemplate}
							  </div>
						  </td>
                          <td className="td-shinobi-container"><div><Button bsStyle="warning" bsSize="large">Register</Button></div></td>
                          <td className="td-shinobi-container"><div><Button bsStyle="danger" bsSize="large">Delete</Button></div></td>
                        </tr>
                        <tr>
                          <td className="td-shinobi-container"><div>Table cell</div></td>
                          <td className="td-shinobi-container"><div>Table cell</div></td>
                          <td className="td-shinobi-container"><div>Table cell</div></td>
                          <td className="td-shinobi-container view-description" onClick={this.readMoreClick}>
							  <div>
							  	{blankDescriptionTemplate}
							  </div>
						  </td>
                          <td className="td-shinobi-container"><div><Button bsStyle="warning" bsSize="large">Register</Button></div></td>
                          <td className="td-shinobi-container"><div><Button bsStyle="danger" bsSize="large">Delete</Button></div></td>
                        </tr>
                        <tr>
                          <td className="td-shinobi-container"><div>Table cell</div></td>
                          <td className="td-shinobi-container"><div>Table cell</div></td>
                          <td className="td-shinobi-container"><div>Table cell</div></td>
                          <td className="td-shinobi-container view-description" onClick={this.readMoreClick}>
							  <div>
							  	{blankDescriptionTemplate}
							  </div>
						  </td>
                          <td className="td-shinobi-container"><div><Button bsStyle="warning" bsSize="large">Register</Button></div></td>
                          <td className="td-shinobi-container"><div><Button bsStyle="danger" bsSize="large">Delete</Button></div></td>
                        </tr>
                      </tbody>
                    </Table>
                </div>*/
