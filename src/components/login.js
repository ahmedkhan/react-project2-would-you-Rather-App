import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser, clearAuthedUser } from '../actions/authedUser';
import '../Css/login.css';

class Login extends Component {
  state = {
    userId: null,
    toHome: false,
  }

  handleSelectionChanged = (event) =>{
    const userId = event.target.value;

    this.setState( (previousState) =>{
      return {
        ...previousState,
        userId,
      };
    });
  }

  handleLogin = (event)=> {
    const { userId } = this.state;
    const { dispatch } = this.props;

    dispatch(setAuthedUser(userId));

    this.setState( (previousState)=> {
      return {
        ...previousState,
        toHome: true,
      };
    });
  }

  componentDidMount() {
    this.props.dispatch(clearAuthedUser())
  }

  render() {
   
    const { userId, toHome } = this.state;
    const { history, users } = this.props;
    const selected = userId ? userId : -1;
   
    if(toHome) {
      const redirect = history.location.state;
      if (redirect != null) {
        return <Redirect to={redirect} push={true} />
      }
      return <Redirect to='/' />
    }

    return (
      <div className="container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card card-signin my-5">
          <div className="card-body">
            <h5 className="card-title text-center">Sign In</h5>
            <form className="form-signin">
              <div className="form-label-group center">              
                <select value={selected} 
                        onChange={(event) => this.handleSelectionChanged(event)}
                        className="custom-select custom-select-lg mb-3">

              <option value={-1} disabled>Select user...</option>
             
                   {Object.keys(users).map(function(key) {
                    return (
                 <option value={users[key].id} key={key}>{users[key].id}</option>
               );
              })}
            </select>
                
              </div>  

              <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit"
                       onClick={(event) => this.handleLogin(event)} disabled={userId === null}>
                       Sign in</button>
              </form>
        </div>
      </div>
    </div>
  </div>
  </div>
    );
  }
}

const mapStateToProps =({ users })=> {
  return {
    users,
  };
}

export default withRouter(connect(mapStateToProps)(Login))





 