import React, { useReducer } from 'react';
import './App.css';
import MoviesContext, { moviesReducer } from './store';

function App() {
  const [state, dispatch] = useReducer(moviesReducer, { movies: [] });

  return (
    <MoviesContext.Provider value={{ state, dispatch }}>
      <div className="App"></div>
    </MoviesContext.Provider>
  );
}

export default App;
