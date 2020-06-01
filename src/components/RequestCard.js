import React from 'react';

class RequestCard extends React.Component {


  respond = (response) => {
    const { request } = this.props
    const token = localStorage.getItem("token")

    const reqObj = {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          status: response,
          otherUserId: request.otherUser.id,
          itemId: request.item.id
      })
    
    }
    
    fetch(`http://localhost:3000/requests/${request.id}`, reqObj)
      .then(response => response.json())
      .then(data =>  {
            if (data.error){
                alert(data.error)
            } else if (response === "accepted"){
              this.props.acceptTrade(request)
            } else if ( response === "declined"){
                this.props.declineTrade(request.id)
            }
      });
  }

  
  

  render() {
    const { request, type, history } = this.props
    const status = type.split("-")[0]
    return (
    <div style={{marginLeft: "10px" , marginRight: "10px"}}>
      <div className="card card-inverse card-success card-primary mb-3 text-center" style={{backgroundColor: 'grey', width: '332px'}}>
        <div className="card-block">
          <blockquote className="card-blockItem">
            <h3>{request.item.name}</h3>
            <img src={request.item.img} alt="https://steamuserimages-a.akamaihd.net/ugc/901148415702899948/766B8EF2FEF58C28F33B79D61AB9F1F39F63C95D/" />
            <h2 onClick={() => {history.push(`/users/named/${request.otherUser.username}`)}}>{request.otherUser.username}</h2>
          </blockquote>
        </div>
        {status === "accepted" ? 
        <h2>Friend Code: {request.otherUser.contact}</h2> : 
        null }
        <div className="float-right"> 
            {type === "pending-exchange" ? <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
                <button 
                type="button" 
                onClick={() => this.respond("accepted")} 
                className="btn btn-primary"
                >
                Accept Trade Request
                </button>
                <button 
                type="button" 
                onClick={() => this.respond("declined")} 
                className="btn btn-secondary"
                >
                Decline Trade Request
                </button>
            </div> : null }
        </div>
      </div>
    </div>)
  }
}

export default RequestCard