import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router-dom';
import { setupMainBg, setupHeader, entry } from '../Anima';

import { setCurrentUser } from '../redux/actions';

import mainBg from '../../img/firewatch.jpg';
import swipe from '../../img/swipe.png';

import "../../css/mainPageStyle.css";
import "../../css/fonts.css";
import "bootstrap/dist/css/bootstrap.css";
import { FormControl, Button, Col } from "react-bootstrap";

import Header from './Header/Header';
import Navigator from './Navigator/Navigator';
import Footer from './Footer/Footer';

const pageColor = 'rgb(0, 180, 195)';

const mapStateToProps = state => {
    return { userName: state.currentUser.name };
};

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: userData => dispatch(setCurrentUser(userData))
    };
};

class MainPageView extends Component {
    
    constructor(props) {
        super(props);
        
        this.register = this.register.bind(this);
        this.logIn = this.logIn.bind(this);
    }
    
    componentDidMount() {
        entry();
    }
    
    register() {
        const payload = {userName: 'New User'};
        const queryConfig = {
            method: 'POST', 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };
        
        fetch('/register', queryConfig)
             .then(response => (response.json()))
             .then(data => {
                 console.log(data);
             });
    }
    
    logIn() {
        const payload = {userName: 'New User'},
              URL = '/user?param=val&username=myName';
        const queryConfig = {
            method: 'GET'
        };
        
        fetch(URL, queryConfig)
            .then(response => (response.json()))
            .then(data => {
                console.log(data);
                /*EXPERIMENTAL AREA*/    
                
                this.props.setCurrentUser(data);
            });
    }
    
    render() {
        
        return (
                <div className="main-bg-wrapper" style={ setupMainBg(mainBg) }>
                    <Navigator className="main"/>
                    <Header style={ setupHeader(pageColor) }/>
                        
                    
                    <div className="anima-wrapper">
                        
                        <p className="greetings" >Rinne Six Paths</p>
                        <span className="customer-wrapper">
                            <span className="customer-text" >Become our lovely customer</span>
                            <span className="swipe-text">Wheel to enter</span>
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
                                <Button bsStyle="success" bsSize="large" onClick={this.register}>Register</Button>
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
                                <Button bsStyle="info" bsSize="large" onClick={this.logIn}>Log In</Button>
                            </div>
                        </Col>
                    </div>
                    <Footer />
                </div>
        ) 
    }
}

const MainPage = connect(mapStateToProps, mapDispatchToProps)(MainPageView);
export default MainPage;