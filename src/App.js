import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import './Anima';

import { setCurrentUser } from './redux/actions';

import MainPage from './components/MainPage';
import Missions from './components/Missions';
import Shinobies from './components/Shinobies';

import "bootstrap/dist/css/bootstrap.css";
import { ListGroup, ListGroupItem, Grid, Row, Col} from "react-bootstrap";

const currentUser = localStorage.getItem('user');

export default class App extends Component {
    
    constructor(props) {
        super(props);
    }
    
    componentWillMount() {
        if (currentUser) {
            this.props.storage.dispatch(setCurrentUser(JSON.parse(currentUser)));
        }
    }
    
    render() {
        return (
            <Switch>
              <Route exact path='/'  component={MainPage}/>
              <Route exact path='/missions' component={Missions}/>
              <Route exact path='/shinobies' component={Shinobies}/>
            </Switch>
        )
    }
}