import React from 'react';
import Items from '../containers/Items'


class Profile extends React.Component {
    state = {
        username: '',
        bio: '',
        inventory: '',
        customs: '',
        showWhat: '',
        searchTerm: ''
    }

    viewInventory = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                inventory: prevState.inventory,
                showWhat: 'inventory'
            }
        })
    }

    viewWishlist = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                inventory: prevState.inventory,
                showWhat: 'wishlist'
            }
        })
    }

    viewCustoms = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                inventory: prevState.inventory,
                showWhat: 'customs'
            }
        })
    }

    componentDidMount(){
        if (!this.props.currentUser){
            fetch(`http://localhost:3000/user/${this.props.match.params.username}`)
            .then(response => response.json())
            .then(data =>  {
            if (data.error) {
             alert(data.error)
            } else {
              console.log(data)
              this.setState({...data.user, showInventory: this.state.showInventory})
              
            }
            
        });
        }
    }

    chooseMyItems = () => {
        switch (this.state.showWhat){
            case 'inventory':
                return <Items items={this.props.currentUser.inventory} type='myInventory' />

            case 'wishlist':
                return <Items items={this.props.currentUser.wishlist} type='myWishlist' />

            case 'customs': 
                return <Items items={this.props.currentUser.customs} type="myCustoms"/>
            
            default:
                return null
        }
    }

    chooseOthersItems = () => {
        switch (this.state.showWhat){
            case 'inventory':
                return <Items items={this.state.inventory} type="othersInventory"/>

            case 'wishlist':
                return <Items items={this.state.wishlist} type="othersWishlist"/>

            case 'customs': 
                return <Items items={this.state.customs} type="othersCustoms"/>

            default:
                return null
        }
    }
    renderCurrentUser = () => {
        return (
            <React.Fragment >
            <h1>Hello {this.props.currentUser.username}</h1>
            <h3>Your Bio</h3><p>{this.props.currentUser.bio}</p>
            <button onClick={this.viewInventory}>My Inventory</button><button onClick={this.viewWishlist}>My Wishlist</button><button onClick={this.viewCustoms}>My Custom Items</button>
            {this.chooseMyItems()}
            </React.Fragment>
        )
    }

    renderOtherUser = () => {
                return (
                    <React.Fragment >
                    <h1>{this.state.username}'s Page</h1>
                    <h3>Bio: </h3><p>{this.state.bio}</p>
                    <button onClick={this.viewInventory}>View Inventory</button><button onClick={this.viewWishlist}>View Wishlist</button><button onClick={this.viewCustoms}>View Custom Items</button>
                    {this.chooseOthersItems()}
                    </React.Fragment>
                )
    }

    handleChange = (event) => {
        event.persist();
        this.setState(prevState => {
            return {
                ...prevState,
                searchTerm: event.target.value
            }
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.history.push(`/users/named/${this.state.searchTerm}`)
    }
    render(){
        return (
            <div >
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.searchTerm} onChange={this.handleChange} placeholder="Search other users by name" />
                    <input type="submit" value="Search" />
                </form>
            {this.props.currentUser ? this.renderCurrentUser() : this.renderOtherUser()}
            </div>
            )
    }
}
export default Profile