import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setStudents } from '../redux/actions';

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
		setStudents: students => dispatch(setStudents(students))
    };
};

class ShinobiesView extends Component {
	
	_sensei = '';
	
    constructor(props) {
        super(props);
		
		this.state = {
            showAddStudent: false,
			studentName: 'Student Name',
			studentAge: 12,
            clickedMission: null
        };
		
		this.handleAddStudentClose = this.handleAddStudentClose.bind(this);
		this.handleAddStudentShow = this.handleAddStudentShow.bind(this);
		this.onSenseiSelect = this.onSenseiSelect.bind(this);
		this.addNewStudent = this.addNewStudent.bind(this);
		this.addNewStudent = this.addNewStudent.bind(this);
		this.onStudentNameInput = this.onStudentNameInput.bind(this);
		this.onStudentAgeInput = this.onStudentAgeInput.bind(this);
    }
    
    componentDidMount() {
        entry();
    }
	
	handleAddStudentClose () {
        this.setState({ 
			...this.state,
            showAddStudent: false, 
            studentName: 'Student Name',
            studentAge: 12,
            clickedMission: null //??
        });
        this._sensei = '';
    }
    
	handleAddStudentShow () {
		this.setState({
			...this.state,
			showAddStudent: true
		});
	}

	onSenseiSelect (eventKey, e) {
        this._sensei = eventKey;
    }

	addNewStudent () {
		const payload = {
            student: {
                name: this.state.studentName,
                age: this.state.studentAge,
                senseiName: this._sensei
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
        
        fetch('/addStudent', queryConfig)
            .then(response => (
                response.json()
            ))
            .then(data => {
                console.log(data);
				this.props.setStudents(data);
            });
        this.handleAddStudentClose();
	}

	onStudentNameInput (e) {
		this.setState({
            ...this.state,
            studentName: e.target.value
        });
	}

	onStudentAgeInput (e) {
		this.setState({
            ...this.state,
            studentAge: e.target.value
        });
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
                                          onClick={this.handleAddStudentShow}>
                                        Add new
                                    </Button>
                                 </div>
							 </td>
						  </tr>
						</tbody>
                    </Table>
                     <Modal show={this.state.showAddStudent} onHide={this.handleAddStudentClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          Students
                        </Modal.Title>
                      </Modal.Header>
                         <Modal.Body>
                            <p>
                              Fill the fields before adding
                            </p>
                            <DropdownButton title="Sensei" bsStyle="default" id="2" bsSize="large">
                                {shinobies.map((sensei, index) => (
                                    <MenuItem eventKey={sensei.name} key={index} onSelect={this.onSenseiSelect}>
                                        {sensei.name}
                                    </MenuItem>
                                ))}
                            </DropdownButton>
							<FormControl
                                    bsSize="large" 
                                    type = "text"
                                    placeholder="Enter Name"
                                    value = {this.state.studentName}
                                    onChange={this.onStudentNameInput}>
                            </FormControl>
							<FormControl
                                    bsSize="large" 
                                    type="number"
                                    placeholder="Enter Age"
                                    value = {this.state.studentAge}
                                    onChange={this.onStudentAgeInput}>
                            </FormControl>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button 
                                    bsStyle="success" 
                                    onClick={this.addNewStudent}>
                                Done
                            </Button>
                          </Modal.Footer>
                    </Modal>
                                        
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
