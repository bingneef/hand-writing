import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Router, Route, browserHistory, IndexRedirect } from 'react-router'

import Index from './views/Index';
import Classify from './views/Classify';
import Train from './views/Train';
import Settings from './views/Settings';

class Routes extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    if (!this.props.rehydrated) {
      return (
        <div />
      )
    }

    return (
      <Router history={ browserHistory }>
        <Route path='/' component={ Index } >
          <IndexRedirect to='classify' />
          <Route path='classify' component={ Classify } />
          <Route path='train' component={ Train } />
          <Route path='settings' component={ Settings } />
        </Route>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rehydrated: state.rehydrated.finished,
  }
};

Routes.propTypes = {
  rehydrated: PropTypes.bool
};

export default connect(mapStateToProps)(Routes);
