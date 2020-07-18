import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import NavBar from './components/NavBar';
import Items from './containers/Items';
import Profile from './components/Profile';
import ItemForm from './components/ItemForm';
import Home from './components/Home'
import {connect} from 'react-redux';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { login } from './actions/items'
import  UserSearch from './containers/UserSearch'
import Button from '@material-ui/core/Button'

class App extends React.Component {
  componentDidMount(){
    this.props.fetchItems();
    const token = localStorage.getItem('token')
    if (!!token){
      this.props.fetchLogin(token);
    }
  }

  signOut = () => {
    localStorage.removeItem('token')
    this.props.signOut()
  }
  
  render(){
    return (
    <Router >
      <React.Fragment>
      <NavBar currentUser={this.props.currentUser}/>
     { this.props.currentUser ? <Button onClick={this.signOut} variant="contained" color="primary" style={{float: "right"}}>Sign Out</Button> : null}
      <Switch >
        <Route exact path="/items" render={(rp) => <Items {...rp} currentUser={this.props.currentUser} items={this.props.items} type="items"/>} />
        {this.props.currentUser ? 
        <Route exact path={`/profile/${this.props.currentUser.username}`} render={(rp) => <Profile {...rp} currentUser={this.props.currentUser}/>} /> : null} 
        <Route exact path="/profile/:username" render={(rp) => <Profile {...rp} loggedIn={!!this.props.currentUser}/>} />
        <Route exact path="/custom-items" render={(rp) => <Items {...rp} currentUser={this.props.currentUser} items={this.props.customItems} type="items"/>} />
        <Route exact path="/create-custom-item" component={ItemForm} />
        <Route exact path="/login" render={(rp) => <Login {...rp} loggedIn={!!this.props.currentUser}/>} />
        <Route exact path="/sign-up" render={(rp) => <SignUp {...rp} loggedIn={!!this.props.currentUser}/> } />
        <Route exact path="/users/with/:itemname" render={(rp) => <UserSearch {...rp} currentUser={this.props.currentUser}/> } />
        <Route exact path="/users/named/:username" render={(rp) => <UserSearch {...rp} currentUser={this.props.currentUser}/> } />
        <Route path='/' render={(rp) => <Home {...rp}/>} />
      </Switch>
      </ React.Fragment>
    </Router>
  )}
};

function fetchItems(){
  return (dispatch) => {
    fetch('https://animal-swapping-api.herokuapp.com/items')
      .then(response => response.json())
      .then(data =>  {
        dispatch({ type: 'FETCH_ITEMS', items: data.items, customItems: data.customItems })});
  };
}

function fetchLogin(token){
  return ((dispatch) => {

    const reqObj = {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }

    fetch('https://animal-swapping-api.herokuapp.com/login', reqObj)
      .then(response => response.json())
      .then(data =>  {
        if (data.error) {
          alert(data.error)
        } else {
          dispatch(login(data.user))
          
        }
       
    });
  })
}

function mapDispatchToProps(dispatch){
  return {
    fetchItems: () => {
      dispatch(fetchItems())
    },
    fetchLogin: (token) => {
      dispatch(fetchLogin(token))
    },
    signOut: () => {
      dispatch({ type: 'SIGN_OUT'})
    }

    
  }
}


export default connect((state) => ({currentUser: state.currentUser, items: state.items, customItems: state.customItems}), mapDispatchToProps)(App)