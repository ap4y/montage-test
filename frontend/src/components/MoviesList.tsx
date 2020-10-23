import React, { useContext, useEffect } from 'react';
import MoviesContext, { ActionType } from '../store';
import request from '../client';
import CreateForm from "./CreateForm";

import './MoviesList.css';

export default function MoviesList() {
  const ctx = useContext(MoviesContext);
  const dispatch = ctx?.dispatch;

  useEffect(() => {
    if (!dispatch) return;

    request('movies').then((movies) => {
      dispatch({ type: ActionType.LoadMovies, payload: movies });
    });
  }, [dispatch]);

  const movieItems = <p>No movies to display</p> ?? (
    <ul>
      {ctx?.state?.movies.map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  );

  const showCreateModal = () => {};

  return (
    <div className="MoviesList">
      <header>
        <h2>Movies</h2>
        <button onClick={showCreateModal}>Add movie</button>
      </header>
      <section>{movieItems}</section>
      <div><CreateForm /></div>
    </div>
  );
}
