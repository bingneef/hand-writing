import { createStore, compose } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { persistStore, autoRehydrate } from 'redux-persist';
import combineReducers from './reducers';

const nextRootReducer = require('./reducers').default;

export default function configureStore (configurationCompleted) {
  const enhancer = composeWithDevTools(
    autoRehydrate()
  );

  const reducers = combineReducers();

  const store = createStore(reducers, enhancer);
  persistStore(store, () => {
    if (configurationCompleted) {
      configurationCompleted(store);
    }
  });

  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(nextRootReducer);
    });
  }

  // If you have other enhancers & middlewares
  // update the store after creating / changing to allow devTools to use them
  if (global.reduxNativeDevTools) {
    global.reduxNativeDevTools.updateStore(store);
  }

  return store;
}
