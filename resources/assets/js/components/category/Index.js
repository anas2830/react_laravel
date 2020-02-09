import React, { Component } from 'react';

import {BrowserRouter as Router , Link, Route} from 'react-router-dom';

import Add from './Add';
import Edit from './Edit';
import Listing from './Listing';

export default class Index extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Link to="/category" className="btn btn-info">Listing </Link> &nbsp;&nbsp;&nbsp;
                    <Link to="category/add" className="btn btn-success"> Add</Link>

                    <Route exact path="/category" component={Listing} />
                    <Route exact path="/category/add" component={Add} />
                    <Route exact path="/category/edit/:id" component={Edit} />
                    <Route exact path="/" component={Listing} />
                </div>
            </Router>
        );
    }
}