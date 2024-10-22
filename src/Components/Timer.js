import React, { useEffect } from 'react'

function Timer({dispatch,timeremain}) {
    const min=(Math.floor(timeremain/60));
    const sec=(timeremain%60);
    useEffect(function() {
        const id=setInterval(function() {
            dispatch({type:'tick'})
        },1000);
        return()=>clearInterval(id) //to be mentioned
    },[])
  return (
    <div className='timer'>
        {min<10 && '0'}{min}:{sec<10 && '0'}{sec}
    </div>
  )
}

export default Timer