import React from 'react'

const Home = (props) => {

  

    const handleSubmit = (event) => {
        event.preventDefault();
        props.history.push(`/users/named/${event.target[0].value}`)
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <input type="text"   placeholder="Search other users by name" />
            <input type="submit" value="Search" />
        </form>
        <h1>Home Page</h1>
    </div>
}

export default Home