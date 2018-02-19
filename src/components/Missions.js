import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router-dom';
import { store } from '../redux/store';

import mainBg from '../../img/night.jpg';
import swipe from '../../img/swipe.png';

import { setupMainBg, setupHeader, setupBlankBlock, entry } from '../Anima';

import "../../css/missionStyle.css";
import "../../css/fonts.css";
import "bootstrap/dist/css/bootstrap.css";
import { FormControl, Button, Col, Table, Well, Modal, DropdownButton, MenuItem } from "react-bootstrap";

import Header from './Header/Header';
import Navigator from './Navigator/Navigator';
import Footer from './Footer/Footer';

const pageColor = 'rgb(31, 134, 255)';
const blankDescriptionTemplate = 'Click to view description';

const mockMissions = [{
	rank: 'S',
	price: '1000 $',
	stage: 'Done',
	description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like'
},
{
	rank: 'B',
	price: '100 yen',
	stage: 'In Progress',
	description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like'
},
{
	rank: 'D',
	price: '5 $',
	stage: 'Done',
	description: 'test'
}];

const mockSenseis = ['Yoda', 'Skywalker', 'Snoke', 'Shifu', 'Hiruzen'];
const mockPrices = [10, 100, 500, 1000, 5000, 10000];
const mockRanks = ['S', 'A', 'B', 'C', 'D'];

const mapStateToProps = state => {
    return { missions: state.currentUser.missions };
};

class MissionsView extends Component {
    
    _sensei = '';
    _rank = '';
    _price = 10;

    
    constructor (props) {
        super(props);
		
        this.state = {
            show: false,
            editing: false,
            description: 'Some description',
            clickedMission: 0
        };
		this.readMoreClick = this.readMoreClick.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.addNewMission = this.addNewMission.bind(this);
        this.onSenseiSelect = this.onSenseiSelect.bind(this);
        this.onPriceSelect = this.onPriceSelect.bind(this);
        this.onRankSelect = this.onRankSelect.bind(this);
        this.onDescptionInput = this.onDescptionInput.bind(this);
        this.editMission = this.editMission.bind(this);
        this.handleEditShow = this.handleEditShow.bind(this);
        this.deleteMission = this.deleteMission.bind(this);
    }
    
    componentDidMount () {
        entry();
    }
	
	readMoreClick (e) {
		const clickedNode = (e.target.children[0] || e.target);
		const currentText = clickedNode.textContent;
		
		if (currentText == blankDescriptionTemplate) {
			clickedNode.textContent = clickedNode.getAttribute('data-desc');
		} else {
			clickedNode.textContent = blankDescriptionTemplate;
		}
    }
    
    handleClose () {
        this.setState({ 
            show: false, 
            description: 'Some description',
            editing: false,
            clickedMission: 0
        });
        this._rank = '';
        this._price = 10;
        this._sensei = '';
    }

    handleShow () {
      this.setState({
          ...this.state,
          show: true
      });
    }

    handleEditShow (index) {
      this.setState({ 
          ...this.state,
          show: true,
          editing: true,
          clickedMission: index
      });
    }
    
    addNewMission (e) {
        const payload = {
            user: store.getState().currentUser,
            mission: {
                rank: this._rank,
                price: this._price,
                sensei: this._sensei,
                stage: 'In Progress',
                description: this.state.description
            }
        };
        const queryConfig = {
            method: 'POST', 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };
        
        fetch('/addMission', queryConfig)
            .then(response => (
                response.json()
            ))
            .then(data => {
                console.log(data);
            });
        this.handleClose();
    }
    
    onSenseiSelect (eventKey, e) {
        this._sensei = eventKey;
    }

    onPriceSelect (eventKey, e) {
        this._price = eventKey;
    }
    
    onRankSelect (eventKey, e) {
        this._rank = eventKey;
    }

    onDescptionInput (e) {
        this.setState({
            ...this.state,
            description: e.target.value
        });
    }

