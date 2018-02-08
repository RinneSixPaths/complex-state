import React, { Component, PureComponent } from 'react';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import "../../css/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { FormControl, Button, Grid, Row, Col } from "react-bootstrap";



export default class AddCategory extends Component {
    
    constructor(props) {
        super(props);
        
        this.changeText = this.changeText.bind(this);
        
        this.state = {
            value: ''
        }
    }
    
    changeText(e) {
        this.setState({value: e.target.value});
    }
    
    render() {
        return (
            <Col className="add-category-column">
                <FormControl className="add-category-input" bsSize="large" type = "text" value = {this.state.value} onChange = {this.changeText} placeholder="Enter category title"></FormControl>
                <Button bsStyle="info" bsSize="large" onClick = {(e) => {
                    this.setState({value: ''});
                    this.props.addCategory(e, this.state.value);
                    this.props.categorySelected();
                }}>Add category</Button>
            </Col>
        )
    }
    
}