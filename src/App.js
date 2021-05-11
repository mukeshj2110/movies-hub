import React from 'react'
import './App.css';
import Header from './components/Header'
import MainNav from './components/MainNav'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Trending from './pages/Trending/Trending';
import { Container } from '@material-ui/core';
import Movies from './pages/Movies/Movies';
import Tv from './pages/Tv/Tv';
import Search from './pages/Search/Search';


function App() {
  return (
    <BrowserRouter>
     <Header />
    <div className="App">
      <Container>
      <Switch>
      <Route path="/" component={Trending} exact/>
      <Route path="/movies" component={Movies} />
      <Route path="/tv" component={Tv} />
      <Route path="/serach" component={Search} />
      </Switch>
      </Container>
    </div>
    <MainNav />
    </BrowserRouter>
  );
}

export default App;
