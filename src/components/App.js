import React, { Component,Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions';
import ProtectedRoute from '../utils/ProtectedRoute';
import Nav from './NavBar';
import Login from './login';
import Dashboard from './dashboard';
import Leaderboard from './leaderboard';
import QuestionPage from './QuestionPage';
import NewQuestion from './NewQuestion';
import NotFound from './NotFound';


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }


  render() {
     const { loggedIn } = this.props;

    return (
      <Router>
        <Fragment>
         <div className='center'>
          <Nav/>
           <div>
            <Switch>
            <ProtectedRoute path='/' exact component={Dashboard} loggedIn={loggedIn} />
            <ProtectedRoute path='/leaderboard' exact component={Leaderboard} loggedIn={loggedIn} />
            <ProtectedRoute path='/add' exact component={NewQuestion} loggedIn={loggedIn} />
            <ProtectedRoute path='/questions/:id' exact component={QuestionPage} loggedIn={loggedIn} />
            <Route path='/login' exact component={Login} />
            <Route component={NotFound} />
            </Switch>
           </div>
         </div>
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps=({ authedUser })=> {
  return {
    loggedIn: authedUser !== null,
  };
}

export default connect(mapStateToProps)(App);


