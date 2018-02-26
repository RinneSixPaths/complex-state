import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router-dom';

import mainBg from '../../img/twilights.jpg';

import { 
    setupMainBg, 
    setupHeader, 
    setupBlankBlock, 
    entry 
} from '../Anima';

import "../../css/profileStyle.css";
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
const blankSkillsTemplate = 'Click to view skills';
//Min width table
/*тудент: имя, имя сенсея, возраст 
профиль: имя сенсея, инт еллект, сила, ранг, возраст, скиллы 
сенсей: имя, опыт (время), звание*/
/*const sensei = {
	name: 'Yoda',
	experience: 65,
	profile: profile(
		name, 
		'1292', 
		'Very high',
		'Master',
		'Flight'
	)
}

const profile = (
	name, 
	iq,
	power, 
	rank,
	skills
) => ({
	id: 1,
	senseiName: name,
	iq: iq,
	power: power,
	rank: rank,
	skills: skills
});

const student = {
	name: 'Neji',
	age: 26,
	senseiName: 'Yoda'
}*/

const mockProfiles = [{
    senseiName: 'Shifu',
	iq: 124,
	power: 'Very high',
	rank: 'Master',
	skills: 'Can spin chopsticks while eating'
},
{
    senseiName: 'Yoda',
	iq: 12421,
	power: 'Very high',
	rank: 'lol Dead',
	skills: 'Master of stealing sandwiches'
},
{
    senseiName: 'Skywalker',
	iq: 14,
	power: 'Very high',
	rank: 'Legend',
	skills: '"Ben Swolo NAAAAAH!!1" screamer'
}];

const mapStateToProps = state => {
    return { 
        user: state.currentUser,
        profiles: state.profiles
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: userData => dispatch(setCurrentUser(userData)) //TODO
    };
};

class ProfileView extends Component {
	
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
		
		if (currentText == blankSkillsTemplate) {
			clickedNode.textContent = clickedNode.getAttribute('data-desc');
		} else {
			clickedNode.textContent = blankSkillsTemplate;
		}
    }
    
    render() {
        const profiles = this.props.profiles;
        return (
            <div className="main-bg-wrapper" style={ setupMainBg(mainBg) }>
                <Navigator className="twilight"/>
                <Header style={ setupHeader(pageColor) }/>
                <div className="workfield" style={setupBlankBlock()}>
                    <Table className="table-profile-container" responsive>
                      <thead>
						<tr>
                          <th className="th-profile-container table-titile" colSpan="6">
                              <div>Profiles</div>
                          </th>
                        </tr>
                        <tr>
                          <th className="th-profile-container">
                              <div>
                                Sensei's Name
                              </div>
                          </th>
                          <th className="th-profile-container">
                              <div>
                                IQ
                              </div>
                          </th>
                          <th className="th-profile-container">
                              <div>
                                Power
                              </div>
                          </th>
                          <th className="th-profile-container">
                              <div>
                                Skills
                              </div>
                          </th>
                          <th className="th-profile-container">
                              <div>
                                Rank
                              </div>
                          </th>
                          <th className="th-profile-container">
                              <div>
                                Edit
                              </div>
                          </th>
                          <th className="th-profile-container">
                              <div>
                                Delete
                              </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {profiles.map((profile, index) => (
                            <tr key={index}>
                              <td className="td-profile-container">
                                  <div>
                                    {profile.senseiName}
                                  </div>
                              </td>
                              <td className="td-profile-container">
                                  <div>
                                    {profile.iq}
                                  </div>
                              </td>
                              <td className="td-profile-container">
                                  <div>
                                    {profile.power}
                                  </div>
                              </td>
                              <td className="td-profile-container view-description" onClick={this.readMoreClick}>
                                  <div data-desc={profile.skills}>
                                    {blankSkillsTemplate}
                                  </div>
                              </td>
                              <td className="td-profile-container">
                                  <div>
                                    {profile.rank}
                                  </div>
                              </td>
                              <td className="td-profile-container">
                                  <div>
                                      <Button 
                                          bsStyle="info" 
                                          bsSize="large"
                                          disabled={!this.props.user.isAdmin}
                                          onClick={() => {this.handleEditShow(mission)}}>
                                            Edit
                                      </Button>
                                  </div>
                              </td>
                              <td className="td-profile-container">
                                  <div>
                                      <Button 
                                          bsStyle="danger" 
                                          bsSize="large" 
                                          disabled={!this.props.user.isAdmin}
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
                          <th className="th-profile-container">
                              <div>
                                Excel
                              </div>
                          </th>
                          <th className="th-profile-container">
                              <div>
                                PDF
                              </div>
                          </th>
                          <th className="th-profile-container">
                              <div>
                                CSV
                              </div>
                          </th>
                          <th className="th-profile-container" colSpan="4">
                              <div>
                                Add new profile
                              </div>
                          </th>
                        </tr>
                      </thead>
						<tbody>
						   <tr>
							  <td className="td-profile-container" >
                                  <div>
                                      <Button 
                                              bsStyle="success" 
                                              bsSize="large"       
                                              disabled={!this.props.profiles} 
                                              onClick={this.generateMissionsExcel}>
                                          Excel
                                      </Button>
                                  </div>
                              </td>
							  <td className="td-profile-container">
                                  <div>
                                    <Button 
                                          bsStyle="danger" 
                                          bsSize="large" 
                                          disabled={!this.props.profiles} 
                                          onClick={this.generateMissionsPdf}>
                                        PDF
                                    </Button>
                                  </div>
                              </td>
							  <td className="td-profile-container" >
                                  <div>
                                    <Button 
                                          bsStyle="warning" 
                                          bsSize="large" 
                                          disabled={!this.props.profiles} 
                                          onClick={this.generateMissionsCsv}>
                                        CSV
                                    </Button>
                                  </div>
                              </td>
							  <td className="td-profile-container td-add-container" colSpan="4">
								  <div>
                                    <Button 
                                          bsStyle="success" 
                                          bsSize="large" 
                                          disabled={!this.props.user.isAdmin}
                                          onClick={this.handleShow}>
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

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileView);
export default Profile;
