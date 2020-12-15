import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import Iframe from 'react-iframe'

const mapStateToProps = ({ tvState }) => {
    return { tvState }
};

const MoviePage = (props) => {
    const {tvState} = props
    
    
    console.log(tvState.showData)

    return (
        <div>
            {tvState.showData ? 
            <div >
                <span style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1vh'}}>
                    <Link to='/shows'>Back to Shows</Link>
                    <h1>{tvState.showData.show.title}</h1>
                </span>
                {tvState.showData.show.backdrop_path ? <img style={{width: '100%', height: 'auto'}} src={`https://image.tmdb.org/t/p/w1280${tvState.showData.show.backdrop_path}`} alt="backdrop" /> : <></>}
                <div>
                    <h2 style={{textAlign: 'right'}}>{tvState.showData.show.tagline==="" ? "About This Film" : tvState.showData.show.tagline}</h2>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <div style={{backgroundColor: 'black', boxShadow: '0px 0px 5px cyan', padding: '10px', borderRadius: '5px'}}>
                                <img style={{width: 'auto', height: '50vh'}} src={`https://image.tmdb.org/t/p/w500${tvState.showData.show.poster_path}`} alt="poster" />
                                <div className='movie-info'>
                                    <span style={{width: '100%', margin: '0', display: 'flex', justifyContent: 'space-between'}}><p style={{fontWeight: '700'}}>Average Rating: </p><p>{tvState.showData.show.vote_average}/10</p></span>
                                    <span style={{width: '100%', margin: '0', display: 'flex', justifyContent: 'space-between'}}><p style={{fontWeight: '700'}}>Run Time: </p><p>{tvState.showData.show.runtime} minutes</p></span>
                                    <span style={{width: '100%', margin: '0', display: 'flex', justifyContent: 'space-between'}}><p style={{fontWeight: '700'}}>Release Date: </p><p>{tvState.showData.show.release_date}</p></span>
                                    {tvState.showData.show.budget===0 ? <></> : <span style={{width: '100%', margin: '0', display: 'flex', justifyContent: 'space-between'}}><p style={{fontWeight: '700'}}>Budget: </p><p>${tvState.showData.show.budget}</p></span>}
                                    {tvState.showData.show.revenue===0 ? <></> : <span style={{width: '100%', margin: '0', display: 'flex', justifyContent: 'space-between'}}><p style={{fontWeight: '700'}}>Revenue: </p><p>${tvState.showData.show.revenue}</p></span>}
                                    
                                    {tvState.showData.stream ? 
                                    <div>
                                    {tvState.showData.stream.flatrate ? 
                                        <div>
                                            <h3 style={{marginTop: '0'}}>Stream On:</h3>
                                            <ul style={{textAlign: 'left', width: '100%', display: 'flex', flexWrap: 'wrap'}}>
                                            {tvState.showData.stream.flatrate.map((service, i) => {
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
                                    <a target="#" href={`https://www.imdb.com/title/${tvState.showData.show.imdb_id}/`}><h3 style={{marginBottom: '0'}}>View on IMDB</h3></a>      
                                </div>
                            </div>
                        </div>
                        <div style={{paddingLeft: '5vw'}}>
                            <h3 style={{fontWeight: '500', marginTop: '0'}}>{tvState.showData.show.overview}</h3>
                            <div className="iframe-container" style={{margin: '5vh auto', display: 'flex', justifyContent: 'space-around'}}>
                                <Iframe className='iframe' display="initial" title="trailer" frameBorder="0" src={`https://www.youtube.com/embed/${tvState.showData.show.videos.results.length > 1 ? tvState.showData.show.videos.results.find(r => r.size="Trailer").key : tvState.showData.show.videos.results[0].key}?version=3`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></Iframe>
                            </div>
                            {tvState.showData.stream ? 
                            <div>
                                {tvState.showData.stream.buy ? 
                                <div>
                                    <h3>Rent or Buy:</h3>
                                    <ul style={{textAlign: 'left', display: 'flex', flexWrap: 'wrap'}}>
                                    {tvState.showData.stream.buy.map((service, i) => {
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