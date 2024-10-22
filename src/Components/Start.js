import React from 'react'

function Start({numQ,dispatch}) {
  return (
    <div className='start'>
        <h2>Welcome to the React Quiz!</h2>
        <h3>{numQ} questions to test your react master</h3>
        <button className='btn btn-ui' onClick={()=>dispatch({type:'start'})}>Let's Start</button>
    </div>
  )
}

export default Start