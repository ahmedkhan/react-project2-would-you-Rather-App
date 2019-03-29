import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/questions';
import '../Css/questions.css'

class Question extends Component {
  handleOptionClicked =(option)=> {   
    const { answerQuestion, authedUser, question } = this.props;
    const answer = option === 1 ? 'optionOne' : 'optionTwo';
    answerQuestion(authedUser, question.id, answer);
  }

  render() {
    const { authedUser, question, users } = this.props;
    const answers = Object.keys(users[authedUser].answers);
    const answered = answers.indexOf(question.id) > -1 ? true : false;
    const votesOptionOne = question.optionOne.votes.length;
    const votesOptionTwo = question.optionTwo.votes.length;
    const votesTotal = votesOptionOne + votesOptionTwo;
    const percentVotesOptionOne = (votesOptionOne / votesTotal).toFixed(2) * 100;
    const percentVotesOptionTwo = (votesOptionTwo / votesTotal).toFixed(2) * 100;

    return (
      <Link to={`/questions/${question.id}`} className='question'>
      <div className="card-center">
      <div className="card bg-light mb-3" style={{width: "40rem"}}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={`/${users[question.author].avatarURL}`} className="card-img" alt={`Avatar of ${question.author}`}/>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Would You Rather...</h5>            
            <p className={question.optionOne.votes.indexOf(authedUser) > -1 ? 'question-option-selected'
              : answered ? 'answered': ''} onClick={(event) => this.handleOptionClicked(1)}>{question.optionOne.text}... </p>
                  
              <span>OR</span>
            <p  className={question.optionTwo.votes.indexOf(authedUser) > -1 ? 'question-option-two question-option-selected'
              : answered ? 'question-option-two answered' : 'question-option-two'}
                onClick={(event) => this.handleOptionClicked(2)}>{question.optionTwo.text}...</p>

              {answered && <p className='card-text'><small className="text-muted">
                  Votes: {question.optionOne.votes.length} ({percentVotesOptionOne}%)
                  </small></p>}



                {answered && <p className='card-text'><small className="text-muted">
                  Votes: {question.optionTwo.votes.length} ({percentVotesOptionTwo}%)
                  </small></p>}                  
          </div>
        </div>
      </div>
    </div>
    </div>
        
        
        
      </Link>
    );
  }
}

const mapStateToProps=({ authedUser, users })=> {  
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps, actions)(Question);