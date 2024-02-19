import styles from "./MovieList.module.css";

import GenreList from "../GenreList/GenreList";
import MovieCard from "../MovieCard/MovieCard";
import { useMovies } from "../../Context/MovieContext";
import { useEffect } from "react";

export const MovieList = () => {
  const { getPopularMovies, movies } = useMovies();

  useEffect(() => {
    getPopularMovies();
  }, []);

  return (
    <>
      <GenreList />
      <div className={styles.layout}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};
