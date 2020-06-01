import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/items';

class Login extends Component {

  state = {
    username: '',
    password: ''
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
            user: this.state
        })
    }
    fetch('http://localhost:3000/auth', reqObj)
        .then(response => response.json())
        .then(data =>  {
            if (data.message) {
                alert(data.message)
              } else {
                  localStorage.setItem("token", data.jwt)
                  console.log(data)
                this.props.login(data.user)
                this.props.history.push('/')
              }
            
        });
    this.setState({
      username: '',
      password: ''
    });
  }

  render() {
    if (this.props.loggedIn){
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
                    <label htmlFor="username" className="col-md-4 control-label">Username:</label>
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
                    <label htmlFor="tags" className="col-md-4 control-label">Password:</label>
                    <div className="col-md-5">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleOnChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-6 col-md-offset-4">
                      <button type="submit" className="btn btn-default">Login</button>
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

function mapDispatchToProps(dispatch){
    return {login: (user) => dispatch(login(user))}
}
  
 
  
  
  export default connect(null, mapDispatchToProps)(Login)