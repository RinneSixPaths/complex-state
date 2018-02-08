import React, { Component, PureComponent } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import "bootstrap/dist/css/bootstrap.css";
import { ListGroup, FormControl, ListGroupItem, Grid, Row, Col, ProgressBar, Button } from "react-bootstrap";
import "../../css/styles.css";
import { addName } from '../redux/actions';

const newName = "newPerson";


const mapStateToProps = state => {
    return {
        categories: state.categories 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addName: name => dispatch(addName(name))
    };
};

class HeaderView extends Component {
    
    constructor(props) {
        super(props);
        
        this.addNameHandler = this.addNameHandler.bind(this);
    }
    
    addNameHandler(e) {
        let target = e.target.value;
        this.props.addName({ target, newName });
    }
    
    render() {
        return (
            <div>
                {this.props.categories.map((item, index) => (
                    <div key={item.categoryName+index}>
                        <Button 
                            bsStyle="success" 
                            value={item.categoryName}
                            onClick={this.addNameHandler}
                        >
                                {item.categoryName}
                        </Button>
                        {item.persons.map((person, index) => (
                            <ListGroupItem key={person.name+index}>{person.name}</ListGroupItem>
                        ))}
                    </div>
                 ))}
            </div>
        )
    }
}

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderView);
export default Header;