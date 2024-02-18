import { useEffect, useState } from "react";
import styles from "./MovieList.module.css";
import MovieCard from "../MovieCard/MovieCard";
import { useMovies } from "../../Context/MovieContext";
import { Link } from "react-router-dom";
import { getFavoriteMoviesIds } from "../../services/movieService";
import GenreList from "../GenreList/GenreList";

export const MovieList = () => {
  const { filteredMovies, getPopularMovies, getNextPage } = useMovies();

  const [favoriteMoviesIds, setFavoriteMoviesIds] = useState<number[]>([]);

  const getFavoriteMoviesIdsFromApi = async () => {
    const favoriteMoviesIds = await getFavoriteMoviesIds();
    setFavoriteMoviesIds(favoriteMoviesIds);
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      getNextPage();
    }
  };

  useEffect(() => {
    getFavoriteMoviesIdsFromApi();
    if (filteredMovies.length === 0) {
      getPopularMovies();
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [filteredMovies]);

  return (
    <>
      <GenreList />
      <div className={styles.layout}>
        {filteredMovies.map((movie) => (
          <Link
            to={`/movies/${movie.id}`}
            key={movie.id}
            style={{ textDecoration: "none" }}
          >
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favoriteMoviesIds.includes(movie.id)}
            />
          </Link>
        ))}
      </div>
    </>
  );
};
