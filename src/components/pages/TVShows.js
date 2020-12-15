import { useEffect } from 'react';
import { connect } from 'react-redux'
import { getAllGenres, getTrending, getAllShowsByGenre, getAnimeShows, getSearchShows, getShowDetails, clearShow } from '../../store/actions/TVActions'
import { Link } from 'react-router-dom'
import TextInput from '../TVTextInput'
import SearchButton from '../SearchButton'
import AppPagination from '../Pagination'
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
        fetchAnime: (page) => dispatch(getAnimeShows(page)),
        fetchShowDetails: (id) => dispatch(getShowDetails(id)),
        clear: () => dispatch(clearShow())
    }
};

const TVShows = (props) => {
    const {fetchGenres, fetchTrending, fetchGenreShows, fetchAnime, fetchShowSearch, fetchShowDetails, clear, tvState} = props
    
    useEffect(() => {
        fetchGenres();
        fetchTrending();
        clear();
    }, [fetchGenres, fetchTrending, clear])


    const genres = tvState.genres.map((genre, i) => {
        return  <li key={i} className='genre-link' onClick={() => fetchGenreShows(genre.id, 1, genre.name)} style={{backgroundColor: i%2===0 ? 'rgba(255,255,255,0.1)' : 'rgba(240,240,240,0.1)', padding: '5px'}}>
                    <h3 style={{margin: '0 10px'}}>{genre.name}</h3>
                </li>
                
    })

    const trending = tvState.trending.map((show, i) => {
        return  <Link key={i} to="/show/details" 
                onClick={async () => {
                    await fetchShowDetails(show.id);
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
                onClick={async () => {
                    await fetchShowDetails(show.id);
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
                    tvState.genre==='Anime' ?
                    <AppPagination count={tvState.pages} page={tvState.page} name={'Anime'} id={16} fetchPage={fetchAnime}/>
                    :
                    <AppPagination count={tvState.pages} page={tvState.page} name={tvState.genre} id={tvState.genres.find(g => g.name===tvState.genre).id} fetchPage={fetchGenreShows}/>
                    :
                    <></>
                }
                <span>
                    <TextInput />
                    <SearchButton onClick={async () => await fetchShowSearch(tvState.querySearch)} />
                </span>
            </span>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 5fr'}}>
                <div>
                    <h2>Genres</h2>
                    <ul style={{margin: '0 0 0 0', width: '25vh', boxShadow: '0px 0px 5px cyan'}}>
                        <li key={29} className='genre-link' onClick={() => fetchAnime(1)} style={{backgroundColor: 29%2===0 ? 'rgba(255,255,255,0.1)' : 'rgba(240,240,240,0.1)', padding: '5px'}}>
                            <h3 style={{margin: '0 10px'}}>Anime</h3>
                        </li>
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