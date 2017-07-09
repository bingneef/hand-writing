import { SettingsActions } from '../actions/SettingsActions';

const initialState = {
  debugMode: true,
  datasetKey: 'numbers',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SettingsActions.DEBUG_MODE:
      return {
        ...state,
        debugMode: action.value
      };
    case SettingsActions.DATASET_KEY:
      return {
        ...state,
        datasetKey: action.value
      };
    default:
      return state;
  }
}
