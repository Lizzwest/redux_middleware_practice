import { useEffect } from 'react';
import { connect } from 'react-redux'
import { getAllGenres, getTrending, getAllMoviesByGenre, getSearchMovies, getMovieDetails } from '../../store/actions/MovieActions'
import { Link } from 'react-router-dom'
import TextInput from '../MovieTextInput'
import SearchButton from '../SearchButton'
import PageStepper from '../PageStepper'
const IMG_URL = process.env.REACT_APP_IMG_URL

const mapStateToProps = ({ movieState }) => {
    return { movieState }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        fetchGenres: () => dispatch(getAllGenres()),
        fetchTrending: () => dispatch(getTrending()),
        fetchGenreMovies: (id, page, name) => dispatch(getAllMoviesByGenre(id, page, name)),
        fetchMovieSearch: (query) => dispatch(getSearchMovies(query)),
        fetchMovieDetails: (id) => dispatch(getMovieDetails(id))
    }
};

const Movies = (props) => {
    const {fetchGenres, fetchTrending, fetchGenreMovies, fetchMovieSearch, fetchMovieDetails, movieState} = props
    
    useEffect(() => {
        fetchGenres()
        fetchTrending()
    }, [fetchGenres, fetchTrending])


    const genres = movieState.genres.map((genre, i) => {
        return  <li key={i} className='genre-link' onClick={() => fetchGenreMovies(genre.id, 1, genre.name)} style={{backgroundColor: i%2===0 ? 'rgba(255,255,255,0.1)' : 'rgba(240,240,240,0.1)', padding: '5px'}}>
                    <h3 style={{marginLeft: '10px'}}>{genre.name}</h3>
                </li>
                
    })

    const trending = movieState.trending.map((movie, i) => {
        return  <Link key={i} to="/movie/details" 
                onClick={() => {
                    fetchMovieDetails(movie.id);
                    window.scroll({top: 0, left: 0, behavior: 'smooth'});
                }}>
                    <div className='movie-div' style={{ margin: '0 20px 10px 20px', maxWidth: '20vh'}} >
                        <img src={IMG_URL + movie.poster_path} style={{ height: '30vh', width: '20vh', boxShadow: '0px 0px 5px cyan' }} alt="movie" />
                        <h3>{movie.title}</h3>
                    </div>
                </Link>
        
    })

    const movies = movieState.movies.map((movie, i) => {
        return  <Link key={i} to="/movie/details" 
                onClick={() => {
                    fetchMovieDetails(movie.id);
                    window.scroll({top: 0, left: 0, behavior: 'smooth'});
                }}>
                    <div className='movie-div' style={{ margin: '0 20px 10px 20px', maxWidth: '20vh'}} >
                        <img src={IMG_URL + movie.poster_path} style={{ height: '30vh', width: '20vh', boxShadow: '0px 0px 5px cyan' }} alt="movie" />
                        <h3>{movie.title}</h3>
                    </div>
                </Link>
        
    })

   
    return (
        <div>
            <span style={{display: 'flex', justifyContent: 'space-between'}}>
                <h1>Movies</h1>
                {movieState.genre ? 
                    <PageStepper 
                    id={movieState.genres.find(g => g.name===movieState.genre).id}
                    page={movieState.page}
                    name={movieState.genre}
                    fetchPage={fetchGenreMovies}
                    />
                    :
                    <></>
                }
                <span>
                    <TextInput />
                    <SearchButton onClick={() => fetchMovieSearch(movieState.querySearch)} />
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
                    {movieState.genre ?
                    <h2>{movieState.genre} Movies</h2>
                    :
                    <h2>Search Results for '{movieState.search}'</h2>
                    }
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
            <div>
                
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies)