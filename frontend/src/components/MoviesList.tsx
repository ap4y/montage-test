import React, { useState, useContext, useEffect } from 'react';
import MoviesContext, { ActionType, Movie } from '../store';
import request from '../client';
import CreateForm from './CreateForm';

import './MoviesList.css';

interface MovieItemProps {
  title: string;
  year: number;
  image: string;
}

function MovieItem({ title, year, image }: MovieItemProps) {
  console.log(image);
  return (
    <figure>
      <img src={`data:image/png;base64,${image}`} alt={`${title}(${year})`} />
      <figcaption>
        <span>{title}</span>
        <small>{year}</small>
      </figcaption>
    </figure>
  );
}

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
        {ctx?.state.movies
          .sort((a, b) => a.id - b.id)
          .map(({ id, title, year, image }) => (
            <li key={id}>
              <a href={`#movie-${id}`}>
                <MovieItem title={title} year={year} image={image} />
              </a>
            </li>
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
