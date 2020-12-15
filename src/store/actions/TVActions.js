import { GetAllGenres, GetTrending, GetShowsByGenre, GetAnimeShows, GetSearchShows, GetShowDetails } from '../../services/TVServices';
import { GET_ALL_SHOW_GENRES, GET_TRENDING_SHOWS, GET_ALL_SHOWS_BY_GENRE, SHOW_SEARCH, GET_SEARCH_SHOWS, GET_SHOW_DETAILS, GET_ANIME_SHOWS, CLEAR_SHOW } from '../types';

export const getAllGenres = () => async (dispatch) => {
    try {
      const response = await GetAllGenres()
      // console.log(genres)
      dispatch({
        type: GET_ALL_SHOW_GENRES,
        payload: response
      })
    } catch(err) { throw err }
};

export const getTrending = () => async (dispatch) => {
    try {
      const response = await GetTrending()
      // console.log(genres)
      dispatch({
        type: GET_TRENDING_SHOWS,
        payload: response
      })
    } catch(err) { throw err }
};

export const updateSearch = (e) =>  (dispatch) => {
    dispatch({
        type: SHOW_SEARCH,
        payload: e.target.value
    })
};

export const getAllShowsByGenre = (id, page, name) => async (dispatch) => {
    try {
        const response = await GetShowsByGenre(id, page, name)
        dispatch({
            type: GET_ALL_SHOWS_BY_GENRE,
            payload: {shows: response, name: name, page: page}
        })

    } catch(err) { throw err }
}
export const getAnimeShows = (page) => async (dispatch) => {
    try {
        const response = await GetAnimeShows(page)
        dispatch({
            type: GET_ANIME_SHOWS,
            payload: response
        })

    } catch(err) { throw err }
}

export const getSearchShows = (query) => async (dispatch) => {
    try {
        const response = await GetSearchShows(query)
        dispatch({
            type: GET_SEARCH_SHOWS,
            payload: response
        })
    } catch(err) { throw err }
}

export const getShowDetails = (id) => async (dispatch) => {
    try {
        const response = await GetShowDetails(id)
        dispatch({
            type: GET_SHOW_DETAILS,
            payload: response
        })
    } catch(err) { throw err }
}

export const clearShow = () => (dispatch) => dispatch({type: CLEAR_SHOW, payload: null})