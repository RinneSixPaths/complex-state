import React, { Component, PureComponent } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import { store } from '../redux/store';
import { doneTask } from '../redux/actions';

import "../../css/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { FormControl, ListGroupItem, Button, Glyphicon, Grid, Row, Col } from "react-bootstrap";

import EditTask from './EditTask';
import getAllTasksIterator from '../functions/getAllTasks';
import doneTaskIterator from '../functions/doneTaskLoop';
import isComplited from '../functions/isComplited';
import purger from '../functions/purger';

export default class TaskList extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            updateComponents: null
        }
        
        this.doneTask = this.doneTask.bind(this);
        this.taskSelected = this.taskSelected.bind(this);
        this.isShow = this.isShow.bind(this);
    }
    
    doneTask(e, task) {
        console.log('doing task...');
        
        doneTask.currentCategory = this.props.currentCategory;
        doneTask.task = task;
        store.dispatch(doneTaskIterator, doneTask);
        purger(doneTask);
        store.getState().anton = 'katlyar';
        console.log(store.getState());
        isComplited();
        this.setState({updateComponents: Date.now()});
        this.props.categorySelected();
    }
    
    taskSelected() {
        this.setState({updateComponents: Date.now()});
    }
    
    isShow(task) {
        let result1 = true, result2 = true, filterArr = store.getState().filter ? store.getState().filter : [""];
        result1 = filterArr[0].length ? ~filterArr.indexOf(task.taskName) ? true : false : true;
        if (store.getState().checked) {
            result2 = task.done ? true : false;
        }
        return result1 && result2 ? "block" : "none";
    }
    
    render() {
        let tasks = getAllTasksIterator(this.props.currentCategory);
        return (
            <div>
                {tasks.map(
                        (task, index) => { 
                        return (
                          <ListGroupItem 
                            key={index} 
                            style={{display: this.isShow(task)}}>
                            <div className="category"
                          >
                                <input 
                                    type="checkbox" 
                                    onChange = {(e) => this.doneTask(e, task) } 
                                    checked = {task.done ? true : false}
                                />
                                <span>{task.taskName}</span>
                                <Link to={{ pathname: '/category/' + this.props.currentCategory + '/' + task.taskName }}         onClick = {this.taskSelected}
                                >
                                    <Glyphicon glyph="pencil" />
                                </Link>
                            </div>
                            <Route path='/category/:name/:task' 
                                render = {(props) => (<EditTask {...props} 
                                currentTask = {task} 
                                taskSelected = {this.taskSelected} 
                                categorySelected = {this.props.categorySelected}/>)}
                            />
                          </ListGroupItem>  )
                        }
                    )}
            </div>
        ) 
    }
    
}