import React from 'react'
import './App.css';
import Header from './components/Header'
import MainNav from './components/MainNav'
import {BrowserRouter} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
     <Header />
    <div className="App">
    </div>
    <MainNav />
    </BrowserRouter>
  );
}

export default App;
