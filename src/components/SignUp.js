import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/items';


class SignUp extends Component {

  state = {
    username: '',
    password: '',
    confirmPassword: '',
    bio: '',
    contact: ''
    
  }

  handleOnChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleOnSubmit = event => {
    event.preventDefault();
    const reqObj = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          user: {
            username: this.state.username,
            password: this.state.password,
            bio: this.state.bio,
            contact: this.state.contact
          }
      })
    }
    if (this.state.password !== this.state.confirmPassword){
      return alert("Passwords do not match")
    }
    fetch('https://animal-swapping.herokuapp.com/users', reqObj)
      .then(response => response.json())
      .then(data =>  {
          if (data.error) {
            alert(data.error)
          } else {
            this.setState({
              username: '',
              password: '',
              confirmPassword: '',
              bio: '',
              contact: ''
            });

            localStorage.setItem("token", data.token)
            this.props.login(data.user)
            this.props.history.push('/')
          }  
      });
    

  }

  render() {
    if(this.props.loggedIn){
      this.props.history.push('/')
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="panel panel-default">
              <div className="panel-body">
                <form className="form-horizontal" onSubmit={this.handleOnSubmit}>
                  <div className="form-group">
                    <label htmlFor="username" className="col-md-4 control-label">Create Username:</label>
                    <div className="col-md-5">
                      <input
                        className="form-control"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleOnChange}
                      />
                    </div>
                  </div>
                  
                    
                  <div className="form-group">
                    <label htmlFor="tags" className="col-md-4 control-label">Create Password:</label>
                    <div className="col-md-5">
                      <input
                        className="form-control"
                        type="text"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleOnChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="tags" className="col-md-4 control-label">Confirm Password:</label>
                    <div className="col-md-5">
                      <input
                        className="form-control"
                        type="text"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.handleOnChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="tags" className="col-md-4 control-label">Contact Info :</label>
                    <div className="col-md-5">
                      <input
                        className="form-control"
                        type="text"
                        name="contact"
                        placeholder="Nintendo Friend Code or Alternative Method"
                        value={this.state.contact}
                        onChange={this.handleOnChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="tags" className="col-md-4 control-label">Bio:</label>
                    <div className="col-md-5">
                      <textarea
                        className="form-control"
                        type="text"
                        name="bio"
                        placeholder={"Anything you'd like to share with potential traders?"}
                        value={this.state.bio}
                        onChange={this.handleOnChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-6 col-md-offset-4">
                      <button type="submit" className="btn btn-default">SignUp</button>
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


  
 
  
  
export default connect(null, {login})(SignUp)