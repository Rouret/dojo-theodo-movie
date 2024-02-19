import { Movie } from "../../models";
import styles from "./MovieCard.module.css";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const posterUrlPrefix = "https://image.tmdb.org/t/p/original/";

  return (
    <div className={styles.movieCard}>
      <div
        className={styles.moviePoster}
        style={{
          backgroundImage: `url(${posterUrlPrefix + movie.poster_path})`,
        }}
      ></div>
      <div className={styles.movieInfo}>
        <div className={styles.movieTitle}>{movie.title}</div>
      </div>
    </div>
  );
};

export default MovieCard;
