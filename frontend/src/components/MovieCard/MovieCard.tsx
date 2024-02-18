import React from "react";
import styles from "./MovieCard.module.css";
import { Movie } from "../../models";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
}

const MovieCard = ({ movie, isFavorite }: MovieCardProps) => {
  const posterUrlPrefix = "https://image.tmdb.org/t/p/original/";
  const maxPopularity = 10;
  const fullStars = Math.floor((movie.vote_average / maxPopularity) * 5);
  return (
    <div
      className={`${styles.movieCard} ${isFavorite ? styles.isFavorite : ""}`}
    >
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
                index < fullStars ? styles.orange : ""
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
