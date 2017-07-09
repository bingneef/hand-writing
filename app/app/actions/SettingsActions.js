const SettingsActions = {
  DATASET_KEY: 'DATASET_KEY',
  DEBUG_MODE: 'DEBUG_MODE'
};

const setDatasetKey = (data) => {
  const obj = {
    type: SettingsActions.DATASET_KEY,
    value: data
  }
  return obj
}

const setDebugMode = (data) => {
  const obj = {
    type: SettingsActions.DEBUG_MODE,
    value: data
  }
  return obj
}

export { SettingsActions, setDatasetKey, setDebugMode }
