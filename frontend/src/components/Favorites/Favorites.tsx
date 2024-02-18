import { useEffect, useState } from "react";
import styles from "./Favorites.module.css";
import MovieCard from "../MovieCard/MovieCard";
import { Link } from "react-router-dom";

import { Movie } from "../../models";
import { getFavoriteMovies } from "../../services/movieService";

export const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  const getFavoriteMoviesFromAPi = async () => {
    const favoriteMovies = await getFavoriteMovies();
    setFavoriteMovies(favoriteMovies);
  };

  useEffect(() => {
    getFavoriteMoviesFromAPi();
  }, []);

  return (
    <div className={styles.layout}>
      {favoriteMovies.map((movie) => (
        <Link
          to={`/movies/${movie.id}`}
          key={movie.id}
          style={{ textDecoration: "none" }}
        >
          <MovieCard key={movie.id} movie={movie} isFavorite={true} />
        </Link>
      ))}
    </div>
  );
};
