import React, { Component, PureComponent } from 'react';
import { Router, Route } from 'react-router-dom';
import styled from 'styled-components';

import Design from './components/Design';

import "bootstrap/dist/css/bootstrap.css";
import { ListGroup, ListGroupItem, Grid, Row, Col} from "react-bootstrap";

export default class App extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Design />
        )
    }
}
