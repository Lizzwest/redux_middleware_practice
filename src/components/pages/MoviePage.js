import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

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
                <img style={{width: '100%', height: 'auto'}} src={`https://image.tmdb.org/t/p/w1280${movieState.movie.backdrop_path}`} alt="backdrop" />
                <div>
                    <h2 style={{textAlign: 'right'}}>{movieState.movie.tagline==="" ? "About This Film" : movieState.movie.tagline}</h2>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <img style={{width: 'auto', height: '40vh', boxShadow: '0px 0px 5px cyan'}} src={`https://image.tmdb.org/t/p/w500${movieState.movie.poster_path}`} alt="poster" />
                            <h3>Runtime: {movieState.movie.runtime} minutes</h3>
                            <h3>Release Date: {movieState.movie.release_date}</h3>
                        </div>
                        <div></div>
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