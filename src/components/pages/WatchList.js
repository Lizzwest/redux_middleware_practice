import {connect} from 'react-redux'
import { addToWatchlistMovies, addToWatchlistShows, removeFromWatchlistMovies, removeFromWatchlistShows, markWatched} from '../../store/actions/WatchListActions'


const mapStateToProps = ({watchListState, movieState, tvState}) => {
    return { watchListState, movieState, tvState}
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMovie: (data) => dispatch(addToWatchlistMovies(data)),
        removeMovie: (index) => dispatch(removeFromWatchlistMovies(index)),
        addShow: (data) => dispatch(addToWatchlistShows(data)),
        removeShow: (index) => dispatch(removeFromWatchlistShows(index)),
        watch: (data) => dispatch(markWatched(data)),
    }
}

const Watchlist = (props) => {
    const { watchListState, movieState, tvState } = props
    console.log(watchListState, movieState, tvState)
    return (
        <div>
            <h1>Watchlist</h1>
            <div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                    <ul>
                        
                    </ul>
                    <ul>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist)