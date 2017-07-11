import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from '../axios'
import '../stylesheets/views/classify.sass';
import DrawCanvas from './components/DrawCanvas'
import { calcValues } from '../helpers/processImage'
import constants from '../constants'

class Classify extends Component {
  constructor (props) {
    super(props)

    this.classify = this.classify.bind(this)

    this.state = {
      prediction: null,
    }
  }

  classify (ctx) {
    this.setState({prediction: null})

    const values = calcValues(ctx, {debug: this.props.debugMode})

    axios.get(`/classify?key=${this.props.datasetKey}&values=${values.join(',')}`)
      .then((response) => {
        this.setState({
          prediction: response.data.response
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="app-classify">
        <DrawCanvas onDrawEnd={this.classify}/>
        { this.state.prediction &&
          <h1 className="app-classify-overlay-text">Prediction: { this.state.prediction }</h1>
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

export default connect(mapStateToProps)(Classify);


