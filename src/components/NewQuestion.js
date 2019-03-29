import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import '../Css/newQuestions.css'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false,
  }

  handleChange = (event, optionIndex)=> {
    const text = event.target.value;

    this.setState( (previousState)=> {
      return optionIndex === 1
        ? { ...previousState, 'optionOne': text }
        : { ...previousState, 'optionTwo': text };
    });
  }

  handleSubmit =(event)=> {
    event.preventDefault();

    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;
    dispatch(handleAddQuestion(optionOne, optionTwo));

    this.setState( (previousState)=> {
      return {
        ...previousState,
        toHome: true,
      };
    })
  }

  render() {
    const { optionOne, optionTwo, toHome } = this.state;
    const { authedUser, users } = this.props;    

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div className="jumbotron jumbo-height">
        <div className="container">
        <h1 className="display-3"><strong>New Questions </strong></h1>
        <p className="lead">Would You Rather...</p>
         <img src={`/${users[authedUser].avatarURL}`} alt={`Avatar of ${authedUser}`} 
              className="rounded-circle img-size left"/>
          
          <div className="input-group input-group-lg">
           <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-lg">OptionOne</span>
             </div>
              <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
              value={optionOne} onChange={(event) => this.handleChange(event, 1)}/>
               </div>
                  <h3>OR</h3>
                  <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                       <span className="input-group-text" id="inputGroup-sizing-lg" >optionTwo</span>
                        </div>
                          <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" 
                             value={optionTwo} onChange={(event) => this.handleChange(event, 2)}/>
                           </div>
                            <hr/>
                            <button type="button" className="btn btn-primary left" onClick={(event) => this.handleSubmit(event)} >Submit</button>

           
           
               </div>
               
            </div>
            
    );
  }
}

const mapStateToProps=({ authedUser, users })=> {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(NewQuestion)