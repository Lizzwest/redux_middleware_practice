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
            {movieState.movie ? 
            <div >
                <span style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1vh'}}>
                    <Link to='/movies'>Back to Movies</Link>
                    <h1>{movieState.movie.title}</h1>
                </span>
                {movieState.movie.backdrop_path ? <img style={{width: '100%', height: 'auto'}} src={`https://image.tmdb.org/t/p/w1280${movieState.movie.backdrop_path}`} alt="backdrop" /> : <></>}
                <div>
                    <h2 style={{textAlign: 'right'}}>{movieState.movie.tagline==="" ? "About This Film" : movieState.movie.tagline}</h2>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{backgroundColor: 'black', boxShadow: '0px 0px 5px cyan', padding: '10px', borderRadius: '5px'}}>
                            <img style={{width: 'auto', height: '50vh'}} src={`https://image.tmdb.org/t/p/w500${movieState.movie.poster_path}`} alt="poster" />
                            <div className='movie-info'>
                                <span style={{width: '100%', margin: '0', display: 'flex', justifyContent: 'space-between'}}><p style={{fontWeight: '700'}}>Average Rating: </p><p>{movieState.movie.vote_average}/10</p></span>
                                <span style={{width: '100%', margin: '0', display: 'flex', justifyContent: 'space-between'}}><p style={{fontWeight: '700'}}>Run Time: </p><p>{movieState.movie.runtime} minutes</p></span>
                                <span style={{width: '100%', margin: '0', display: 'flex', justifyContent: 'space-between'}}><p style={{fontWeight: '700'}}>Release Date: </p><p>{movieState.movie.release_date}</p></span>
                                {movieState.movie.budget===0 ? <></> : <span style={{width: '100%', margin: '0', display: 'flex', justifyContent: 'space-between'}}><p style={{fontWeight: '700'}}>Budget: </p><p>${movieState.movie.budget}</p></span>}
                                {movieState.movie.revenue===0 ? <></> : <span style={{width: '100%', margin: '0', display: 'flex', justifyContent: 'space-between'}}><p style={{fontWeight: '700'}}>Revenue: </p><p>${movieState.movie.revenue}</p></span>}
                                <a href={`https://www.imdb.com/title/${movieState.movie.imdb_id}/`}><p style={{textAlign: 'center'}}>View on IMDB</p></a>
                            </div>
                        </div>
                        <div style={{paddingLeft: '5vw'}}>
                            <h3>{movieState.movie.overview}</h3>
                            
                                <Iframe display="initial" title="trailer" frameBorder="0" width="560" height="315" src={`https://www.youtube.com/embed/${movieState.movie.videos.results[0].key}?version=3`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></Iframe>
                           
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