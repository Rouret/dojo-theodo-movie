import styles from "./MovieList.module.css";

import GenreList from "../GenreList/GenreList";

export const MovieList = () => {
  return (
    <>
      <GenreList />
      <div className={styles.layout}></div>
    </>
  );
};
