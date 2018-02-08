import React, { Component, PureComponent } from 'react';
import { Router, Route, Link, NavLink } from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import { store } from '../redux/store';

import "../../css/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { FormControl, ListGroupItem, Button, Glyphicon, Grid, Row, Col } from "react-bootstrap";

export default class CategoryList extends Component {
    
    constructor(props) {
        super(props);
        
    }
    
    render() {
        let callback = this.addClass;
        if (this.props.categories) {
            return (
                <div>
                   {this.props.categories.map(
                        (category, index) => { 
                        return (
                          <ListGroupItem key={index}>
                            <div className="category" onClick = {() => this.props.categorySelected}>
                                    <NavLink to={{ pathname: '/category/' + category.categoryName }} activeClassName="selected" onClick = {(e) => this.props.categorySelected()}>
                                        {category.categoryName}
                                    </NavLink>
                                    <Button onClick = {(e) => this.props.renameCategory(e, category.categoryName)}>
                                        <Glyphicon glyph="pencil" />
                                    </Button>
                                    <Button onClick = {(e) => this.props.addSubCategory(e, category.categoryName, index)}>
                                        <Glyphicon glyph="plus" />
                                    </Button>
                                    <Link to={{ pathname: '/'}} onClick = {(e) => this.props.deleteCategory(e, category.categoryName)}>
                                        <Glyphicon glyph="trash" />
                                    </Link>
                            </div>
                                <CategoryList 
                                    categories = {category.categories} 
                                    addSubCategory = {this.props.addSubCategory}
                                    deleteCategory = {this.props.deleteCategory}
                                    renameCategory = {this.props.renameCategory}
                                    categorySelected = {this.props.categorySelected}
                                />
                          </ListGroupItem>  )
                        }
                    )}
                </div>
            )
        } else {
           return (
                <b />
            ) 
        }
    }
    
}