import React from 'react';

const UserCard = (props) => {

    const visit = () => {
        props.history.push(`/profile/${user.username}`)
    }
  

  
    const { user} = props

    return (
    <div>
      <div className="card card-inverse card-success card-primary mb-3 text-center">
        <div className="card-block">
          <blockquote className="card-blockItem">
            <h3>{user.username}</h3>
            <p>{user.bio}</p>
          </blockquote>
        </div>
        <div className="float-right"> 
            <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
                <button onClick={visit} > View Profile </button>
            </div>
        </div>
      </div>
    </div>)
}

export default UserCard;