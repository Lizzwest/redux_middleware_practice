import { GetAllGenres, GetTrending, GetMoviesByGenre } from '../../services/MovieServices';
import { GET_ALL_MOVIE_GENRES, GET_ALL_MOVIES_BY_GENRE, GET_TRENDING_MOVIES, MOVIE_SEARCH } from '../types';

export const getAllGenres = () => async (dispatch) => {
    try {
      const genres = await GetAllGenres()
      // console.log(genres)
      dispatch({
        type: GET_ALL_MOVIE_GENRES,
        payload: genres
      })
    } catch(err) { throw err }
};

export const getTrending = () => async (dispatch) => {
    try {
      const trending = await GetTrending()
      // console.log(genres)
      dispatch({
        type: GET_TRENDING_MOVIES,
        payload: trending
      })
    } catch(err) { throw err }
};

export const updateSearch = (e) =>  (dispatch) => {
    dispatch({
        type: MOVIE_SEARCH,
        payload: e.target.value
    })
};

export const getAllMoviesByGenre = (id, page, name) => async (dispatch) => {
    try {
        const movies = await GetMoviesByGenre(id, page, name)
        dispatch({
            type: GET_ALL_MOVIES_BY_GENRE,
            payload: {movies: movies, name: name}
        })

    } catch(err) { throw err }
}