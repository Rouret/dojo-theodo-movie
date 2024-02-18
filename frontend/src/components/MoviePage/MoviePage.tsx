import { useEffect, useState } from "react";
import styles from "./MoviePage.module.css";
import { Link, useParams } from "react-router-dom";

import { Movie } from "../../models";
import {
  getFavoriteMoviesIds,
  getMovieById,
  toggleMovieFavoriteStatus,
} from "../../services/movieService";

const MoviePage = () => {
  const posterUrlPrefix = "https://image.tmdb.org/t/p/original/";
  const { id = "" } = useParams<string>();
  const [movie, setMovie] = useState<Movie>();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      const fetchedMovie = await getMovieById(id);
      setMovie(fetchedMovie);
      const favoriteMoviesIds = await getFavoriteMoviesIds();
      setIsFavorite(favoriteMoviesIds.includes(fetchedMovie.id));
    };

    fetchMovieData();
  }, [id]); // Attention, j'ai changé le déclencheur de useEffect à [id] pour éviter les appels infinis

  const toggleFavorites = async () => {
    await toggleMovieFavoriteStatus(id);
    setIsFavorite((prevValue) => !prevValue);
  };

  return (
    <div className={styles.moviePage}>
      <div className={styles.imageContainer}>
        <img
          src={posterUrlPrefix + movie?.poster_path}
          alt={movie?.title}
          className={styles.movieImage}
        />
      </div>
      <div className={styles.summaryContainer}>
        <h1>{movie?.title}</h1>
        <p>{movie?.overview}</p>
        <button
          className={`${styles.toggleButton} ${isFavorite ? styles.remove : styles.add
            }`}
          onClick={toggleFavorites}
        >
          {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        </button>
        <Link to={`/`} className={styles.return}>
          Retour à la page de recherche
        </Link>
      </div>
    </div >
  );
};

export default MoviePage;
