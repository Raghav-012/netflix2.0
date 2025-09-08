import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const MovieContainer = () => {
  const { popularMovie, nowPlayingMovies, topRatedMovies, upcomingMovies } =
    useSelector((store) => store.movie);

  return (
    <div className="bg-gradient-to-b from-white via-blue-300 to-blue-900 min-h-screen">
      <div className="relative z-10 -mt-52 px-6">
        {popularMovie && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 mb-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">
              🔥 Popular Movies
            </h2>
            <MovieList title="" movies={popularMovie} textColor="text-white" />
          </div>
        )}
        {nowPlayingMovies && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 mb-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">
              🎬 Now Playing
            </h2>
            <MovieList title="" movies={nowPlayingMovies} textColor="text-white" />
          </div>
        )}
        {topRatedMovies && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 mb-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">
              ⭐ Top Rated
            </h2>
            <MovieList title="" movies={topRatedMovies} textColor="text-white" />
          </div>
        )}
        {upcomingMovies && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 mb-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">
              ⏳ Upcoming
            </h2>
            <MovieList title="" movies={upcomingMovies} textColor="text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieContainer;
