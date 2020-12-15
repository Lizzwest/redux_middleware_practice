const { ADD_TO_WATCHLIST_MOVIES, REMOVE_FROM_WATCHLIST_MOVIES, ADD_TO_WATCHLIST_SHOWS, REMOVE_FROM_WATCHLIST_SHOWS, MARK_WATCHED} = require('../types') 

export const addToWatchlistMovies = (data) => (dispatch) => { console.log(data); dispatch({type: ADD_TO_WATCHLIST_MOVIES, payload: data})}

export const removeFromWatchlistMovies = (data) => (dispatch) => dispatch({type: REMOVE_FROM_WATCHLIST_MOVIES, payload: data})

export const addToWatchlistShows = (data) => (dispatch) => dispatch({type: ADD_TO_WATCHLIST_SHOWS, payload: data})

export const removeFromWatchlistShows = (data) => (dispatch) => dispatch({type: REMOVE_FROM_WATCHLIST_SHOWS, payload: data})

export const markWatched = (index) => (dispatch) => dispatch({type: MARK_WATCHED, payload: index})