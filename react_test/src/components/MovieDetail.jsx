import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const apiKey = 'c45a857c193f6302f2b5061c3b85e743'; 
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
      );
      const data = await response.json();
      setMovie(data);
    };

    const fetchMovieCast = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
      );
      const data = await response.json();
      setCast(data.cast);
    };

    fetchMovieDetails();
    fetchMovieCast();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>Rating: {movie.vote_average}</p>
      <p>Runtime: {movie.runtime} min</p>
      <p>
        Genres: {movie.genres.map((genre) => genre.name).join(', ')}
      </p>
      <p>Release Date: {movie.release_date}</p>
      <h3>Overview</h3>
      <p>{movie.overview}</p>

      <h3>Cast</h3>
      <div>
        {cast.map((actor) => (
          <div key={actor.cast_id}>
            <img
              src={`${imageBaseUrl}${actor.profile_path}`}
              alt={actor.name}
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;