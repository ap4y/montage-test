import React, { useState, useContext, useEffect } from 'react';
import MoviesContext, { ActionType, Movie } from '../store';
import request from '../client';
import CreateForm from './CreateForm';

import './MoviesList.css';

export default function MoviesList() {
  const [modalVisible, setModalVisible] = useState(false);
  const ctx = useContext(MoviesContext);
  const dispatch = ctx?.dispatch;

  useEffect(() => {
    if (!dispatch) return;

    request('movies').then((movies) => {
      dispatch({ type: ActionType.LoadMovies, payload: movies });
    });
  }, [dispatch]);

  const movieItems =
    ctx?.state.movies.length === 0 ? (
      <p>No movies to display</p>
    ) : (
      <ul>
        {ctx?.state.movies.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    );

  const saveMovie = (movie: Movie) => {
    if (!dispatch) return;

    request('movies', 'POST', { movie }).then((result) => {
      dispatch({ type: ActionType.AddMovie, payload: result });
      setModalVisible(false);
    });
  };

  return (
    <div className="MoviesList">
      <header>
        <h2>Movies</h2>
        <button className="primary" onClick={() => setModalVisible(true)}>
          Add movie
        </button>
      </header>
      <section>{movieItems}</section>
      {modalVisible && (
        <div className="modal">
          <CreateForm
            onSave={saveMovie}
            onCancel={() => setModalVisible(false)}
          />
        </div>
      )}
    </div>
  );
}
