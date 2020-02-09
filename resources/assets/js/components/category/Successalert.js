import React, { Component } from 'react';

export default class Successalert extends Component {
    render() {
        return(
            <div className="alert alert-success alert-dismissible fade show" role="alert">
			  <strong>Success!</strong> Edit Successfully.
			  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
			    <span aria-hidden="true">&times;</span>
			  </button>
			</div>
        );
    }
}