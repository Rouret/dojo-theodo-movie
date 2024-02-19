import styles from "./MovieList.module.css";

import GenreList from "../GenreList/GenreList";
import MovieCard from "../MovieCard/MovieCard";
import { mockMovie } from "../../mock/mockMovie";

export const MovieList = () => {
  return (
    <>
      <GenreList />
      <div className={styles.layout}>
        <MovieCard movie={mockMovie} />
      </div>
    </>
  );
};
