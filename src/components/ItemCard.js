import React from 'react';

class ItemCard extends React.Component {

  searchUsers = () =>{
    const {history, item} = this.props
    history.push(`/users/with/${item.name}`)
  }

  addInventory = () => {
    const { item } = this.props
    const token = localStorage.getItem("token")

    const reqObj = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: item.id
      })
    }
    
    fetch(`http://localhost:3000/sales`, reqObj)
      .then(response => response.json())
      .then(sale =>  {
        this.props.addInventory(item)
      });
  }

  addWishlist = () => {
    const { item } = this.props
    const token = localStorage.getItem("token")

    const reqObj = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: item.id
      })
    }
    
    fetch(`http://localhost:3000/wishes`, reqObj)
      .then(response => response.json())
      .then(wish =>  {
        this.props.addWishlist(item)
      });
  }

  removeWishlist = () => {
    const { wishId } = this.props.item
    const token = localStorage.getItem("token")

    const reqObj = {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }

    }
    
    fetch(`http://localhost:3000/wishes/${wishId}`, reqObj)
      .then(response => response.json())
      .then(wish =>  {
        this.props.removeWishlist(wishId)
      })
  }

  removeInventory = () => {
    const { saleId } = this.props.item
    const token = localStorage.getItem("token")

    const reqObj = {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }

    }
    
    fetch(`http://localhost:3000/sales/${saleId}`, reqObj)
      .then(response => response.json())
      .then(items =>  {
        this.props.removeInventory(saleId)
      })
  }

  deleteItem = () => {
    const { id } = this.props.item
    const token = localStorage.getItem("token")

    const reqObj = {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }

    }
    
    fetch(`http://localhost:3000/items/${id}`, reqObj)
      .then(response => response.json())
      .then(items =>  {
        this.props.deleteItem(id)
      })
  }

  requestTrade = () => {
    const { item, ownerId } = this.props
    const token = localStorage.getItem("token")

    const reqObj = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          itemId: item.id,
          sellerId: ownerId
      })
    }
    
    fetch(`http://localhost:3000/requests`, reqObj)
      .then(response => response.json())
      .then(request =>  {
        this.props.requestTrade(request)
      });
  }

  
  renderButtons = () => {
    const { type } = this.props
    switch(type){
      case "myInventory":
        return (
          <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <button 
              type="button" 
              onClick={this.removeInventory} 
              className="btn btn-secondary"
            >
              Remove Inventory
            </button>
          </div>)

      case 'myWishlist':
        return (
          <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <button 
              type="button" 
              onClick={this.removeWishlist} 
              className="btn btn-secondary"
            >
              Remove Wishlist
            </button>
          </div>)
      case 'myCustoms':
        return (
          <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
            <button 
              type="button" 
              onClick={this.deleteItem}
              className="btn btn-danger"
            >
            <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )

      case 'othersInventory':

        return (
          <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
            <button 
              type="button" 
              onClick={this.requestTrade} 
              className="btn btn-primary"
            >
              Request Purchase
            </button>
          </div>)
          
     
    case 'items':
      return (
        <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <button 
            type="button" 
            onClick={this.searchUsers} 
            className="btn btn-primary"
          >
          Search Users
          </button>
          <button 
          type="button" 
          onClick={this.addInventory} 
          className="btn btn-secondary"
          >
          Add to Inventory
          </button> 
          <button 
          type="button" 
          onClick={this.addWishlist} 
          className="btn btn-secondary"
          >
          Add to Wishlist
          </button> 
        </div>)

        default:
          return null

    }
  }

  render() {
    const { item } = this.props

    return (
    <div style={{marginLeft: "10px" , marginRight: "10px"}}>
      <div className="card card-inverse card-success card-primary mb-3 text-center" style={{backgroundColor: 'grey', width: "332px"}}>
        <div className="card-block">
          <blockquote className="card-blockItem">
            <h3>{item.name}</h3>
            <img src={item.img} alt="https://steamuserimages-a.akamaihd.net/ugc/901148415702899948/766B8EF2FEF58C28F33B79D61AB9F1F39F63C95D/" />
            <h4>{item.category}</h4>
          </blockquote>
        </div>
        <div className="float-right"> 
          {this.renderButtons()}
        </div>
      </div>
    </div>)
  }
}

export default ItemCard;