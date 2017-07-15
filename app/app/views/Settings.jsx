import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from '../axios'
import '../stylesheets/views/settings.sass';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { setDatasetKey, setDebugMode } from '../actions/SettingsActions'

class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      fitting: false,
      datasetKey: 'numbers',
    }
  }

  fitSet () {
    this.setState({fitting: true})
    axios.get(`fit`)
      .then((response) => {
        setTimeout(() => {
          this.setState({fitting: false})
        }, 1000)
      })
      .catch((error) => {
        this.setState({fitting: false})
        alert(error);
      })
  }

  handleDatasetKeyChange = (event, index, value) => {
    this.props.dispatch(setDatasetKey(value))
  }

  handleDebugModeChange = (event, value) => {
    this.props.dispatch(setDebugMode(value))
  }

  render() {
    return (
      <div className="app-settings">
        <div>
          <SelectField
            floatingLabelText="Dataset"
            value={this.props.datasetKey}
            onChange={this.handleDatasetKeyChange}
            className="app-settings-select-field"
          >
            <MenuItem value={'numbers'} primaryText="Numbers" />
            <MenuItem value={'shapes'} primaryText="Shapes" />
            <MenuItem value={'letters'} primaryText="Letters" />
          </SelectField>
          <Toggle
            label="Debug"
            defaultToggled={this.props.debugMode}
            onToggle={this.handleDebugModeChange}
            className="app-settings-toggle"
          />
          <Divider />
          <RaisedButton
            disabled={this.state.fitting}
            label="Fit datasets"
            onClick={this.fitSet.bind(this)}
            primary={true}
            className="app-settings-raised-button"
          />
        </div>
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

export default connect(mapStateToProps)(Settings);
