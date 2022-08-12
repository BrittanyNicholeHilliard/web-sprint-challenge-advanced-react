import React from 'react'
import axios from 'axios'
import e from 'cors'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
  x: 2, 
  y: 2
}

export default class AppClass extends React.Component {
  state = initialState;


  reset = () => {
    this.setState(initialState)
    console.log('Reset initialized')
  }

  moveLeft = () => {
    if (this.state.index == 1 || this.state.index == 2 || this.state.index == 4 ||
        this.state.index == 5 || this.state.index == 7 || this.state.index == 8) {
      this.setState({
        ...this.state, 
        index: this.state.index - 1,
        steps: this.state.steps +1,
        x: this.state.x -1
        })
      
      console.log(`moved left`)
    } else {
      this.setState({...this.state, message: "You can't go left"})
      }
  }


  moveRight = () => {
      if  (this.state.index == 0 || this.state.index == 1 || this.state.index == 3 ||
        this.state.index == 4 || this.state.index == 6 || this.state.index == 7) {
     this.setState({
      ...this.state, 
      index: this.state.index +1,
      steps: this.state.steps +1,
      x: this.state.x +1});
     console.log(`moved right`)
    }else {  
      this.setState({...this.state, message:`You can't go right`})
  }
  }


  moveUp = () => {
    if  (this.state.index == 3 || this.state.index == 4 || this.state.index == 5 ||
      this.state.index == 6 || this.state.index == 7 || this.state.index == 8) {
      this.setState({
        ...this.state, 
        index: this.state.index - 3,
        steps: this.state.steps +1,
        y: this.state.y-1
      })
      console.log(`moved up`)
    }else {this.setState({...this.state, message:`You can't go up`})
      }
  }
  

  moveDown = () => {
    if  (this.state.index == 0 || this.state.index == 1 || this.state.index == 2 ||
      this.state.index == 3 || this.state.index == 4 || this.state.index == 5) {
      this.setState({
        ...this.state, 
        index: this.state.index + 3,
        steps: this.state.steps +1, 
        y: this.state.y +1
      });
      console.log(`moved down`)
  
    } else {
      this.setState({...this.state, message:`You can't go down`})
    }
  } 



  onChange = (e) => {
    this.setState({
      ...this.state, 
      email: e.target.value
    })
    console.log(this.state)
  }

  onSubmit = () => {
    debugger
    axios.post('http://localhost:9000/api/result', { "x": this.state.x , "y": this.state.y, "steps": this.state.steps, "email": this.state.email })
    .then(res=> {
      console.log(res)
     }).catch(err => console.log(err))
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y})</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => {this.moveLeft()}}>LEFT</button>
          <button id="up" onClick={() => {this.moveUp()}}>UP</button>
          <button id="right" onClick={() => {this.moveRight()}}>RIGHT</button>
          <button id="down" onClick={() => {this.moveDown()}}>DOWN</button>
          <button id="reset" onClick={()=>{this.reset()}}>reset</button>
        </div>
        <form onSubmit={()=>{this.onSubmit()}}>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
