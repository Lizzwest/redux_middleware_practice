import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import Iframe from 'react-iframe'
import { getMovieDetails } from '../../store/actions/MovieActions'
const IMG_URL = process.env.REACT_APP_IMG_URL

const mapStateToProps = ({ movieState }) => {
    return { movieState }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMovieDetails: (id) => dispatch(getMovieDetails(id))   
    }
};

const MoviePage = (props) => {
    const {movieState, fetchMovieDetails} = props
  
    const recommendations = movieState.movieData ? movieState.movieData.recommend.map((movie, i) => {
        return  <Link key={i} to="/movie/details" 
                onClick={async () => {
                    await fetchMovieDetails(movie.id);
                    window.scroll({top: 0, left: 0, behavior: 'smooth'});
                }}>
                    <div className='movie-div' style={{ margin: '0 20px 10px 20px', maxWidth: '15vh'}} >
                        <img src={IMG_URL + movie.poster_path} style={{ height: '22.5vh', width: '15vh', boxShadow: '0px 0px 5px cyan' }} alt="movie" />
                        <h4 style={{margin: '2px 0 0 0'}}>{movie.title}</h4>
                    </div>
                </Link>
    }) : null;
    
    return (
        <div>
            {movieState.movieData ? 
            <div>
                <span style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1vh'}}>
                    <Link to='/movies'>Back to Movies</Link>
                    <h1>{movieState.movieData.movie.title}</h1>
                </span>
                {movieState.movieData.movie.backdrop_path ? <img style={{width: '100%', height: 'auto'}} src={`https://image.tmdb.org/t/p/w1280${movieState.movieData.movie.backdrop_path}`} alt="backdrop" /> : <></>}
                <div>
                    <h2 style={{textAlign: 'right'}}>{movieState.movieData.movie.tagline==="" ? "About This Film" : movieState.movieData.movie.tagline}</h2>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <div style={{backgroundColor: 'black', boxShadow: '0px 0px 5px cyan', padding: '10px', borderRadius: '5px'}}>
                                <img style={{width: 'auto', height: '50vh'}} src={`https://image.tmdb.org/t/p/w500${movieState.movieData.movie.poster_path}`} alt="poster" />
                                <div className='movie-info'>
                                    <span style={{width: '100%', margin: '0', display: 'flex', justifyContent: 'space-between'}}><p style={{fontWeight: '700'}}>Average Rating: </p><p>{movieState.movieData.movie.vote_average}/10</p></span>
                                    <span style={{width: '100%', margin: '0', display: 'flex', justifyContent: 'space-between'}}><p style={{fontWeight: '700'}}>Run Time: </p><p>{movieState.movieData.movie.runtime} minutes</p></span>
                                    <span style={{width: '100%', margin: '0', display: 'flex', justifyContent: 'space-between'}}><p style={{fontWeight: '700'}}>Release Date: </p><p>{movieState.movieData.movie.release_date}</p></span>
                                    {movieState.movieData.movie.budget===0 ? <></> : <span style={{width: '100%', margin: '0', display: 'flex', justifyContent: 'space-between'}}><p style={{fontWeight: '700'}}>Budget: </p><p>${movieState.movieData.movie.budget}</p></span>}
                                    {movieState.movieData.movie.revenue===0 ? <></> : <span style={{width: '100%', margin: '0', display: 'flex', justifyContent: 'space-between'}}><p style={{fontWeight: '700'}}>Revenue: </p><p>${movieState.movieData.movie.revenue}</p></span>}
                                    
                                    {movieState.movieData.stream ? 
                                    <div>
                                    {movieState.movieData.stream.flatrate ? 
                                        <div>
                                            <h3 style={{margin: '0'}}>Stream On:</h3>
                                            <ul style={{textAlign: 'left', width: '100%', display: 'flex', flexWrap: 'wrap'}}>
                                            {movieState.movieData.stream.flatrate.map((service, i) => {
                                                return  <li key={i} style={{margin: '5px'}}>
                                                            <div style={{maxWidth: '100px', textAlign:'center'}}>
                                                                <img src={`https://image.tmdb.org/t/p/w45${service.logo_path}`} alt={service.provider_name}/>
                                                            </div>
                                                        </li>
                                                })}
                                            </ul>
                                        </div>
                                        : 
                                        <></> 
                                        }
                                        {movieState.movieData.stream.buy ? 
                                        <div>
                                            <h3 style={{margin: '0'}}>Rent or Buy:</h3>
                                            <ul style={{textAlign: 'left', width: '100%', display: 'flex', flexWrap: 'wrap'}}>
                                            {movieState.movieData.stream.buy.map((service, i) => {
                                                return  <li key={i} style={{margin: '5px'}}>
                                                            <div style={{maxWidth: '80px', textAlign:'center'}}>
                                                                <img src={`https://image.tmdb.org/t/p/w45${service.logo_path}`} alt={service.provider_name}/>
                                                            </div>
                                                        </li>
                                                })} 
                                            </ul>
                                        </div>
                                        : 
                                        <></>
                                        } 
                                    </div>
                                    :
                                    <></>
                                    }         
                                    <a target="#" href={`https://www.imdb.com/title/${movieState.movieData.movie.imdb_id}/`}><h3 style={{marginBottom: '0'}}>View on IMDB</h3></a>      
                                </div>
                            </div>
                        </div>
                        <div style={{paddingLeft: '5vw'}}>
                            <h3 style={{fontWeight: '500', marginTop: '0'}}>{movieState.movieData.movie.overview}</h3>
                            {movieState.movieData.movie.videos.results.length !== 0 ?
                            <div className="iframe-container" style={{margin: '10vh auto'}}>
                                <Iframe className='iframe' display="initial" title="trailer" frameBorder="0" src={`https://www.youtube.com/embed/${movieState.movieData.movie.videos.results.length > 1 ? movieState.movieData.movie.videos.results.find(r => r.size="Trailer").key : movieState.movieData.movie.videos.results[0].key}?version=3`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></Iframe>
                            </div>
                            :
                            <h3>No Trailer Available Currently</h3>
                            }   
                        </div>
                    </div>
                </div>
                <div>
                    <h2>Related Movies You Might Like</h2>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                      {recommendations}
                    </div>
                </div>
            </div>
            :
            <div>
                <span style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1vh'}}>
                    <Link to='/movies'>Back to Movies</Link>
                    <h1>Movie Not Found</h1>
                </span>
            </div>
            }
        </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);