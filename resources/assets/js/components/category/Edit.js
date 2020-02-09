import React, { Component } from 'react';
import axios from 'axios';
import Successalert from './Successalert';

export default class Edit extends Component {
	constructor(props)
	{
       super(props);
       this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
       this.onSubmit = this.onSubmit.bind(this);
       this.state=({
       	   category_name:'',
       	   status:'',
       	   alert_msg:'',
       	   showAlert: false
       })
	}

	componentDidMount()
	{
		axios.get('http://127.0.0.1:8000/category/edit/'+this.props.match.params.id).then(response=>{
			this.setState({
				category_name:response.data.name,
				status:response.data.status
			});
		});
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

		axios.post('http://127.0.0.1:8000/category/update/'+this.props.match.params.id,category)
		.then(res=>{
			this.setState({alert_msg:'success', showAlert: true});
			setTimeout(function(){
				$('#alert').hide();
			}.bind(this), 3000);
		})
		.catch(error=>{
            this.setState({alert_msg:'error'});
		});
	}

	render() {
		return(
			<div>
			     <div id="alert">{this.state.alert_msg == 'success' ? <Successalert /> : null } </div>

			    <form onSubmit={this.onSubmit}>
				  <div className="form-group">
				    <label>Category Name</label>
				    <input type="text" className="form-control" 
					    name="cat_name" 
					    value={this.state.category_name} 
					    onChange={this.onChangeCategoryName} 
					    placeholder="Enter Name">
				    </input>
				    <select className="form-control mt-2" name="status" onChange={this.onChangeCategoryName}>
					  <option>select</option>
					  <option value="1" selected={this.state.status == 1 ? 'selected' : ''}>Active</option>
					  <option value="0" selected={this.state.status == 1 ? '' : 'selected'}>Inactive</option>
					</select>
				  </div>
				  <button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>
		);
	}
}