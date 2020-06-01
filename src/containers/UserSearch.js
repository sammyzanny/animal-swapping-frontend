import React, { Component } from 'react';
import UserCard from '../components/UserCard';
import photo from '../button.png'

class UserSearch extends Component {
  state = {
    page: 1,
    users: [],
    storedUsers: []
  }
  
  componentDidMount(){
    const {itemname, username} = this.props.match.params
    if(itemname){
      fetch(`http://localhost:3000/users/with/${itemname}`)
      .then(resp => resp.json())
      .then(users => {
        console.log(users)
        this.setState(prevState => {
          return {
            page: prevState.page,
            users: users,
            storedUsers: users
          }
        })
      })
    } else if (username){
      fetch(`http://localhost:3000/users/named/${username}`)
      .then(resp => resp.json())
      .then(users => {
        console.log(users)
        this.setState(prevState => {
          return {
            page: prevState.page,
            users: users,
            storedUsers: users
          }
        })
      })
    }
  }
  
  pageForward = () => {
    const { users, page } = this.state;
   
    
    const pageMax = Math.ceil(users.length/20)
    if(page < pageMax){
      this.setState(prevState => {
        return {
          page: prevState.page + 1,
          users: prevState.users,
          storedUsers: prevState.storedUsers
        }
      })
    }
  }

  pageBackward = () => {
    if(this.state.page > 1){
      this.setState(prevState => {
        return {
          page: prevState.page - 1,
          users: prevState.users,
          storedUsers: prevState.storedUsers
        }
      })
    }
  }
  
  cards = () => { 
    const { users, page } = this.state;
    const start = (page-1)*20, finish = page*20; 
    console.log(page)
    return users.slice(start, finish).map((user) => {
     return <UserCard user={user} history={this.props.history} />
    })
  }

  mutualFilter = () => {
    const newUsers = this.state.users.filter(user => {
     return user.wishlist.some(wish => {
        return this.props.currentUser.inventory.some(sale => {
          return sale.id === wish.id
        })
      })
    })
    this.setState(prevState => {
      return {
        page: prevState.page,
        users: newUsers,
        storedUsers: prevState.storedUsers
      }
    })
  }

  unfilter = () => {
    this.setState(prevState => {
      return {
        page: prevState.page,
        users: prevState.storedUsers,
        storedUsers: prevState.storedUsers
      }
    })
  }

  handleFilter = (event) => {
    if(event.target.checked){
      this.mutualFilter()
    } else {
      this.unfilter()
    }
  }
      
  

  

  render() {

    return (
      <div>
        <hr />
        <div className="row justify-content-center">
          <h2>Users</h2>
        </div>
        {this.props.currentUser ? <div><label style={{backgroundColor: "grey", color: "white", margin: "10px", borderRadius: "25px", padding: "10px"}}>Mutual Trade</label><input type="checkbox" onChange={this.handleFilter} /></div> : null }
        <hr />
        <div className="container">
          <div className="row">
              {this.cards()}
            
          </div>
        </div>
        <div className="page-buttons">
           <input type="image" src={photo} onClick={this.purchaseBackward} style={{transform: "scaleX(-1)", marginRight: "50px"}}/><input type="image" src={photo} onClick={this.purchaseForward} />
        </div>
      </div>
    );
  }
}


export default UserSearch;