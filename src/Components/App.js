import React, { useEffect, useReducer } from 'react'
import Header from './Header'
import Main from './Main'
import Loading from './Loader'
import Error from './Error'
import Start from './Start'
import Question from './Question'
import NextButton from './NextButton'
import Progress from './Progress'
import FinishScreen from './FinishScreen'
import Timer from './Timer'

const initialstate={
  questions:[],
  status:"loading",
  index:0,
  answer:null,
  points:0,
  highscore:0,
  timeremain:600,
};

function reducer(state,action) {
  switch(action.type) {
    case 'dataReceived':
      return {...state,questions:action.payload,status:'ready',};
    case 'dataFailed':
      return {...state,status:"error",};
    case 'start':
        return {...state,status:"active",};
    case 'newAnswer':
        const question=state.questions.at(state.index)
        return {...state,answer:action.payload,
          points:action.payload===question.correctOption?state.points+question.points:state.points
        };
    case 'nextQuestion':
      return {...state,index:state.index+1, answer:null}
    case 'finished':
      return {...state,status:"finished",highscore:state.highscore<state.points?state.points:state.highscore}
    case 'restart':
      return {...state,status:'active',index:0,answer:null,points:0}
    case 'tick':
      return {...state,timeremain:state.timeremain-1,
        status: state.timeremain===0?'finished':state.status //very important
      };
    default:
      throw new Error("NAN")
  }
}

const App = () => {

  const [{questions,status,index,answer,points,highscore,timeremain},dispatch]=useReducer(reducer,initialstate);
  const numQ=questions.length
  const maxPossible = questions.reduce((prev, cur) => prev + cur.points, 0);


  useEffect(function() {
    fetch("http://localhost:9000/questions")
    .then((res)=>res.json())
    .then((data)=>dispatch({type:'dataReceived',payload:data}))
    .catch((err)=>dispatch({type:'dataFailed'}));
  },[]);

  return (
    <div>
      <Header/>
      <Main>
        {status==='loading' && <Loading/>}
        {status==='error' && <Error/>}
        {status==='ready' && <Start numQ={numQ} dispatch={dispatch}/>}
        {status==='active' && (<>
        <Progress index={index} numQ={numQ} points={points} maxPossible={maxPossible} answer={answer}/>
        <Question question={questions[index]} dispatch={dispatch} answer={answer}/>
        <Timer timeremain={timeremain} dispatch={dispatch}/>
        <NextButton dispatch={dispatch} answer={answer} index={index} numQ={numQ}/></>)}
        {status==='finished' && <FinishScreen points={points} maxPossible={maxPossible} highscore={highscore} dispatch={dispatch}/>}
      </Main>
    </div>
  )
}

export default App;