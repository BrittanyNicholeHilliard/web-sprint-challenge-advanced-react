import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialX = 2
const initialY = 2


export default function AppFunctional(props) {

  const [message, setMessage] = useState(initialMessage)
  const [email, setEmail] = useState(initialEmail)
  const [steps, setSteps] = useState(initialSteps)
  const [index, setIndex] = useState(initialIndex)
  const [x, setX] = useState(initialX)
  const [y, setY] = useState(initialY)
  const [response, setResponse] = useState({})

  
  useEffect(() => {
    console.log('rendered')
      }, [])

  
  function moveLeft() {
    if (index == 1 || index == 2 || index == 4 || index == 5 
      ||index == 7 || index == 8) {
      setIndex(index - 1)
      setSteps(steps +1)
      setX(x -1)
      console.log(`moved left`)
  } else {
    setMessage("You can't go left")
       }
  } 

  function moveRight() {
    if  (index == 0 || index == 1 || index == 3 ||
      index == 4 || index == 6 || index == 7) {
        setIndex(index +1)
        setSteps(steps+1)
        setX(x+1)
   console.log(`moved right`)
  }else {  
    setMessage(`You can't go right`)
}
  }

  function moveUp() {
    if  (index == 3 || index == 4 || index == 5 ||
      index == 6 || index == 7 || index == 8) {
        setIndex(index-3)
        setSteps(steps+1)
        setY(y-1)
        console.log('moved up')
  } else {
    setMessage(`You can't go up`)
  }
}

  function moveDown(){
    if (index == 0 || index == 1 || index == 2 ||
      index == 3 || index == 4 || index == 5) {
        setIndex(index+3)
        setSteps(steps+1)
        setY(y+1)
        console.log('moved down')
  } else {
    setMessage(`You can't go down`)
  }
}

  function reset() {
   setMessage(initialMessage)
   setEmail(initialEmail)
   setSteps(initialSteps)
   setIndex(initialIndex)
   setX(initialX)
   setY(initialY)
   console.log('reset initialized')
  }


  function onChange(evt) {
    setEmail(evt.target.value)
    console.log(email)
  }

  function onSubmit() {
    debugger
    axios.post(`http://localhost:9000/api/result`, { "x": x , "y": y, "steps": steps, "email": email })
    .then((res)=> {
      setResponse(res)
      console.log(response)
     }).catch((err) => console.log(err))
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({x}, {y})</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => {moveLeft()}}>LEFT</button>
        <button id="up" onClick={() => {moveUp()}}>UP</button>
        <button id="right"onClick={() => {moveRight()}}>RIGHT</button>
        <button id="down" onClick={() => {moveDown()}}>DOWN</button>
        <button id="reset" onClick={()=>{reset()}}>reset</button>
      </div>
      <form onSubmit={()=> {onSubmit()}}>
        <input id="email" type="email" placeholder="type email" onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )

}
