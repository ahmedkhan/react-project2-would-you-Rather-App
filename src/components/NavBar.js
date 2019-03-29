import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
  

const NavBar =(props)=>{
     const { authedUser, users } = props

  const avatar = authedUser ? users[authedUser].avatarURL : 'placeholder.jpg';
  
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
           <NavLink className="navbar-brand" to="#"><b>Would You Rather...</b></NavLink>
             <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
               <li className="nav-item active">
            <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
              </li>
               <li className="nav-item">
            <NavLink className="nav-link" to="/add">New Question</NavLink>
               </li>         
                <li className="nav-item">
               <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
                 </li> 
                 </ul>
                 <form className="form-inline my-2 my-lg-0">
                   <nav className="navbar navbar-light bg-light">
            <span className="navbar-text">Hello, <b>{authedUser}</b></span>
            </nav>
           <img src={avatar} alt={`Avatar of ${authedUser}`} className='d-inline-block align-top mr-sm-2' width="40" height="40"/>
      
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">LogOut</button>
    </form>
    </div>  
</nav>
    )

}

const mapStatetoProps =({ authedUser, users }) =>{
     return {
    authedUser,
    users
  };
}

export default connect(mapStatetoProps, null, null, { pure: false })(NavBar)