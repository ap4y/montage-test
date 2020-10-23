import React from 'react';

export interface Movie {
  id: number;
  title: string;
  year: number;
  description: string;
  director: string;
  producer: string;
  screenwriter: string;
  image: string;
}

interface MovieState {
  movies: Array<Movie>;
}

export enum ActionType {
  LoadMovies = 1,
  AddMovie,
}

type ActionInterface =
  | { type: ActionType.LoadMovies; payload: Array<Movie> }
  | { type: ActionType.AddMovie; payload: Movie }

export function moviesReducer(state: MovieState, action: ActionInterface) {
  switch (action.type) {
    case ActionType.LoadMovies:
      return { movies: action.payload };
    case ActionType.AddMovie:
      return { movies: [...state.movies, action.payload] };
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
