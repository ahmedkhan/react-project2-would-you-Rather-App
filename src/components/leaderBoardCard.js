import React from 'react';



const LeaderBoardCard =({userDetail})=>{
    return(
        <div className="card mb-3" style={{width: '540px'}}>
         <div className="row no-gutters">
          <div className="col-md-4">
           <img src={userDetail.avatarURL} className="card-img" alt={`Avatar of ${userDetail.name}`}/>
            </div>
             <div className="col-md-8">
              <div className="card-body">
               <h5 className="card-title"><u>{userDetail.name}</u></h5>
                <p className="card-text">This user Asked : <b>{userDetail.questions.length}</b></p>
                 <p className="card-text">And Answered : <b>{Object.keys(userDetail.answers).length}</b></p>
           </div>
         </div>
       </div>
     </div>
    )
}

export default LeaderBoardCard;