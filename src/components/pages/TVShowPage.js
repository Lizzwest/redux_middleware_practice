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
                    <h1>{tvState.showData.show.name}</h1>
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
                                    <span style={{width: '100%', margin: '0', display: 'flex', justifyContent: 'space-between'}}><p style={{fontWeight: '700'}}>Network: </p><p>{tvState.showData.show.networks[0].name}</p></span>
                                    {tvState.showData.show.homepage ? <span style={{width: '100%', margin: '0', display: 'flex', justifyContent: 'space-between'}}><p style={{fontWeight: '700'}}>Homepage: </p><a target="#" href={tvState.showData.show.homepage} ><p>Link to Website</p></a></span> : <></>}
                                    <span style={{width: '100%', margin: '0', display: 'flex', justifyContent: 'space-between'}}><p style={{fontWeight: '700'}}>Seasons: </p><p>{tvState.showData.show.number_of_seasons}</p></span>
                                    <span style={{width: '100%', margin: '0', display: 'flex', justifyContent: 'space-between'}}><p style={{fontWeight: '700'}}>Episodes: </p><p>{tvState.showData.show.number_of_episodes}</p></span>
                                    <span style={{width: '100%', margin: '0', display: 'flex', justifyContent: 'space-between'}}><p style={{fontWeight: '700'}}>Status: </p><p>{tvState.showData.show.in_production ? 'In Production' : 'Not in Production'}</p></span>
                                    {tvState.showData.stream ? 
                                    <div>
                                    {tvState.showData.stream.flatrate ? 
                                        <div>
                                            <h3 style={{margin: '0'}}>Streaming On:</h3>
                                            <ul style={{textAlign: 'left', width: '100%', display: 'flex', flexWrap: 'wrap'}}>
                                            {tvState.showData.stream.flatrate.map((service, i) => {
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
                                    </div>
                                    :
                                    <></>
                                    }         
                                </div>
                            </div>
                        </div>
                        <div style={{paddingLeft: '5vw'}}>
                            <h3 style={{fontWeight: '500', marginTop: '0'}}>{tvState.showData.show.overview}</h3>
                            {tvState.showData.show.videos.results.length !== 0 ?
                            <div className="iframe-container" style={{margin: '5vh auto', display: 'flex', justifyContent: 'space-around'}}>
                                <Iframe className='iframe' display="initial" title="trailer" frameBorder="0" src={`https://www.youtube.com/embed/${tvState.showData.show.videos.results.length > 1 ? tvState.showData.show.videos.results.find(r => r.size="Trailer").key : tvState.showData.show.videos.results[0].key}?version=3`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></Iframe>
                            </div>
                            :
                            <></>
                            }
                        </div>
                    </div>
                    <div>
                        <h2>Seasons and Episodes</h2>
                    </div>
                </div>
            </div>
            :
            <div>
                <span style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1vh'}}>
                    <Link to='/shows'>Back to Shows</Link>
                    <h1>Show Not Found</h1>
                </span>
            </div>
            }
        </div>
    )
};

export default connect(mapStateToProps)(MoviePage)