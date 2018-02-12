import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';

import mainBg from '../../img/night.jpg';

import { setupMainBg, setupHeader, setupBlankBlock, entry } from '../Anima';

import "../../css/fonts.css";
import "bootstrap/dist/css/bootstrap.css";
import { FormControl, Button, Col } from "react-bootstrap";

import Header from './Header/Header';
import Navigator from './Navigator/Navigator';
import Footer from './Footer/Footer';

const pageColor = 'rgb(31, 134, 255)';

export default class Missions extends Component {
    
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        entry();
    }
    
    render() {
        return (
            <div className="main-bg-wrapper" style={ setupMainBg(mainBg) }>
                <Navigator className="night"/>
                <Header style={ setupHeader(pageColor) }/>
                <div className="workfield" style={ setupBlankBlock() }>
                               
                </div>
                <Footer />
            </div>
        ) 
    }
}
//'rgb(255, 143, 31)'