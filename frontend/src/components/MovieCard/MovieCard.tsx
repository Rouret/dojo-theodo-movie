import { Movie } from "../../models";
import styles from "./MovieCard.module.css";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const posterUrlPrefix = "https://image.tmdb.org/t/p/original/";

  console.log(movie);

  return <div className={styles.movieCard}></div>;
};

export default MovieCard;
