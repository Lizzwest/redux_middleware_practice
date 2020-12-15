const { ADD_TO_WATCHLIST_MOVIES, REMOVE_FROM_WATCHLIST_MOVIES, ADD_TO_WATCHLIST_SHOWS, REMOVE_FROM_WATCHLIST_SHOWS, MARK_WATCHED} = require('../types') 

const initialState = {
    movies: [],
    shows: [],
}

const WatchlistReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_WATCHLIST_MOVIES:
            return { ...state }
        case REMOVE_FROM_WATCHLIST_MOVIES:
            return { ...state }
        case ADD_TO_WATCHLIST_SHOWS:
            return { ...state }
        case REMOVE_FROM_WATCHLIST_SHOWS:
            return { ...state }
        case MARK_WATCHED:
            return { ...state }
        default:
            return { ...state }
    }
}

export default WatchlistReducer