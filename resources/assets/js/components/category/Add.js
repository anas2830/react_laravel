import React, { Component } from 'react';
import axios from 'axios';

export default class Add extends Component {
	constructor()
	{
       super();
       this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
       this.onSubmit = this.onSubmit.bind(this);
       this.state=({category_name:'',status:''})
	}

	onChangeCategoryName(e)
	{
		this.setState({
            [e.target.name]: e.target.value
		});
	}

	onSubmit(e)
	{
		e.preventDefault();
		const category = {
			category_name: this.state.category_name,
			status: this.state.status
		}

		axios.post('http://127.0.0.1:8000/category/store',category)
		.then();
	}

	render() {
		return(
			<div>
			    <form onSubmit={this.onSubmit}>
				  <div className="form-group">
				    <label>Category Name</label>
				    <input type="text" className="form-control" 
					    name="category_name" 
					    value={this.state.category_name} 
					    onChange={this.onChangeCategoryName} 
					    placeholder="Enter Name">
				    </input>

				    <select className="form-control mt-2" name="status" onChange={this.onChangeCategoryName}>
					  <option>select</option>
					  <option value="1">Active</option>
					  <option value="0">Inactive</option>
					</select>
				  </div>
				  <button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>
		);
	}
}