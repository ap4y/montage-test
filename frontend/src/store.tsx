import React from 'react';

interface Movie {
  id: number;
  title: string;
}

interface MovieState {
  movies: Array<Movie>;
}

type ACTIONTYPE =
  | { type: 'increment'; payload: number }
  | { type: 'decrement'; payload: string };

export function moviesReducer(state: MovieState, action: ACTIONTYPE) {
  switch (action.type) {
    case 'increment':
      return { movies: state.movies };
    case 'decrement':
      return { movies: state.movies };
    default:
      throw new Error();
  }
}

interface MoviesContextInterface {
  state: MovieState;
  dispatch: React.Dispatch<ACTIONTYPE>;
}
const MoviesContext = React.createContext<MoviesContextInterface | null>(null);

export default MoviesContext;
