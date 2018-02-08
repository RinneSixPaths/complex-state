import React, { Component, PureComponent } from 'react';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import "bootstrap/dist/css/bootstrap.css";
import { ListGroup, ListGroupItem, Grid, Row, Col } from "react-bootstrap";

import { store } from '../redux/store';
import { addT, setCurrent, addTaskName } from '../redux/actions';

import addTaskIterator from '../functions/addTaskLoop';
import AddTask from './AddTask';
import TaskList from './TaskList';
import EditTask from './EditTask';
import seekCategory from '../functions/seekCategory';
import purger from '../functions/purger';
import isComplited from '../functions/isComplited';

export default class CategoryContainer extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            categories: [],
            updateComponents: null
        }
        this.addTask = this.addTask.bind(this);
        this.setCurrentCategory = this.setCurrentCategory.bind(this);
    }
    
    setCurrentCategory() {
        setCurrent.current = seekCategory(this.props.match.params.name);
        store.dispatch(setCurrent);
        purger(setCurrent);
    }
    
    addTask(e, taskName) {
        e.stopPropagation();
        console.log('adding new task...');
        if (store.getState().taskNameInUse) {
            if (~store.getState().taskNameInUse.indexOf(taskName)) {
                alert('Name already in use or used');
                return;
            }
        }
        if (!taskName) return;
        this.setCurrentCategory();
        addT.item = {taskName: taskName, done: false, category: store.getState().current.categoryName, description: 'JUST DO IT'};
        addTaskName.list.push(taskName);
        store.dispatch(addTaskName);
        store.dispatch(addTaskIterator, addT);
        purger(addT);
        purger(addTaskName);
        isComplited();
        this.props.categorySelected();
        console.log(store.getState());
        this.setState({categories : store.getState().categories});
    }
    
    render() {
        this.setCurrentCategory();
        return (
            <Col xs={6} md={5}>
                <AddTask addTask = {this.addTask}/>
                <TaskList 
                    currentCategory = {this.props.match.params.name}
                    categorySelected = {this.props.categorySelected}
                />
                
            </Col>
        )
    }
    
}