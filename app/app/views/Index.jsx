import React, { Component, Link } from 'react';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import '../stylesheets/views/index.sass';

import Classify from './Classify'
import Train from './Train'

const classifyIcon = <FontIcon className="material-icons">device_hub</FontIcon>;
const trainIcon = <FontIcon className="material-icons">center_focus_strong</FontIcon>;
const settingsIcon = <FontIcon className="material-icons">layers</FontIcon>;

class Index extends Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedIndex: 0
    }
  }

  render () {
    let selectedIndex = 0
    if (this.props.router.isActive('/train')) {
      selectedIndex = 1
    } else if (this.props.router.isActive('/settings')) {
      selectedIndex = 2
    }

    return (
      <div className='app'>
        <div className='app-content'>
          {
            this.props.children
          }
        </div>

        <BottomNavigation selectedIndex={selectedIndex}>
          <BottomNavigationItem
            label="Classify"
            icon={classifyIcon}
            onTouchTap={() => this.props.router.push('/classify')}
          />
          <BottomNavigationItem
            label="Train"
            icon={trainIcon}
            onTouchTap={() => this.props.router.push('/train')}
          />
          <BottomNavigationItem
            label="Settings"
            icon={settingsIcon}
            onTouchTap={() => this.props.router.push('/settings')}
          />
        </BottomNavigation>
      </div>
    )
  }
}

Index.propTypes = {
  children: PropTypes.object
};

const mapStateToProps = (state) => {
  return { }
};

export default connect(mapStateToProps)(Index);
