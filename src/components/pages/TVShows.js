import { useEffect } from 'react';
import { connect } from 'react-redux'
import { getAllGenres, getTrending, getAllShowsByGenre, getSearchShows, getShowDetails } from '../../store/actions/TVActions'
import { Link } from 'react-router-dom'
import TextInput from '../MovieTextInput'
import SearchButton from '../SearchButton'

const IMG_URL = process.env.REACT_APP_IMG_URL

const mapStateToProps = ({ tvState }) => {
    return { tvState }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        fetchGenres: () => dispatch(getAllGenres()),
        fetchTrending: () => dispatch(getTrending()),
        fetchGenreShows: (id, page, name) => dispatch(getAllShowsByGenre(id, page, name)),
        fetchShowSearch: (query) => dispatch(getSearchShows(query)),
        fetchShowDetails: (id) => dispatch(getShowDetails(id))
    }
};

const TVShows = (props) => {
    const {fetchGenres, fetchTrending, fetchGenreShows, fetchShowSearch, fetchShowDetails, tvState} = props
    
    useEffect(() => {
        fetchGenres()
        fetchTrending()
    }, [fetchGenres, fetchTrending])


    const genres = tvState.genres.map((genre, i) => {
        return  <li key={i} className='genre-link' onClick={() => fetchGenreShows(genre.id, 1, genre.name)} style={{backgroundColor: i%2===0 ? 'rgba(255,255,255,0.1)' : 'rgba(240,240,240,0.1)', padding: '5px'}}>
                    <h3 style={{margin: '0 10px'}}>{genre.name}</h3>
                </li>
                
    })

    const trending = tvState.trending.map((show, i) => {
        return  <Link key={i} to="/show/details" 
                onClick={() => {
                    fetchShowDetails(show.id);
                    window.scroll({top: 0, left: 0, behavior: 'smooth'});
                }}>
                    <div className='movie-div' style={{ margin: '0 20px 10px 20px', maxWidth: '20vh'}} >
                        <img src={IMG_URL + show.poster_path} style={{ height: '30vh', width: '20vh', boxShadow: '0px 0px 5px cyan' }} alt="show" />
                        <h3>{show.name}</h3>
                    </div>
                </Link>
        
    })
    
    const shows = tvState.shows.map((show, i) => {
        return  <Link key={i} to="/show/details" 
                onClick={() => {
                    fetchShowDetails(show.id);
                    window.scroll({top: 0, left: 0, behavior: 'smooth'});
                }}>
                    <div className='movie-div' style={{ margin: '0 20px 10px 20px', maxWidth: '20vh'}} >
                        <img src={IMG_URL + show.poster_path} style={{ height: '30vh', width: '20vh', boxShadow: '0px 0px 5px cyan' }} alt="show" />
                        <h3>{show.name}</h3>
                    </div>
                </Link>
        
    })
    
   
    return (
        <div>
            <span style={{display: 'flex', justifyContent: 'space-between'}}>
                <h1>Shows</h1>
                {tvState.genre ? 
                    <>
                    </>
                    :
                    <></>
                }
                <span>
                    <TextInput />
                    <SearchButton onClick={() => fetchShowSearch(tvState.querySearch)} />
                </span>
            </span>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 5fr'}}>
                <div>
                    <h2>Genres</h2>
                    <ul style={{margin: '0 0 0 0', width: '25vh', boxShadow: '0px 0px 5px cyan'}}>
                        {genres}
                    </ul>
                </div>
                {tvState.shows.length ? 
                <div>
                    {tvState.genre ?
                    <h2>{tvState.genre} Shows</h2>
                    :
                    <h2>Search Results for '{tvState.search}'</h2>
                    }
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        {shows}
                    </div>
                </div>
                :
                <div>
                    <h2>Trending Shows</h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(TVShows)