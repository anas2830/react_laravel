import React, { Component } from 'react';
import {BrowserRouter as Router , Link, Route} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Category from './category/Index';


export default class Header extends Component {
	render() {
		return(
			<Router>
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/category">Category</Link>

                    <Route exact path='/' component={Home} />
                    <Route path='/about' component={About} />
                    <Route exact path='/category' component={Category} />
                </div>
			</Router>
		);
	}
}