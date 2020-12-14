import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import Iframe from 'react-iframe'

const mapStateToProps = ({ movieState }) => {
    return { movieState }
};

const MoviePage = (props) => {
    const {movieState} = props
    
    


    return (
        <div>
            {movieState.movieData ? 
            <div >
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
                                            <h3 style={{marginTop: '0'}}>Stream On:</h3>
                                            <ul style={{textAlign: 'left', width: '100%', display: 'flex', flexWrap: 'wrap'}}>
                                            {movieState.movieData.stream.flatrate.map((service, i) => {
                                                return  <li key={i} style={{margin: '0 10px'}}>
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
                            <div className="iframe-container" style={{margin: '5vh auto', display: 'flex', justifyContent: 'space-around'}}>
                                <Iframe className='iframe' display="initial" title="trailer" frameBorder="0" src={`https://www.youtube.com/embed/${movieState.movieData.movie.videos.results.length > 1 ? movieState.movieData.movie.videos.results.find(r => r.size="Trailer").key : movieState.movieData.movie.videos.results[0].key}?version=3`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></Iframe>
                            </div>
                            {movieState.movieData.stream ? 
                            <div>
                                {movieState.movieData.stream.buy ? 
                                <div>
                                    <h3>Rent or Buy:</h3>
                                    <ul style={{textAlign: 'left', display: 'flex', flexWrap: 'wrap'}}>
                                    {movieState.movieData.stream.buy.map((service, i) => {
                                        return  <li key={i} style={{margin: '0 10px'}}>
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
                        </div>
                    </div>
                </div>
        
            </div>
            :
            <div>
                <h1>Movie Not Found</h1>
                <Link to='/movies'><h2>Back to Movies</h2></Link>
            </div>
            }
        </div>
    )
};

export default connect(mapStateToProps)(MoviePage)