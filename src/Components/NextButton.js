import React from 'react'

function NextButton({dispatch,answer,index,numQ}) {
  if (answer===null) return null
  if (index<numQ-1) return (
    <div>
        <button className='btn btn-ui' onClick={()=>dispatch({type:'nextQuestion'})}>Next</button>
    </div>
  )
  if (index===numQ-1) return (
    <div>
        <button className='btn btn-ui' onClick={()=>dispatch({type:'finished'})}>Next</button>
    </div>
  )
}

export default NextButton