import React from 'react'

function Progress({index,numQ,points,maxPossible,answer}) {
  return (
    <header className='progress'>
        <progress max={numQ} value={index}/>
        <p>Question {index+Number(answer!==null)}/{numQ}</p>
        <p>Points {points}/{maxPossible}</p>
    </header>
  )
}

export default Progress