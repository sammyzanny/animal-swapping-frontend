import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createItem } from '../actions/items';


class ItemForm extends Component {

  state = {
    name: '',
    category: 'Bugs'
  }

  handleOnChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleOnSubmit = event => {
    event.preventDefault();
    const item = this.state, token = localStorage.getItem("token");
    
        const postObj = { 
            method: "POST",
            headers:  {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                item: item
            })
        }
    fetch('https://animal-swapping-api.herokuapp.com/items', postObj)
    .then(resp => resp.json())
    .then(data => {
        if (data.error) {
            alert(data.error)
          } else {
            this.props.createItem(data)
            this.setState({
              name: '',
              category: ''
            });
            alert("Item Created")
          }
        })
  }

  render() {
    const categories = ["Bugs", "Fish", "Fossils", "Accessories", "Bags", "Bottoms", "Dresses", "Headwear", "Shoes", "Socks", "Tops", "Crafting-Materials", "Floors", "Houseware", "Miscellaneous", "Rug", "Wall-Mounted", "Wallpaper", "Umbrellas", "Materials"] 
    if (!this.props.currentUser){
      return <h1>You must be logged in to create an Item</h1>
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="panel panel-default">
              <div className="panel-body">
                <form className="form-horizontal" onSubmit={this.handleOnSubmit}>
                  <div className="form-group">
                    <label htmlFor="content" className="col-md-4 control-label">Item Name</label>
                    <div className="col-md-5">
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleOnChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="language" className="col-md-4 control-label">Category:</label>
                    <div className="col-md-5">
                      <select
                        className="form-control"
                        type="text"
                        name="category"
                        value={this.state.category}
                        onChange={this.handleOnChange}
                      >
                        {categories.map(category => <option value={category} >{category}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-6 col-md-offset-4">
                      <button type="submit" className="btn btn-default">Add</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({ currentUser: state.currentUser }), { createItem })(ItemForm);