import React from 'react';
import { Redirect ,Link} from 'react-router-dom';
import { connect } from 'react-redux';
import Question from './Questions';
import '../Css/questions.css'

const QuestionPage =(props)=> {
  const { id, questions } = props;
  const question = questions[id];

  if(question == null) {
    return <Redirect from='*' to='/not-found' />
  }
  

  return (


    <div class="jumbotron">
  <h1 class="display-4">Result</h1>
  {
        
        question &&
        <Question question={question} />        
      }      
  <hr class="my-4"/>
  <p>Answer in percentage.</p>
  <Link class="btn btn-primary btn-lg" href="#" role="button" to ="/">Go Back</Link>
   </div>
    
  );
}

const mapStateToProps=({ questions }, props)=> {
  const { id } = props.match.params;
  
  return {
    id,
    questions,
  };
}

export default connect(mapStateToProps)(QuestionPage);