const { GET_ALL_MOVIE_GENRES, GET_ALL_MOVIES_BY_GENRE, GET_TRENDING_MOVIES, MOVIE_SEARCH, GET_SEARCH_MOVIES, GET_MOVIE_DETAILS, CLEAR_MOVIE } = require('../types')

const initialState = {
    genres: [],
    genre: '',
    movies: [],
    trending: [],
    querySearch: '',
    search: '',
    page: 1,
    pages: null,
    movieData: null
}

const MovieReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_MOVIE_GENRES:
            return { ...state, genres: action.payload }
        case GET_TRENDING_MOVIES:
            return { ...state, trending: action.payload}
        case MOVIE_SEARCH:
            return { ...state, querySearch: action.payload}
        case GET_ALL_MOVIES_BY_GENRE:
            return { ...state, movies: action.payload.movies.results, genre: action.payload.name, page: action.payload.page, pages: action.payload.movies.total_pages, search: ''}
        case GET_SEARCH_MOVIES:
            return { ...state, movies: action.payload ? action.payload.filter(m => m.poster_path!==null) : [], search: state.querySearch, genre: ''}
        case GET_MOVIE_DETAILS:
            return { ...state, movieData: action.payload}
        case CLEAR_MOVIE:
            return { ...state, movieData: action.payload}
        default:
            return { ...state }
    }
}

export default MovieReducer