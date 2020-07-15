import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editProfile } from '../actions/items';

class UserForm extends Component {

    constructor(props){
        super()
        this.state = {
            bio: props.currentUser.bio,
            contact: props.currentUser.contact
        }
    }

  

  handleOnChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleOnSubmit = event => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    
        const postObj = { 
            method: "PATCH",
            headers:  {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                user: {
                    bio: this.state.bio,
                    contact: this.state.contact
                }
            })
        }
    fetch(`https://animal-swapping.herokuapp.com/users/${this.props.currentUser.id}`, postObj)
    .then(resp => resp.json())
    .then(data => {
        if (data.error) {
            alert(data.error)
          } else {
            this.props.editProfile(data)
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
      return <h1>You must be logged in to edit your account</h1>
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <div className="panel panel-default">
                    <div className="panel-body">
                        <form className="form-horizontal" onSubmit={this.handleOnSubmit}>
                        <div className="form-group">
                            <label htmlFor="bio" className="col-md-4 control-label">Bio:</label>
                            <div className="col-md-5">
                            <input
                                className="form-control"
                                type="text"
                                name="bio"
                                value={this.state.bio}
                                onChange={this.handleOnChange}
                            />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact" className="col-md-4 control-label">Contact Info:</label>
                            <div className="col-md-5">
                            <input
                                className="form-control"
                                type="text"
                                name="contact"
                                value={this.state.contact}
                                onChange={this.handleOnChange}
                            >
                            </input>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-md-6 col-md-offset-4">
                                <button type="submit" className="btn btn-default">Submit Edit</button>
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

export default connect(state => ({ currentUser: state.currentUser }), { editProfile })(UserForm);