    deleteMission (index) {
        const payload = {
            user: store.getState().currentUser,
            deleteMissionIndx: index
        };
        const queryConfig = {
            method: 'POST', 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };
        
        fetch('/deleteMission', queryConfig)
            .then(response => (
                response.json()
            ))
            .then(data => {
                console.log(data);
            });
        this.handleClose();
    }

    editMission () {
        const payload = {
            user: store.getState().currentUser,
            oldMissionIndx: this.state.clickedMission,
            newMission: {
                rank: this._rank,
                price: this._price,
                sensei: this._sensei,
                stage: 'In Progress',
                description: this.state.description
            }
        };
        const queryConfig = {
            method: 'POST', 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };
        
        fetch('/updateMission', queryConfig)
            .then(response => (
                response.json()
            ))
            .then(data => {
                console.log(data);
            });
        this.handleClose();
    }
    
    render() {
		//this.props.missions USE THIS WHEN RESPONSE COMES
		const missions = mockMissions;
		const senseis = mockSenseis;
		const prices = mockPrices;
		const ranks = mockRanks;
		
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
                          <th className="th-mission-container"><div>Price $</div></th>
                          <th className="th-mission-container"><div>Stage</div></th>
                          <th className="th-mission-container"><div>Description</div></th>
                          <th className="th-mission-container"><div>Edit</div></th>
                          <th className="th-mission-container"><div>Delete</div></th>
                        </tr>
                      </thead>
                      <tbody>
                        {missions.map((mission, index) => (
                            <tr key={index}>
                              <td className="td-mission-container"><div>{mission.rank}</div></td>
                              <td className="td-mission-container"><div>{mission.price}</div></td>
                              <td className="td-mission-container"><div>{mission.stage}</div></td>
                              <td className="td-mission-container view-description" onClick={this.readMoreClick}>
                                  <div data-desc={mission.description}>
                                    {blankDescriptionTemplate}
                                  </div>
                              </td>
                              <td className="td-mission-container"><div><Button bsStyle="info" bsSize="large" onClick={() => {this.handleEditShow(index)}}>Edit</Button></div></td>
                              <td className="td-mission-container"><div><Button bsStyle="danger" bsSize="large" onClick={() => {this.deleteMission(index)}}>Delete</Button></div></td>
                            </tr>
                        ))}
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
								  <div><Button bsStyle="success" bsSize="large" onClick={this.handleShow}>Add new</Button></div>
							 </td>
						  </tr>
						</tbody>
                    </Table>
                     <Modal show={this.state.show} onHide={this.handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Mission</Modal.Title>
                      </Modal.Header>
                         <Modal.Body>
                            <p>
                              Fill the fields before adding
                            </p>
                            <DropdownButton title="Rank" bsStyle="default" id="1" bsSize="large">
                              {ranks.map((item, index) => (
                                    <MenuItem eventKey={item} key={index} onSelect={this.onRankSelect}>{item}</MenuItem>
                                ))}
                            </DropdownButton>
                            <DropdownButton title="Price" bsStyle="default" id="2" bsSize="large">
                              {prices.map((item, index) => (
                                    <MenuItem eventKey={item} key={index} onSelect={this.onPriceSelect}>{item}</MenuItem>
                                ))}
                            </DropdownButton>
                            <DropdownButton title="Sensei" bsStyle="default" id="2" bsSize="large">
                                {senseis.map((item, index) => (
                                    <MenuItem eventKey={item} key={index} onSelect={this.onSenseiSelect}>{item}</MenuItem>
                                ))}
                            </DropdownButton>
                            <FormControl
                                    bsSize="large" 
                                    type = "text"
                                    placeholder="Enter description"
                                    value = {this.state.description}
                                    onChange={this.onDescptionInput}>
                            </FormControl>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button bsStyle="success" onClick={this.state.editing ? this.editMission : this.addNewMission}>Done</Button>
                          </Modal.Footer>
                    </Modal>
                </div>
                <Footer />
            </div>
        ) 
    }
}

const Missions = connect(mapStateToProps)(MissionsView);
export default Missions;