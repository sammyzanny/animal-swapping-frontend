import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemCard from '../components/ItemCard';
import { deleteItem, addInventory, removeInventory, requestTrade, addWishlist, removeWishlist} from '../actions/items';
import { Input } from '@material-ui/core';
import photo from '../button.png'
class Items extends Component {
  state = {
    page: 1,
    searchTerm: ''
  }

  

  pageForward = () => {
    const { items } = this.props;
    
    const pageMax = Math.ceil(items.length/20)
    if(this.state.page < pageMax){
      this.setState(prevState => {
        return {
          page: prevState.page + 1,
          searchTerm: prevState.searchTerm

        }
      })
    }
  }

  pageBackward = () => {
    if(this.state.page > 1){
      this.setState(prevState => {
        return {
          page: prevState.page - 1,
          searchTerm: prevState.searchTerm
        }
      })
    }
  }


  cards = () => {
    const { items,  addInventory, history, removeInventory, deleteItem, addWishlist, removeWishlist, type, requestTrade, ownerId} = this.props;
    const start = (this.state.page-1)*21, finish = this.state.page*21; 
    let prevCat, possiblyFilteredItems;
    if(this.state.searchTerm){
      possiblyFilteredItems = items.filter(item => item.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    } else {
      possiblyFilteredItems = items
    }
    return possiblyFilteredItems.slice(start, finish).map((item) => {
      return <ItemCard key={item.id}  item={item} history={history} addInventory={addInventory} requestTrade={requestTrade} removeInventory={removeInventory} deleteItem={deleteItem} type={type} addWishlist={addWishlist} removeWishlist={removeWishlist} ownerId={ownerId} />
    })
  }

  handleSearch = (event) => {
    event.persist();
    this.setState(prevState => ({searchTerm: event.target.value, page: prevState.page}))
  }
      

  render() {
    const btnUrl = "https://lh3.googleusercontent.com/proxy/mD1shnFM71XcxrBM7yCpJR7tn_gFj-bq1xYTGxUPKf8_H-fMDb2V9kDqjTKIsCDTbzbt4zK1IM64kiiR4wK9Xyvc2sk82qgB9UkKw1jefp6gTGV3bGiHkIupDoqMR1pOPaJkOVJUxElJB_HhMl3la1e5b-DkwIBHmALXKDvXe_1pe3kQ4wud"

    return (
      <div>
        <hr />
        <div className="itemsearch">
          <Input type="text" disableUnderline={true} value={this.state.searchTerm} onChange={this.handleSearch} style={{ backgroundColor: "white", borderRadius: "55px", marginLeft: "10px", marginRight: "auto", paddingLeft: "10px", width: "auto"}} placeholder="Filter Items By Name" />
        </div>
        <hr />
        <div className="container">
          <div className="row">
              {this.cards()}
          </div>
        </div>
        <hr />
        <div className="page-buttons">
           <input type="image" src={photo} onClick={this.pageBackward} style={{transform: "scaleX(-1)", marginRight: "50px"}}/><input type="image" src={photo} onClick={this.pageForward} />
        </div>
        <hr />
      </div>
    );
  }
}





export default connect(null, { deleteItem, addInventory, removeInventory, requestTrade, addWishlist, removeWishlist })(Items);