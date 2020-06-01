import React, { Component } from 'react';
import RequestCard from '../components/RequestCard';
import {acceptTrade, declineTrade} from '../actions/items'
import {connect} from 'react-redux'
import photo from '../button.png'
class Requests extends Component {
  state = {
    exchangePage: 1,
    purchasePage: 1
  }
  
 
  
  exchangeForward = () => {
    const { exchangePage } = this.state;
    const { exchanges } = this.props
    
    const pageMax = Math.ceil(exchanges.length/20)
    if(exchangePage < pageMax){
      this.setState(prevState => {
        return {
          exchangePage: prevState.exchangePage + 1,
          purchasePage: prevState.purchasePage
        }
      })
    }
  }

  exchangeBackward = () => {
    if(this.state.exchangePage > 1){
      this.setState(prevState => {
        return {
          exchangePage: prevState.exchangePage - 1,
          purchasePage: prevState.purchasePage
        }
      })
    }
  }
  
  purchaseForward = () => {
    const { purchasePage } = this.state;
    const { purchases } = this.props
    
    const pageMax = Math.ceil(purchases.length/20)
    if(purchasePage < pageMax){
      this.setState(prevState => {
        return {
            exchangePage: prevState.exchangePage,
            purchasePage: prevState.purchasePage + 1
        }
      })
    }
  }

  purchaseBackward = () => {
    if(this.state.purchasePage > 1){
      this.setState(prevState => {
        return {
          exchangePage: prevState.exchangePage,
          purchasePage: prevState.purchasePage - 1
        }
      })
    }
  }
  
  exchangeCards = () => { 
    const { exchangePage } = this.state;
    const { exchanges, type, history, acceptTrade, declineTrade } = this.props
    const start = (exchangePage-1)*21, finish = exchangePage*21; 
    return exchanges.slice(start, finish).map((request) => {
     return <RequestCard key={request.id} request={request} acceptTrade={acceptTrade} declineTrade={declineTrade} type={type+"-exchange"} history={history} />
    })
  }

  purchaseCards = () => { 
    const { purchasePage } = this.state;
    const { purchases, type, history } = this.props;
    const start = (purchasePage-1)*21, finish = purchasePage*21; 
    return purchases.slice(start, finish).map((request) => {
     return <RequestCard key={request.id} request={request} history={history} type={type+"-purchase"}/>
    })
  }


  render() {

    return (
     <React.Fragment>
        <div>
            <hr />
            <div className="row justify-content-center">
            <h2>{this.props.exchangeHeader}</h2>
            </div>
            <hr />
            <div className="container">
            <div className="row">
                {this.exchangeCards()}
            </div>
            </div>
            <div className="page-buttons">
           <input type="image" src={photo} onClick={this.exchangeBackward} style={{transform: "scaleX(-1)", marginRight: "50px"}}/><input type="image" src={photo} onClick={this.exchangeForward} />
        </div>
        </div>
        <div>
        <hr />
        <div className="row justify-content-center">
            <h2>{this.props.purchaseHeader}</h2>
        </div>
        <hr />
        <div className="container">
            <div className="row">
                {this.purchaseCards()}
            </div>
        </div>
        <div className="page-buttons">
           <input type="image" src={photo} onClick={this.purchaseBackward} style={{transform: "scaleX(-1)", marginRight: "50px"}}/><input type="image" src={photo} onClick={this.purchaseForward} />
        </div>
        </div>
     </React.Fragment>
    );
  }
}


export default connect(null, { acceptTrade, declineTrade })(Requests);