import React from 'react';
import { connect } from 'react-redux';
import LeaderBoardCard from './leaderBoardCard';
import '../Css/leaderBoardCard.css';

const Leaderboard=(props)=>{
  const { users } = props;
  const userArray = Object.keys(users).map((key) => users[key]);
    // sort from most to least answered
    const sortedUserArray = userArray.sort((a, b) => {
    const sumA = Object.keys(a.answers).length + a.questions.length;
    const sumB = Object.keys(b.answers).length + b.questions.length;
    return sumB -sumA;
  })

  

  return (
    <div className="jumbotron">
    <h3 className='display-4'>Leaderboard</h3>
      <ol className='user-list'>
        {sortedUserArray.map((user) => (
          <div className="card-center" key={user.id}>
          <li key={user.id} >
            <LeaderBoardCard userDetail={user}/>
          </li>
          </div>
        ))}
      </ol>
    </div>
  );
}

const mapStateToProps=({ users })=> {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Leaderboard)