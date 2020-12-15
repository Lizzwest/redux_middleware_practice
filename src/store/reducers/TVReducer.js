const { GET_ALL_SHOW_GENRES, GET_ALL_SHOWS_BY_GENRE, GET_TRENDING_SHOWS, SHOW_SEARCH, GET_SEARCH_SHOWS, GET_SHOW_DETAILS } = require('../types')

const initialState = {
    genres: [],
    genre: '',
    shows: [],
    trending: [],
    querySearch: '',
    search: '',
    page: 1,
    showData: null
}

const TVReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_SHOW_GENRES:
            return { ...state, genres: action.payload }
        case GET_TRENDING_SHOWS:
            return { ...state, trending: action.payload}
        case SHOW_SEARCH:
            return { ...state, querySearch: action.payload}
        case GET_ALL_SHOWS_BY_GENRE:
            return { ...state, shows: action.payload.shows, genre: action.payload.name, page: action.payload.page, search: ''}
        case GET_SEARCH_SHOWS:
            return { ...state, shows: action.payload ? action.payload.filter(m => m.poster_path!==null) : [], search: state.querySearch, genre: ''}
        case GET_SHOW_DETAILS:
            return { ...state, showData: action.payload}
        default:
            return { ...state }
    }
}

export default TVReducer