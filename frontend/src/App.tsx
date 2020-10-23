import React, { useReducer, useState, useEffect } from 'react';
import MoviesContext, { moviesReducer } from './store';
import MoviesList from './components/MoviesList';
import MovieDetails from './components/MovieDetails';

const EMPTY_ID = -1;

function getMovieId() {
  const hash = window.location.hash;
  if (!hash.startsWith('#movie-')) return EMPTY_ID;

  return Number.parseInt(hash.replace('#movie-', ''));
}

function App() {
  const [state, dispatch] = useReducer(moviesReducer, { movies: [] });
  const [movieId, setMovieId] = useState(getMovieId());

  const updateMovieId = () => {
    setMovieId(getMovieId());
  };

  useEffect(() => {
    window.addEventListener('popstate', updateMovieId);
    return () => {
      window.removeEventListener('popstate', updateMovieId);
    };
  }, []);

  return (
    <MoviesContext.Provider value={{ state, dispatch }}>
      <div className="App">
        {movieId === EMPTY_ID && <MoviesList />}
        {movieId !== EMPTY_ID && <MovieDetails movieId={movieId} />}
      </div>
    </MoviesContext.Provider>
  );
}

export default App;
