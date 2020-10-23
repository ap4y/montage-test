import React, { useReducer, useState, useEffect } from 'react';
import MoviesContext, { moviesReducer } from './store';
import MoviesList from './components/MoviesList';
import MovieDetails from './components/MovieDetails';

function getMovieId() {
  const hash = window.location.hash;
  if (!hash.startsWith('#movie-')) return -1;

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
        {movieId === -1 && <MoviesList />}
        {movieId !== -1 && <MovieDetails movieId={movieId} />}
      </div>
    </MoviesContext.Provider>
  );
}

export default App;
