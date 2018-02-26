import React, { Component } from 'react';
import { connect } from 'react-redux';

import mainBg from '../../img/shinobies.jpg';

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

const pageColor = 'rgb(145, 183, 199)';

const mapStateToProps = state => {
    return { 
        user: state.currentUser,
        senseis: state.senseis,
        students: state.students
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: userData => dispatch(setCurrentUser(userData)) //TODO
    };
};

class ShinobiesView extends Component {
	
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        entry();
    }
    
    render() {
        const shinobies = this.props.senseis;
        const students = this.props.students;
        return (
            <div className="main-bg-wrapper" style={ setupMainBg(mainBg) }>
                <Navigator className="breed"/>
                <Header style={ setupHeader(pageColor) }/>
                <div className="workfield" style={setupBlankBlock()}>
                    <Table className="table-shinobi-container" responsive>
                      <thead>
						<tr>
                          <th className="th-shinobi-container table-titile" colSpan="6">
                              <div>Students</div>
                          </th>
                        </tr>
                        <tr>
                          <th className="th-shinobi-container">
                              <div>
                                Name
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                Age
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                Sensei's Name
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
                        {students.map((student, index) => (
                            <tr key={index}>
                              <td className="td-shinobi-container">
                                  <div>
                                    {student.name}
                                  </div>
                              </td>
                              <td className="td-shinobi-container">
                                  <div>
                                    {student.age}
                                  </div>
                              </td>
                              <td className="td-shinobi-container">
                                  <div>
                                    {student.senseiName}
                                  </div>
                              </td>
                              <td className="td-shinobi-container">
                                  <div>
                                      <Button 
                                          bsStyle="info" 
                                          bsSize="large"
                                          disabled={!this.props.user.isAdmin}
                                          onClick={() => {this.handleEditShow(shinobi)}}>
                                            Edit
                                      </Button>
                                  </div>
                              </td>
                              <td className="td-shinobi-container">
                                  <div>
                                      <Button 
                                          bsStyle="danger" 
                                          bsSize="large"
                                          disabled={!this.props.user.isAdmin}
                                          onClick={() => {this.deleteMission(shinobi)}}>
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
                                Excel
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
                                Add new student
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
                                              disabled={!this.props.senseis}
                                              onClick={this.generateMissionsExcel}>
                                          Excel
                                      </Button>
                                  </div>
                              </td>
							  <td className="td-shinobi-container">
                                  <div>
                                    <Button 
                                          bsStyle="danger" 
                                          bsSize="large" 
                                          disabled={!this.props.senseis}
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
                                          disabled={!this.props.senseis}
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
                                          disabled={!this.props.user.isAdmin}
                                          onClick={this.handleShow}>
                                        Add new
                                    </Button>
                                 </div>
							 </td>
						  </tr>
						</tbody>
                    </Table>
                     
                                        
                    <Table className="table-shinobi-container" responsive>
                      <thead>
						<tr>
                          <th className="th-shinobi-container table-titile" colSpan="6">
                              <div>Senseis</div>
                          </th>
                        </tr>
                        <tr>
                          <th className="th-shinobi-container">
                              <div>
                                Name
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                Missions completed
                              </div>
                          </th>
                          <th className="th-shinobi-container">
                              <div>
                                Students
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
                        {shinobies.map((shinobi, index) => (
                            <tr key={index}>
                              <td className="td-shinobi-container">
                                  <div>
                                    {shinobi.name}
                                  </div>
                              </td>
                              <td className="td-shinobi-container">
                                  <div>
                                    {shinobi.missionsCompleted}
                                  </div>
                              </td>
                              <td className="td-shinobi-container">
                                  <div>
                                    {shinobi.student}
                                  </div>
                              </td>
                              <td className="td-shinobi-container">
                                  <div>
                                      <Button 
                                          bsStyle="info" 
                                          bsSize="large" 
                                          disabled={!this.props.user.isAdmin}
                                          onClick={() => {this.handleEditShow(shinobi)}}>
                                            Edit
                                      </Button>
                                  </div>
                              </td>
                              <td className="td-shinobi-container">
                                  <div>
                                      <Button 
                                          bsStyle="danger" 
                                          bsSize="large" 
                                          disabled={!this.props.user.isAdmin}
                                          onClick={() => {this.deleteMission(shinobi)}}>
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
                                Excel
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
                                Add new shinobi
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
                                              disabled={!this.props.students} 
                                              onClick={this.generateMissionsExcel}>
                                          Excel
                                      </Button>
                                  </div>
                              </td>
							  <td className="td-shinobi-container">
                                  <div>
                                    <Button 
                                          bsStyle="danger" 
                                          bsSize="large" 
                                          disabled={!this.props.students} 
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
                                          disabled={!this.props.students}
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
                                          disabled={!this.props.user.isAdmin}>
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

const Shinobies = connect(mapStateToProps, mapDispatchToProps)(ShinobiesView);
export default Shinobies;
