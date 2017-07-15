import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from '../axios'
import '../stylesheets/views/train.sass';
import DrawCanvas from './components/DrawCanvas'
import { calcValues } from '../helpers/processImage'
import constants from '../constants'

class Train extends Component {
  constructor (props) {
    super(props)

    this.train = this.train.bind(this)

    this.state = {
      randomTrainingValue: null,
    }
  }

  componentDidMount () {
    this.setState({randomTrainingValue: this.generateRandomValue()})
  }

  generateRandomValue () {
    let options;
    switch (this.props.datasetKey) {
      case 'shapes':
        options = ['square', 'circle', 'triangle', 'line',]
        return options[Math.floor(Math.random() * options.length)]
      case 'letters':
        options = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',]
        return options[Math.floor(Math.random() * options.length)]
      default:
        return Math.floor(Math.random() * 10)
    }
  }

  train (ctx) {
    let result = this.state.randomTrainingValue
    this.setState({randomTrainingValue: null})
    const values = calcValues(ctx, { debug: this.props.debugMode })
    axios.get(`train?key=${this.props.datasetKey}&result=${result}&values=${values.join(',')}`)
      .then((response) => {
        this.setState({randomTrainingValue: this.generateRandomValue()})
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="app-train">
        <DrawCanvas onDrawEnd={ this.train }/>
        {
          this.state.randomTrainingValue !== null &&
          <h1 className="app-train-overlay-text">Draw: { this.state.randomTrainingValue }</h1>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    debugMode: state.settings.debugMode,
    datasetKey: state.settings.datasetKey,
  }
};

export default connect(mapStateToProps)(Train);


