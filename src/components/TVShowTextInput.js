import {connect} from 'react-redux'
import {updateSearch} from '../store/actions/TVActions'

const mapStateToProps = ({ tvState }) => {
    return { tvState }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        updateSearch: (e) => dispatch(updateSearch(e)),
    }
};

const TextInput = (props) =>
    <input
      style={{minWidth: '20vh', maxWidth: '30vh', height: '28px', margin: '0 0 -5px 0', outline: 'none'}}
      type='text'
      value={props.tvState.searchQuery}
      onChange={(e) => props.updateSearch(e)}
      placeholder={'SearchMovies'}
    />
export default connect(mapStateToProps, mapDispatchToProps)(TextInput)