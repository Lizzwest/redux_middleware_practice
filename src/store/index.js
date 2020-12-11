import { createStore, combineReducers, applyMiddleware } from 'redux';
import MovieReducer from './reducers/MovieReducer';
import TVReducer from './reducers/TVReducer'
import WatchListReducer from './reducers/WatchListReducer'
import thunk from 'redux-thunk';

const store = createStore(
  combineReducers({
    movieState: MovieReducer,
    tvState: TVReducer,
    watchListState: WatchListReducer
  }),
  applyMiddleware(thunk)
);

export default store;
