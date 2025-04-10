
import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const apiKey = 'c45a857c193f6302f2b5061c3b85e743';
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
      );
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
    };

    fetchMovies();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, page - 9);
    let endPage = Math.min(totalPages, startPage + 19);

    if (endPage - startPage < 19) {
      startPage = Math.max(1, endPage - 19);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={page === i ? 'active' : ''}
          disabled={page === i}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(<span key="more">...</span>);
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => setPage(totalPages)}
          className={page === totalPages ? 'active' : ''}
          disabled={page === totalPages}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div>
      <h1>Popular Movies</h1>
      <MovieList movies={movies} imageBaseUrl={imageBaseUrl} />
      <div className="pagination-container">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        {renderPageNumbers()}
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;