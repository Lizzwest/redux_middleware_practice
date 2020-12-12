const { GET_ALL_MOVIE_GENRES, GET_ALL_MOVIES_BY_GENRE, GET_TRENDING_MOVIES, MOVIE_SEARCH, GET_SEARCH_MOVIES } = require('../types')

const initialState = {
    genres: [],
    genre: '',
    movies: [],
    trending: [],
    search: '',
    movie: null
}

const MovieReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_MOVIE_GENRES:
            return { ...state, genres: action.payload }
        case GET_TRENDING_MOVIES:
            return { ...state, trending: action.payload}
        case MOVIE_SEARCH:
            return { ...state, search: action.payload}
        case GET_ALL_MOVIES_BY_GENRE:
            return { ...state, movies: action.payload.movies, genre: action.payload.name}
        case GET_SEARCH_MOVIES:
            return { ...state, movies: action.payload.filter(m => m.poster_path!==null), genre: state.search, search: ''}
        default:
            return { ...state }
    }
}

export default MovieReducer