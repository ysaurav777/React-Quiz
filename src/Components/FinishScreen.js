import React from 'react'

function FinishScreen({points,maxPossible,highscore,dispatch}) {

    const pointpercent=(points/maxPossible)*100

  return (
    <>
        <p className='result'>You have scored <strong>{points}</strong> out of {maxPossible} ({Math.ceil(pointpercent)}%)</p>
        <p className='highscore'>(Highest Score: {highscore})</p>
        <div>
            <button className='btn btn-ui' onClick={()=>dispatch({type:'restart'})}>Restart Quiz</button>
        </div>
    </>
  )
}

export default FinishScreen