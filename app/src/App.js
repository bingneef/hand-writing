import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      prediction: null,
      randomTrainingValue: this.generateRandomValue(),
      mode: 'classify',
    }
  }

  drawStart (e) {
    this.down = true
    e.target.X = e.pageX
    e.target.Y = e.pageY
    e.target.color = 'black'
    this.clearCanvas()
  }

  drawMove (e) {
    e.target.style.cursor = 'pointer'
    if(this.down) {
      this.ctx.beginPath()
      this.ctx.moveTo(e.target.X, e.target.Y)
      this.ctx.lineCap = 'round'
      this.ctx.lineWidth = 20
      this.ctx.lineTo(e.pageX , e.pageY )
      this.ctx.strokeStyle = this.color
      this.ctx.stroke()

      e.target.X = e.pageX
      e.target.Y = e.pageY
    }
  }

  drawEnd () {
    this.down = false
    if (this.state.mode === 'training') {
      this.train()
    } else {
      this.classify()
    }
  }

  initCanvas () {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.clearCanvas()

    this.canvas.addEventListener('mousedown', this.drawStart.bind(this))
    this.canvas.addEventListener('mousemove', this.drawMove.bind(this))
    this.canvas.addEventListener('mouseup', this.drawEnd.bind(this))
  }

  clearCanvas () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle="white";
    this.ctx.fillRect(0,0,320,320);
  }

  componentDidMount () {
    this.initCanvas()
  }

  calculateValues () {
    let scores = []
    const blockSize = 40
    const width = blockSize
    const height = blockSize

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let sum = [0,0,0]

        let x_start = j * blockSize
        let y_start = i * blockSize

        let imgData = this.ctx.getImageData(x_start, y_start, width, height);
        for (let k = 0; k < imgData.data.length; k += 4) {
          sum[0] += imgData.data[k]
          sum[1] += imgData.data[k + 1]
          sum[2] += imgData.data[k + 2]
        }

        let totalSum = (0.3 * sum[0] + 0.59 * sum[1] + 0.11 * sum[2]) / 255
        let greyScore = 16 - Math.round(totalSum / (imgData.data.length / 4) * 16)
        scores.push(greyScore)
      }
    }

    return scores
  }

  classify () {
    const values = this.calculateValues()

    axios.get(`http://localhost:5000/classify?values=${values.join(',')}`)
      .then((response) => {
        this.setState({
          prediction: response.data.response
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  generateRandomValue () {
    return Math.floor(Math.random() * 10)
  }

  train () {
    const values = this.calculateValues()

    axios.get(`http://localhost:5000/train?result=${this.state.randomTrainingValue}&values=${values.join(',')}`)
      .then((response) => {
        this.setState({randomTrainingValue: this.generateRandomValue()})
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="app-canvas">
        <canvas id="canvas" width="320" height="320" />
        {
          this.state.mode === 'training' ? (
            <h1>{ this.state.randomTrainingValue }</h1>
          ) : (
            <h1>Prediction: { this.state.prediction }</h1>
          )
        }
      </div>
    );
  }
}

export default App;
