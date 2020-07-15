import React from 'react';
import Items from '../containers/Items'
import Requests from '../containers/Requests'
import UserForm from '../components/UserForm'
import Select1 from '../hooks/Select1'
import Select2 from '../hooks/Select2'
import { Input } from '@material-ui/core';


class Profile extends React.Component {
    state = {
        id: false,
        username: '',
        bio: '',
        inventory: '',
        customs: '',
        showWhat: 'inventory',
        searchTerm: ''
    }

    changeShow = (event) => {
        event.persist()
        this.setState(prevState => {
            return {
                ...prevState,
                showWhat: event.target.value
            }
        })
    }
 


    componentDidMount(){
        if (!this.props.currentUser){
            fetch(`https://animal-swapping-api.herokuapp.com/user/${this.props.match.params.username}`)
            .then(response => response.json())
            .then(data =>  {
            if (data.error) {
             alert(data.error)
            } else {
              this.setState({...data.user, showWhat: 'inventory', searchTerm: ''})
            }
        });
        }
    }

    chooseMyItems = () => {
        const {currentUser, history} = this.props
        switch (this.state.showWhat){
            case 'inventory':
                return  <Items items={currentUser.inventory} type='myInventory' />

            case 'wishlist':
                return <Items items={currentUser.wishlist} type='myWishlist' />

            case 'customs': 
                return <Items items={currentUser.customs} type="myCustoms"/>

            case 'edit':
                return <UserForm />

            case 'pending':
                return <Requests exchanges={currentUser.pending_exchanges} type="pending" exchangeHeader="Incoming Requests" purchases={currentUser.pending_purchases} purchaseHeader="You are Requesting" history={history}/>

            case 'accepted':
                return <Requests exchanges={currentUser.exchanges} type="accepted" purchases={currentUser.purchases} exchangeHeader="Past Trades"  purchaseHeader="Past Purchases"  history={history} />
            
            default:
                return null
        }
    }

    chooseOthersItems = () => {
        switch (this.state.showWhat){
            case 'inventory':
                return (this.state.id ? <Items items={this.state.inventory} type="othersInventory" ownerId={this.state.id}/> : null)

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
            <div className="profile">
            <h1>Hi, {this.props.currentUser.username}</h1>
            <h3>Your Bio:</h3><p style={{backgroundColor: "white", color: "black", borderRadius: "25px", width: 'auto'}}>{this.props.currentUser.bio}</p>
            </div>
            <Select1 handleChange={this.changeShow}/>
            {this.chooseMyItems()}
            </React.Fragment>
        )
    }

    renderOtherUser = () => {
        return (
            <React.Fragment >
            <div className="profile">
            <h1>{this.state.username}'s Page</h1>
            <h3>Bio: </h3><p>{this.state.bio}</p>
            </div>
            <Select2 handleChange={this.changeShow} />
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
            <div className="profilePage" >
                <form onSubmit={this.handleSubmit} style={{float: "right"}}>
                    <Input disableUnderline={true} required={true} style={{backgroundColor: "white" , borderRadius: "40px 0 0 40px", paddingLeft: "10px"}}type="text" value={this.state.searchTerm} onChange={this.handleChange} placeholder="Search users by name" />
                    <Input  disableUnderline={true} style={{backgroundColor: 'blue', color: "white"}} type="submit"  value="Search" />
                </form>
            {this.props.currentUser ? this.renderCurrentUser() : this.renderOtherUser()}
            </div>
            )
    }
}

export default Profile