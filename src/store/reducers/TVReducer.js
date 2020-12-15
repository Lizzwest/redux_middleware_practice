const { GET_ALL_SHOW_GENRES, GET_ALL_SHOWS_BY_GENRE, GET_TRENDING_SHOWS, SHOW_SEARCH, GET_SEARCH_SHOWS, GET_SHOW_DETAILS, GET_ANIME_SHOWS, CLEAR_SHOW } = require('../types')

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
            return { ...state, shows: action.payload.shows.results.filter(r => r.poster_path!= null), genre: action.payload.name, page: action.payload.page, pages: action.payload.shows.total_pages, search: ''}
        case GET_ANIME_SHOWS:
            return { ...state, shows: action.payload.results, genre: 'Anime', page: action.payload.page, pages: action.payload.total_pages, search: ''}
        case GET_SEARCH_SHOWS:
            return { ...state, shows: action.payload ? action.payload.filter(m => m.poster_path!==null) : [], search: state.querySearch, genre: ''}
        case GET_SHOW_DETAILS:
            return { ...state, showData: action.payload}
        case CLEAR_SHOW:
            return { ...state, showData: action.payload}
        default:
            return { ...state }
    }
}

export default TVReducer