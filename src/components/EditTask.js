import React, { Component, PureComponent } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import { store } from '../redux/store';
import { updateTaskName, updateTaskDes, deposeTask } from '../redux/actions';

import "../../css/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { FormControl, ListGroupItem, Button, Glyphicon, Grid, Row, Col } from "react-bootstrap";

import updateTaskNameIterator from '../functions/updateTaskNameLoop';
import deposeTaskIterator from '../functions/deposeTaskLoop';
import isComplited from '../functions/isComplited';
import purger from '../functions/purger';

export default class EditTask extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            newTaskName: this.props.currentTask.taskName,
            newDescription: this.props.currentTask.description,
            bufferName: null,
            bufferDesc: null,
            nameFlag: false
        }
        
        this.newNameInput = this.newNameInput.bind(this);
        this.newDescInput = this.newDescInput.bind(this);
        this.updateTaskName = this.updateTaskName.bind(this);
        this.updateTaskDescription = this.updateTaskDescription.bind(this);
        this.deposeTask = this.deposeTask.bind(this);
    }
    
    newNameInput(e) {
        this.setState({
            newTaskName: e.target.value,
            newDescription: this.state.bufferDesc || this.props.currentTask.description,
            bufferName: e.target.value,
            bufferDesc: this.state.bufferDesc,
            nameFlag: false || this.state.nameFlag
        });
    }
    
    newDescInput(e) {
        this.setState({
            newTaskName: this.state.bufferName || this.props.currentTask.taskName,
            newDescription: e.target.value,
            bufferName: this.state.bufferName,
            bufferDesc: e.target.value,
            nameFlag: false || this.state.nameFlag
        });
    }
    
    updateTaskName(e) {
        console.log('Updating name...');
        e.stopPropagation();
        if (this.state.newTaskName == this.props.currentTask.taskName) return;
        updateTaskName.name = this.state.newTaskName;
        updateTaskName.task = this.props.currentTask;
        updateTaskName.currentCategory = this.props.match.params.name;
        store.dispatch(updateTaskNameIterator, updateTaskName, "currentCategory", "task", "name", "taskName");
        purger(updateTaskName);
        console.log(store.getState());
        this.setState({
            newTaskName: this.props.currentTask.taskName,
            newDescription: this.props.currentTask.description,
            bufferName: null,
            bufferDesc: null,
            nameFlag: false || this.state.nameFlag
        });
    }
    
    updateTaskDescription(e) {
        console.log('Updating description...');
        e.stopPropagation();
        if (this.state.newDescription == this.props.currentTask.description) return;
        updateTaskDes.description = this.state.newDescription;
        updateTaskDes.task = this.props.currentTask;
        updateTaskDes.currentCategory = this.props.match.params.name;
        store.dispatch(updateTaskNameIterator, updateTaskDes, "currentCategory", "task", "description", "description");
        purger(updateTaskDes);
        this.props.categorySelected();
        console.log(store.getState());
        this.setState({
            newTaskName: this.props.currentTask.taskName,
            newDescription: this.props.currentTask.description,
            bufferName: null,
            bufferDesc: null,
            nameFlag: false || this.state.nameFlag
        });
    }
    
    deposeTask(e, categoryName) {
        console.log('Deposing task...');
        if (categoryName == this.props.match.params.name) return;
        deposeTask.task = this.props.currentTask;
        deposeTask.clickedCategory = categoryName;
        deposeTask.currentCategory = this.props.match.params.name;
        store.dispatch(deposeTaskIterator, deposeTask);
        purger(deposeTask);
        console.log(store.getState());
        console.log('in depose...');
        
        isComplited();
        this.props.categorySelected();
        this.setState({
            newTaskName: this.props.currentTask.taskName,
            newDescription: this.props.currentTask.description,
            bufferName: null,
            bufferDesc: null,
            nameFlag: false
        });
    }
    
    render() {
        let categories = store.getState().namesInUse;
        return (
            <div className="category">
                {(this.props.match.params.task == this.props.currentTask.taskName) ? 
                    (() => (
                    <div className="edit-task">
                        <FormControl componentClass="textarea" onChange = {this.newDescInput} value = { this.state.newDescription} />
                        <FormControl type = "text" onChange = {this.newNameInput} value = {this.state.newTaskName} />
                        {categories.map((category, index) => (
                            <Link className = "move-task" key = {index} to={{ pathname: '/category/' + this.props.match.params.name}}>
                                <Button className = "move-task-button" bsStyle="info" onClick = {(e) => {
                                    this.deposeTask(e, category); 
                                }}>
                                    {category}
                                 </Button>
                            </Link>
                        ))}
                        <div className="link-row">
                            <Link to={{ pathname: '/category/' + this.props.match.params.name}} onClick = {this.props.taskSelected}>
                                <Glyphicon glyph="remove" />
                            </Link>
                            <Link to={{ pathname: '/category/' + this.props.match.params.name}} onClick = {(e) => {
                                this.updateTaskName(e);
                                this.updateTaskDescription(e);
                            }}>
                                <Glyphicon glyph="ok" />
                            </Link>
                        </div>
                    </div>
                    ))() : 
                    console.log('No access')}
            </div>
        ) 
    }
}