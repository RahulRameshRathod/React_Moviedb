
import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, imageBaseUrl }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 36;

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [movies]);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? 'active' : ''}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <div
        className="movie-list"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 1fr)',
          gap: '10px',
        }}
      >
        {currentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} imageBaseUrl={imageBaseUrl} />
        ))}
      </div>
      {totalPages > 1 && ( 
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          {renderPageNumbers()}
        </div>
      )}
    </div>
  );
};

export default MovieList;