export default (state = { finished: false }, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return {
        ...state,
        finished: true
      };
    default:
      return state;
  }
}
