import React, { Component, PureComponent } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import { setupMainBg } from '../Anima';

import mainBg from '../../img/firewatch.jpg';
import swipe from '../../img/swipe.png';
import "../../css/mainPageStyle.css";
import "../../css/fonts.css";
import "bootstrap/dist/css/bootstrap.css";
import { FormControl, ListGroupItem, Button, Glyphicon, Grid, Row, Col } from "react-bootstrap";

export default class Design extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
                <div className="main-bg-wrapper" style={ setupMainBg(mainBg) }>
                    <div className="anima-wrapper">
                        <p className="greetings" >Rinne Six Paths</p>
                        <span className="customer-wrapper">
                            <span className="customer-text" >Become our lovely customer</span>
                            <span className="swipe-text" >Wheel to enter</span>
                            <img src={swipe} className="wheel"/>
                        </span>
                    </div>
                </div>
        ) 
    }
}