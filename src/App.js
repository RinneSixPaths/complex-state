import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import './Anima';

import MainPage from './components/MainPage';
import Missions from './components/Missions';
import Shinobies from './components/Shinobies';

import "bootstrap/dist/css/bootstrap.css";
import { ListGroup, ListGroupItem, Grid, Row, Col} from "react-bootstrap";

export default class App extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Switch>
              <Route exact path='/'  component={MainPage}/>
              <Route path='/missions' component={Missions}/>
              <Route path='/shinobies' component={Shinobies}/>
            </Switch>
        )
    }
}
