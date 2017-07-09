import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../../stylesheets/views/components/canvas.sass';

class DrawCanvas extends Component {
  constructor (props) {
    super(props)

    this.state = {
      lineWidth: 0.1,
      canvasSize: 320,
    }
  }

  componentDidMount () {
    this.initCanvas()
  }

  drawStart (e) {
    this.down = true
    e.target.X = e.pageX - this.canvas.offsetLeft
    e.target.Y = e.pageY - this.canvas.offsetTop
    e.target.color = 'black'
    this.clearCanvas()
  }

  drawMove (e) {
    e.target.style.cursor = 'pointer'
    if(this.down) {
      this.ctx.beginPath()
      this.ctx.moveTo(e.target.X, e.target.Y)
      this.ctx.lineCap = 'round'
      this.ctx.lineWidth = this.state.canvasSize * this.state.lineWidth
      this.ctx.lineTo(e.pageX - this.canvas.offsetLeft, e.pageY  - this.canvas.offsetTop)
      this.ctx.strokeStyle = this.color
      this.ctx.globalAlpha = 1.0
      this.ctx.stroke()

      e.target.X = e.pageX - this.canvas.offsetLeft
      e.target.Y = e.pageY - this.canvas.offsetTop

      e.preventDefault()
      return false
    }
  }

  drawEnd () {
    this.down = false
    this.props.onDrawEnd(this.ctx)
  }

  initCanvas () {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.clearCanvas()

    this.canvas.addEventListener('mousedown', this.drawStart.bind(this))
    this.canvas.addEventListener('mousemove', this.drawMove.bind(this))
    this.canvas.addEventListener('mouseup', this.drawEnd.bind(this))
    this.canvas.addEventListener('touchstart', this.drawStart.bind(this))
    this.canvas.addEventListener('touchmove', this.drawMove.bind(this))
    this.canvas.addEventListener('touchend', this.drawEnd.bind(this))
  }

  clearCanvas () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render() {
    return (
      <div className="app-canvas">
        <canvas id="canvas" width={this.state.canvasSize} height={this.state.canvasSize} />
      </div>
    );
  }
}

const mapStateToProps = () => {
  return { }
};

export default connect(mapStateToProps)(DrawCanvas);


