import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router , Link, Route} from 'react-router-dom';
import Pagination from "react-js-pagination";

export default class Listing extends Component {
	constructor()
	{
	   console.log('constructor');
       super();
       this.handlePageChange = this.handlePageChange.bind(this);
       this.state={
       		categories: [],
       		activePage: 1,
       		itemsCountPerPage: 3,
       		totalItemsCount:100,
       		from:0,
       		to:0
   		}

	}

	Delete(id)
	{
	   axios.delete('http://127.0.0.1:8000/category/delete/'+id)
	   .then(response=>{
           var categories = this.state.categories;
           for(var i=0;i<categories.length; i++)
           {
           	   if(categories[i].id == id)
           	   {
                    categories.splice(i,1);
           	        this.setState({categories:categories});
           	   }
           }
		});
	}

	componentDidMount()
	{
		console.log('didmount');
		axios.get('http://127.0.0.1:8000/category').then(response=>{
			this.setState({
				categories:response.data.result.data,
				activePage:1,
				itemsCountPerPage:2,
				totalItemsCount:response.data.result.total,
				from:response.data.result.from,
				to:response.data.result.to
			});
		});

	}

	componentDidUpdate(prevProps, prevState, snapshot)
	{
		console.log('didupdate');
	}

	componentWillUnmount()
	{
		console.log('will unmount');
	}


	handlePageChange(pageNumber) {
/*		alert(pageNumber);*/
/*	    this.setState({activePage: pageNumber});*/
		axios.get('http://127.0.0.1:8000/category?page='+pageNumber)
		.then(response=>{
	        console.log(response.data.result);
			this.setState({
				categories:response.data.result.data,
				activePage:pageNumber,
				itemsCountPerPage:response.data.result.per_page,
				totalItemsCount:response.data.result.total,
				from:response.data.result.from,
				to:response.data.result.to
			});
		});
    }

	render() {
		console.log('render');
		return(
			<div>
			    <table className="table table-bordered mt-2" id="table">
				  <thead>
				    <tr>
				      <th scope="col">SL</th>
				      <th scope="col">Category Name</th>
				      <th scope="col">Status</th>
				      <th scope="col">Created At</th>
				      <th scope="col">Action</th>
				    </tr>
				  </thead>
				  <tbody>
                    {
	                        this.state.categories.map((category, key)=>
	                        {
	                      	    return(
		                            <tr key={key}>
									    <th scope="row">{this.state.from++}</th>
									    <td>{category.name}</td>
									    <td>{category.status == 1 ? 'active' : 'inactive'}</td>
									    <td>{category.created_at}</td>
									    <td>
									       <Link to={`/category/edit/${category.id}`}><button className="btn btn-sm btn-info">Edit</button></Link>&nbsp;
									       <a href="#" onClick={() => this.Delete(category.id)}><button className="btn btn-sm btn-danger">Delete</button></a>
									    </td>
									</tr>
	                      	       )
	                        })
                    }
				    
				  </tbody>
				</table>

		        <Pagination
		            activePage={this.state.activePage}
		            itemsCountPerPage={this.state.itemsCountPerPage}
		            totalItemsCount={this.state.totalItemsCount}
		            onChange={this.handlePageChange}
		            itemClass='page-item'
		            linkClass='page-link'
		        />
			</div>
		);
	}
}