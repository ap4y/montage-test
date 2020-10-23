import React, { useReducer } from 'react';
import MoviesContext, { moviesReducer } from './store';
import MoviesList from './components/MoviesList';

import './App.css';

function App() {
  const [state, dispatch] = useReducer(moviesReducer, { movies: [] });

  return (
    <MoviesContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <MoviesList />
      </div>
    </MoviesContext.Provider>
  );
}

export default App;
