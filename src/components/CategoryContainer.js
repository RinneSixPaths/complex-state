import React, { Component, PureComponent } from 'react';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import "bootstrap/dist/css/bootstrap.css";
import { ListGroup, ListGroupItem, Grid, Row, Col } from "react-bootstrap";

import { store } from '../redux/store';
import { addC, addSC, addName, delC, delName, chngName, renameC, delCurrent } from '../redux/actions';

import AddCategory from './AddCategory';
import CategoryList from './CategoryList';
import subItemIterator from '../functions/iterator';
import deletingIterator from '../functions/deleteLoop';
import deletingNameIterator from '../functions/deleteNameLoop';
import renameIterator from '../functions/renameLoop';
import purger from '../functions/purger';

const prevDispatch = store.dispatch;

store.dispatch = (action, movement = null, ...rest) => {
    if (typeof action === 'function') {
        let newAction = action(movement, ...rest);
            prevDispatch(newAction);
        } else {
            prevDispatch(action);
        }
    }

export default class CategoryContainer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
        this.addCategory = this.addCategory.bind(this);
        this.addSubCategory = this.addSubCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.renameCategory = this.renameCategory.bind(this);
    }
    
    addCategory(e, categoryName) {
        console.log('Adding category...');
        if (store.getState()) {
            if (~store.getState().namesInUse.indexOf(categoryName)) {
                alert('Name already in use or used');
                return;
            }
        }
        if (!categoryName) return;
        addC.list = [{categoryName : categoryName, categories : null, tasks: [], done: true}].concat(addC.list);
        addName.list.push(categoryName);
        store.dispatch(addC);
        store.dispatch(addName);
        purger(addName);
        console.log(store.getState());
        this.setState({categories : store.getState().categories});
    }
    
    addSubCategory(e, clickedCategory, position) {
        let categoryName = prompt("Please enter subcategory name", "Subcategory");
        console.log('Adding subcategory...');
        if (~store.getState().namesInUse.indexOf(categoryName)) {
            alert('Name already in use or used');
            return;
        }
        if (!categoryName) return;
        e.stopPropagation();
        addSC.clickedCategory = clickedCategory;
        addSC.position = position;
        addSC.list.push({categoryName : categoryName, categories : null, tasks: [], done: true});
        addName.list.push(categoryName);
        store.dispatch(subItemIterator, addSC);
        store.dispatch(addName);
        purger(addName);
        purger(addSC);
        console.log(store.getState());
        this.props.categorySelected();
        this.setState({categories : store.getState().categories});
    }
    
    deleteCategory(e, clickedCategory) {
        if (!confirm('Delete this category?')) return;
        console.log('Deleting category...');
        e.stopPropagation();
        delC.clickedCategory = clickedCategory;
        delName.item = clickedCategory;
        delName.list = store.getState().namesInUse;
        store.dispatch(deletingNameIterator, delName);
        store.dispatch(deletingIterator, delC);
        store.dispatch(delCurrent);
        purger(delName);
        purger(delC);
        console.log(store.getState());
        this.props.categorySelected();
        this.setState({categories : store.getState().categories});
    }
    
    renameCategory(e, clickedCategory) {
        console.log('Changing category name...');
        let categoryName = prompt("Please enter subcategory name", clickedCategory);
        e.stopPropagation();
        renameC.clickedCategory = clickedCategory;
        renameC.newName = categoryName;
        chngName.item = clickedCategory;
        chngName.list = store.getState().namesInUse;
        chngName.newName = categoryName;
        store.dispatch(renameIterator, renameC);
        chngName.list[chngName.list.indexOf(chngName.item)] = chngName.newName;
        purger(renameC);
        purger(chngName);
        console.log(store.getState());
        this.setState({categories : store.getState().categories});
    }
    
    render() {
        return (
            <Col xs={6} md={5}>
                <AddCategory 
                    addCategory = {this.addCategory}
                    categorySelected = {this.props.categorySelected}
                />
                <ListGroup>
                    <CategoryList 
                        categories = {this.state.categories} 
                        addSubCategory = {this.addSubCategory} 
                        deleteCategory = {this.deleteCategory}
                        renameCategory = {this.renameCategory}
                        categorySelected = {this.props.categorySelected}
                    />
                </ListGroup>
            </Col>
        )
    }
    
}