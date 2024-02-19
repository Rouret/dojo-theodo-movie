import styles from "./MovieList.module.css";

import GenreList from "../GenreList/GenreList";
import MovieCard from "../MovieCard/MovieCard";
import { useMovies } from "../../Context/MovieContext";
import { useEffect } from "react";

export const MovieList = () => {
  const { getPopularMovies, movies, getNextPage } = useMovies();

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      getNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [movies]);

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
