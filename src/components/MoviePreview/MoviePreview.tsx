import { POSTER_URL_PREFIX } from "../../App";
import { mockMovie } from "../../mock/mockMovie";
import { Movie } from "../../models";
import styles from "./MoviePreview.module.css";

const MoviePreview = ({movie}: {movie : Movie}) => {
  const goToMovieDetails = () => {
    // A DEFINIR EXPERT
  };
  let note = movie.vote_average/2;

  return (
  <div className={styles.movieCard} onClick={goToMovieDetails}>
    <img src = {POSTER_URL_PREFIX + mockMovie.poster_path} className={styles.moviePoster}/>
    <div className={styles.movieTitle}>{mockMovie.title}</div>
    <div className={styles.movieNote}>
    {[...Array(5)].map((_, index) => (
      <div className={`${styles.Star} ${index<note-1 ? styles.Yellow : styles.Green}`}>★</div>
  
    ))}
    </div>

  </div>);
};

export default MoviePreview;
