import React from 'react'

const Home = (props) => {

  

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     props.history.push(`/users/named/${event.target[0].value}`)
    // }

    return <div className="homepage">
        {/* <form onSubmit={handleSubmit} style={{float: "right"}}>
            <input type="text"   placeholder="Search other users by name" />
            <input type="submit" value="Search" />
        </form> */}
        <h1>Welcome to Animal Swapping, a community trading platform for Animal Crossing New Horizons.</h1><br/>
        <ol>
        <li> To begin, start by making an account. Your bio is for anything you'd like to share with potential traders, contact info is what you'll share when you agree to trade.</li>
        <li> Once you've created an account the first thing you'll want to do is look up every item (in items tab) you are willing to trade and add it to your inventory.</li>
        <li> Next, look up any items you like to trade for and put them on your wishlist. To see if anyone is currently offering an item, click the search for users button,
             additionally filter for only users you have something to offer in return by checking the mutual trade checkbox. </li>
        <li> You may also look other users up by username in the search bar on your profile page. When visiting a user's page, find the item you are looking for and request a purchase.</li>
        <li> Check to see that your request show's up in Your Profile under the Pending Requests option. Incoming Requests will show up here as well. </li>
        <li> Once an incoming/outgoing request has been accepted it will show up under the Accepted Requests Option.
             This is were you will be provided the contact info for the person you wish to trade with.</li>
        </ol>
        <h2>Happy Trading!</h2>
    </div>
}

export default Home