import React, { Component, PureComponent } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import { setupMainBg, setupHeader } from '../Anima';

import mainBg from '../../img/firewatch.jpg';
import swipe from '../../img/swipe.png';
import menuIcon from '../../img/menu.png';
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
                    <nav className="anima-navbar" >
                        <a href="#">Some page</a>
                        <a href="#">Some page</a>
                        <a href="#">Some page</a>
                        <a href="#">Some page</a>
                        <a href="#" className="view-footer">View authors</a>
                    </nav>
                    <header className="header" style={ setupHeader() }>
                        <p className="logo-text" >Rinne Six Paths</p>
                        <img src={menuIcon} className="menu-icon"/>
                    </header>
                        
                    
                    <div className="anima-wrapper">
                        
                        <p className="greetings" >Rinne Six Paths</p>
                        <span className="customer-wrapper">
                            <span className="customer-text" >Become our lovely customer</span>
                            <span className="swipe-text" >Wheel to enter</span>
                            <img src={swipe} className="wheel"/>
                        </span>
                    </div>
                    
                    <div className="reg-wrapper" >
                        <Col xs={3} md={3} className="log-in-column">
                            <h1 className="enter-title">Register</h1>
                            <div className="log-in-wrapper">
                                <FormControl 
                                    bsSize="large" 
                                    type = "text"
                                    placeholder="Enter your name">
                                </FormControl>
                                <FormControl
                                    bsSize="large" 
                                    type = "password"
                                    placeholder="Enter your password">
                                </FormControl>
                                <FormControl
                                    bsSize="large" 
                                    type = "password"
                                    placeholder="Confirm your password">
                                </FormControl>
                                <Button bsStyle="success" bsSize="large">Redister</Button>
                            </div>
                        </Col>
                        <p>Or</p>
                        <Col xs={3} md={3} className="log-in-column">
                            <h1 className="enter-title">Enter</h1>
                            <div className="log-in-wrapper">
                                <FormControl 
                                    bsSize="large" 
                                    type = "text"
                                    placeholder="Enter your name">
                                </FormControl>
                                <FormControl
                                    bsSize="large" 
                                    type = "password"
                                    placeholder="Enter your password">
                                </FormControl>
                                <Button bsStyle="info" bsSize="large">Log In</Button>
                            </div>
                        </Col>
                    </div>  
                    <footer className="footer">
                        <p>Designed by <span>Rinne</span></p>
                        <p>Backend by <span>Artem</span></p>
                        <p>Nothing by <span>Lesha</span></p>
                    </footer>
                </div>
        ) 
    }
}