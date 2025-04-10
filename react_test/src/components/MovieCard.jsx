import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, imageBaseUrl }) => {
  return (
    <div>
      <Link to={`/movie/${movie.id}`}>
        <img src={`${imageBaseUrl}${movie.poster_path}`} alt={movie.title} />
        <h3>{movie.title}</h3>
        <p>Rating: {movie.vote_average}</p>
      </Link>
    </div>
  );
};

export default MovieCard; 

