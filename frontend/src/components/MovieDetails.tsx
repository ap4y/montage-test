import React, { useState, useEffect } from 'react';
import request from '../client';
import { Movie } from '../store';

import './MovieDetails.css';

interface MovieDetailsProps {
  movieId: number;
}

export default function MovieDetails({ movieId }: MovieDetailsProps) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    request(`movies/${movieId}`).then((movie: Movie) => {
      setMovie(movie);
    });
  }, [movieId]);

  return (
    <div className="MovieDetails">
      <div>
        <h2>{movie?.title}</h2>
        <p>
          <strong>Year:</strong> {movie?.year}
        </p>
        <p>
          <strong>Director:</strong> {movie?.director}
        </p>
        <p>
          <strong>Producer:</strong> {movie?.producer}
        </p>
        <p>
          <strong>Screenwriter:</strong> {movie?.screenwriter}
        </p>
        <p>
          <strong>Director:</strong> {movie?.director}
        </p>
        <p>
          <strong>Description:</strong> <br /> {movie?.description}
        </p>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = '';
          }}
        >
          Back
        </a>
      </div>
      <div>
        <img alt={movie?.title} />
      </div>
    </div>
  );
}
