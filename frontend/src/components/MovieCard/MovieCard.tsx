import { Movie } from "../../models";
import styles from "./MovieCard.module.css";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const posterUrlPrefix = "https://image.tmdb.org/t/p/original/";
  const rating = Math.floor((movie.vote_average * 5) / 10);
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
        <div className={styles.starRating}>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`${styles.star} ${
                index < rating ? styles.orange : ""
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
