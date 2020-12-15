import './styles/App.css'
import { Route, Switch } from 'react-router-dom'
import Layout from './components/pages/Layout'
import Home from './components/pages/Home'
import Movies from './components/pages/Movies'
import TVShows from './components/pages/TVShows'
import Watchlist from './components/pages/WatchList'
import MoviePage from './components/pages/MoviePage'
import TVShowPage from './components/pages/TVShowPage'

const App = (props) => {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path='/' component={(props) => <Home { ...props } />} />
          <Route path='/movies' component={(props) => <Movies { ...props } />} />
          <Route path='/movie/details' component={(props) => <MoviePage { ...props} />} />
          <Route path='/shows' component={(props) => <TVShows { ...props } />} />
          <Route path='/show/details' component={(props) => <TVShowPage { ...props } />} />
          <Route path='/watchlist' component={(props) => <Watchlist { ...props } />} />
        </Switch>
      </Layout>
    </div>
  )
}

export default App
