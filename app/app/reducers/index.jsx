import { combineReducers } from 'redux';
import rehydrated from './rehydrated';
import settings from './settings';

export default function createReducers () {
  return combineReducers({ rehydrated, settings });
}
