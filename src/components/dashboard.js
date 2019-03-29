import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Questions';
import '../Css/dashboard.css';

class Dashboard extends Component {
  state = {
    showAnswered: false,
  }

  handleFilterClicked = (answered)=> {
    this.setState({
      showAnswered: answered
    })
  }

  render() {
    const { showAnswered } = this.state;
    const { authedUser, questions } = this.props;
    const questionsArray = Object.keys(questions).map((key) => questions[key]);
    const filteredQuestions = questionsArray.filter((question)=> {
      const contains = (
        question.optionOne.votes.indexOf(authedUser) > -1 ||
        question.optionTwo.votes.indexOf(authedUser) > -1
      );
      return showAnswered ? contains : !contains;
    });
    const sortedQuestions = filteredQuestions.sort((a, b) => b.timestamp - a.timestamp);

    return (
       <div className="jumbotron">
        <h3 className="display-4">Dashboard</h3>
         <p className="lead">To see Answered & Unanswered Question:</p>
         <div className='btn-group'>
         <button type="button" className="btn btn-primary" 
                 onClick={(event) => this.handleFilterClicked(false)}>Unanswered</button>
         <button type="button" className="btn btn-primary" 
                 onClick={(event) => this.handleFilterClicked(true)}>Answered</button>
         </div>

         <div className='question-list'>
          {sortedQuestions.map((question) => (
            <span key={question.id}>
              <hr className="my-4"/>
              <Question question={question} />
            </span>
          ))}
        </div>           
          </div>
    );
  }
}

const mapStateToProps=({ authedUser, questions, users })=> {
  return {
    authedUser,
    questions,
    users,
  };
}

export default connect(mapStateToProps)(Dashboard)