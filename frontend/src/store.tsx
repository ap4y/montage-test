import React from 'react';

interface Movie {
  id: number;
  title: string;
}

interface MovieState {
  movies: Array<Movie>;
}

export enum ActionType {
  LoadMovies = 1,
}

type ActionInterface =
  | { type: ActionType.LoadMovies; payload: Array<Movie> }
  | { type: 'decrement'; payload: string };

export function moviesReducer(state: MovieState, action: ActionInterface) {
  switch (action.type) {
    case ActionType.LoadMovies:
      return { movies: action.payload };
    case 'decrement':
      return { movies: state.movies };
    default:
      throw new Error();
  }
}

interface MoviesContextInterface {
  state: MovieState;
  dispatch: React.Dispatch<ActionInterface>;
}
const MoviesContext = React.createContext<MoviesContextInterface | null>(null);

export default MoviesContext;
