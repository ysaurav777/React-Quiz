import React from 'react'

function Options({question,dispatch,answer}) {
  const hasans=answer!==null;
  return (
    <div className='options'>
        {question.options.map((option, index)=>(<button
        className={`btn btn-option ${index===answer ? "answer" : ""} 
        ${ hasans ? index===question.correctOption ? "correct" : "wrong":""} `}
        key={option} 
        disabled={hasans}
        onClick={()=>dispatch({type:'newAnswer',payload:index})}>{option}</button>))}
    </div>
  );
}

export default Options