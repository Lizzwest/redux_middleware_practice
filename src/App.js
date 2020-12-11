import './styles/App.css'
import { Route, Switch } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Movies from './components/Movies'
import TVShows from './components/TVShows'
import Watchlist from './components/WatchList'

const App = () => {

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path='/' component={(props) => <Home { ...props } />} />
          <Route exact path='/movies' component={(props) => <Movies { ...props } />} />
          <Route exact path='/shows' component={(props) => <TVShows { ...props } />} />
          <Route exact path='/watchlist' component={(props) => <Watchlist { ...props } />} />
        </Switch>
      </Layout>
    </div>
  )
}

export default App
