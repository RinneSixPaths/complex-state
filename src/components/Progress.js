import React, { Component, PureComponent } from 'react';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import "bootstrap/dist/css/bootstrap.css";
import { ProgressBar } from "react-bootstrap";


export default class App extends PureComponent {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        console.log('done = ' +this.props.count);
        return (
            <ProgressBar bsStyle="success" now={this.props.count} />
        )
    }
}
