import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router-dom';

import mainBg from '../../img/night.jpg';
import swipe from '../../img/swipe.png';

import { setupMainBg, setupHeader, setupBlankBlock, entry } from '../Anima';

import "../../css/missionStyle.css";
import "../../css/fonts.css";
import "bootstrap/dist/css/bootstrap.css";
import { FormControl, Button, Col, Table, Well } from "react-bootstrap";

import Header from './Header/Header';
import Navigator from './Navigator/Navigator';
import Footer from './Footer/Footer';

const pageColor = 'rgb(31, 134, 255)';
const blankDescriptionTemplate = 'Click to view description';
const description = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like';

const mockMissions = [{
	rank: 'S',
	cost: '1000 $',
	stage: 'Verified',
	description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like'
},
{
	rank: 'B',
	cost: '100 yen',
	stage: 'In Progress',
	description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like'
},
{
	rank: 'D',
	cost: '5 $',
	stage: 'Done',
	description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like'
}];

const mapStateToProps = state => {
    return { missions: state.currentUser.missions };
};

class MissionsView extends Component {
    
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
		//this.props.missions USE THIS WHEN RESPONSE COMES
		const missions = mockMissions;
		
        return (
            <div className="main-bg-wrapper" style={ setupMainBg(mainBg) }>
                <Navigator className="night"/>
                <Header style={ setupHeader(pageColor) }/>
                <div className="workfield" style={ setupBlankBlock() }>
                    <Table className="table-mission-container" responsive>
                      <thead>
						<tr>
                          <th className="th-mission-container table-titile" colSpan="6"><div>Missions</div></th>
                        </tr>
                        <tr>
                          <th className="th-mission-container"><div>Rank</div></th>
                          <th className="th-mission-container"><div>Cost</div></th>
                          <th className="th-mission-container"><div>Stage</div></th>
                          <th className="th-mission-container"><div>Description</div></th>
                          <th className="th-mission-container"><div>Edit</div></th>
                          <th className="th-mission-container"><div>Delete</div></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="td-mission-container"><div>S</div></td>
                          <td className="td-mission-container"><div>1000 $</div></td>
                          <td className="td-mission-container"><div>Verified</div></td>
                          <td className="td-mission-container view-description" onClick={this.readMoreClick}>
							  <div>
							  	{blankDescriptionTemplate}
							  </div>
						  </td>
                          <td className="td-mission-container"><div><Button bsStyle="info" bsSize="large">Edit</Button></div></td>
                          <td className="td-mission-container"><div><Button bsStyle="danger" bsSize="large">Delete</Button></div></td>
                        </tr>
                        <tr>
                          <td className="td-mission-container"><div>B</div></td>
                          <td className="td-mission-container"><div>100 yen</div></td>
                          <td className="td-mission-container"><div>In Progress</div></td>
                          <td className="td-mission-container view-description" onClick={this.readMoreClick}>
							  <div>
							  	{blankDescriptionTemplate}
							  </div>
						  </td>
                          <td className="td-mission-container"><div><Button bsStyle="info" bsSize="large">Edit</Button></div></td>
                          <td className="td-mission-container"><div><Button bsStyle="danger" bsSize="large">Delete</Button></div></td>
                        </tr>
                        <tr>
                          <td className="td-mission-container"><div>D</div></td>
                          <td className="td-mission-container"><div>5 $</div></td>
                          <td className="td-mission-container" ><div>Done</div></td>
                          <td className="td-mission-container view-description" onClick={this.readMoreClick}>
							  <div>
							  	{blankDescriptionTemplate}
							  </div>
						  </td>
                          <td className="td-mission-container"><div><Button bsStyle="info" bsSize="large">Edit</Button></div></td>
                          <td className="td-mission-container"><div><Button bsStyle="danger" bsSize="large">Delete</Button></div></td>
                        </tr>
                      </tbody>
					  <thead>
                        <tr>
                          <th className="th-mission-container"><div>Exel</div></th>
                          <th className="th-mission-container"><div>PDF</div></th>
                          <th className="th-mission-container"><div>CSV</div></th>
                          <th className="th-mission-container" colSpan="3"><div>Add new mission</div></th>
                        </tr>
                      </thead>
						<tbody>
						   <tr>
							  <td className="td-mission-container" ><div><Button bsStyle="success" bsSize="large">Exel</Button></div></td>
							  <td className="td-mission-container"><div><Button bsStyle="danger" bsSize="large">PDF</Button></div></td>
							  <td className="td-mission-container" ><div><Button bsStyle="warning" bsSize="large">CSV</Button></div></td>
							  <td className="td-mission-container" colSpan="3">
								  <div><Button bsStyle="success" bsSize="large">Add new</Button></div>
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

const Missions = connect(mapStateToProps)(MissionsView);
export default Missions;