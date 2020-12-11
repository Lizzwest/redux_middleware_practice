import { useEffect } from 'react';
import { connect } from 'react-redux'
import { getAllGenres, getTrending, updateSearch, getAllMoviesByGenre } from '../store/actions/MovieActions'
// import { Link } from 'react-router-dom'
import TextInput from './TextInput'
import SearchButton from './SearchButton'
const IMG_URL = process.env.REACT_APP_IMG_URL

const mapStateToProps = ({ movieState }) => {
    return { movieState }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        fetchGenres: () => dispatch(getAllGenres()),
        fetchTrending: () => dispatch(getTrending()),
        updateSearch: (e) => dispatch(updateSearch(e)),
        fetchGenreMovies: (id) => dispatch(getAllMoviesByGenre(id))
    }
};

const Movies = (props) => {
    const {fetchGenres, fetchTrending, fetchGenreMovies, updateSearch, movieState} = props
    useEffect(() => {
        fetchGenres()
        fetchTrending()
    }, [fetchGenres, fetchTrending])

    console.log(movieState.genre)

    const genres = movieState.genres.map((genre, i) => {
        return  <li key={i} onClick={() => fetchGenreMovies(genre.id, 1, genre.name)} style={{backgroundColor: i%2===0 ? 'rgba(255,255,255,0.1)' : 'rgba(240,240,240,0.1)', padding: '5px'}}>
                    <h3 style={{marginLeft: '10px'}}>{genre.name}</h3>
                </li>
    })

    const trending = movieState.trending.map((movie, i) => {
        return (
            <div className='movie-div' style={{ margin: '0 20px 10px 20px', maxWidth: '20vh'}} key={i}>
                <img src={IMG_URL + movie.poster_path} style={{ height: '30vh', width: '20vh', boxShadow: '0px 0px 5px cyan' }} alt="movie" />
                <h3>{movie.title}</h3>
            </div>
        )
    })

    const movies = movieState.movies.map((movie, i) => {
        return (
            <div className='movie-div' style={{ margin: '0 20px 10px 20px', maxWidth: '20vh'}} key={i}>
                <img src={IMG_URL + movie.poster_path} style={{ height: '30vh', width: '20vh', boxShadow: '0px 0px 5px cyan' }} alt="movie" />
                <h3>{movie.title}</h3>
            </div>
        )
    })

    const search = movieState.search
    console.log(search)
    return (
        <div>
            <span style={{display: 'flex', justifyContent: 'space-between'}}>
                <h1>Movies</h1>
                <span>
                    <TextInput placeholder={'Search Movies'} value={movieState.search} onChange={(e) => updateSearch(e)} />
                    <SearchButton />
                </span>
            </span>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 5fr'}}>
                <div>
                    <h2>Genres</h2>
                    <ul style={{margin: '0 20px 0 0', width: '25vh', boxShadow: '0px 0px 5px cyan'}}>
                        {genres}
                    </ul>
                </div>
                {movieState.movies.length ? 
                <div>
                    <h2>Trending Movies</h2>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        {movies}
                    </div>
                </div>
                :
                
                <div>
                    <h2>Trending Movies</h2>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        {trending}
                    </div>
                </div>
                }

            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies)