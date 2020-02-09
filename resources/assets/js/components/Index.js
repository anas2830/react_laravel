import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Header from './Header';

export default class Index extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <div className="row justify-content-center">
                    <p>this is body</p>
                </div>
            </div>
        );
    }
}

if (document.getElementById('Main_div')) {
    ReactDOM.render(<Index />, document.getElementById('Main_div'));
}
