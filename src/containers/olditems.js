import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemCard from '../components/ItemCard';
import { deleteItem, addInventory, removeInventory, requestTrade, addWishlist, removeWishlist} from '../actions/items';
import { Input } from '@material-ui/core';

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
    console.log("pfi",possiblyFilteredItems)
    console.log(items)
    return possiblyFilteredItems.slice(start, finish).map((item) => {
      if(prevCat !== item.category){
        const cates = item.category.split(" ")
        if(prevCat && (prevCat.split(" ")[0] === cates[0])){
          prevCat = item.category        
          return <React.Fragment>
            <h4>
              {cates[1]}
            </h4>
            <ItemCard key={item.id}  item={item} history={history} addInventory={addInventory} requestTrade={requestTrade} removeInventory={removeInventory} deleteItem={deleteItem} type={type} addWishlist={addWishlist} removeWishlist={removeWishlist} ownerId={ownerId} />
          </React.Fragment>
        }
        prevCat = item.category        
        return <React.Fragment>
            {cates[1] ? <React.Fragment><h2>{cates[0]}</h2><h4>{cates[1]}</h4></React.Fragment> : <h2>{cates[0]}</h2>}
            <br/><br/><br/>
            <ItemCard key={item.id}  item={item} history={history} addInventory={addInventory} requestTrade={requestTrade} removeInventory={removeInventory} deleteItem={deleteItem} type={type} addWishlist={addWishlist} removeWishlist={removeWishlist} ownerId={ownerId} />
        </React.Fragment>
      } 
      prevCat = item.category
      return <ItemCard key={item.id}  item={item} history={history} addInventory={addInventory} requestTrade={requestTrade} removeInventory={removeInventory} deleteItem={deleteItem} type={type} addWishlist={addWishlist} removeWishlist={removeWishlist} ownerId={ownerId} />
    })
  }

  handleSearch = (event) => {
    event.persist();
    this.setState(prevState => ({searchTerm: event.target.value, page: prevState.page}))
  }
      

  render() {

    return (
      <div>
        <hr />
        <div className="input-field col s4 offset-s4">
          <Input type="text" value={this.state.searchTerm} onChange={this.handleSearch} style={{ backgroundColor: "grey", borderRadius: "55px", marginLeft: "10px", marginRight: "auto", paddingLeft: "10px"}} placeholder="Filter Items By Name" />
        </div>
        <hr />
        <div className="container">
          <div className="row">
              {this.cards()}
            </div>
        </div>
        <div className="page-buttons">
          <button onClick={this.pageBackward} >Back</button><button onClick={this.pageForward}>Next</button>
        </div>
      </div>
    );
  }
}





export default connect(null, { deleteItem, addInventory, removeInventory, requestTrade, addWishlist, removeWishlist })(Items);