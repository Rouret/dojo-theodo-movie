import { useEffect, useState } from "react";
import styles from "./GenreList.module.css";

import { Genre } from "../../models";
import { useMovies } from "../../Context/MovieContext";
import { getGenres } from "../../services/movieService";

const GenreList = () => {
  const [fetchedGenres, setFetchedGenres] = useState<Genre[]>([]);
  const [checkedGenres, setCheckedGenres] = useState<number[]>([]);

  const { filterMoviesByGenres } = useMovies();

  const getGenresFromApi = async () => {
    const genres = await getGenres();
    setFetchedGenres(genres);
  };

  useEffect(() => {
    getGenresFromApi();
  }, []);

  useEffect(() => {
    filterMoviesByGenres(checkedGenres);
  }, [checkedGenres]);

  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setCheckedGenres((prevCheckedGenres) => [...prevCheckedGenres, id]);
      return;
    }
    setCheckedGenres((prevCheckedGenres) =>
      prevCheckedGenres.filter((checkedId) => checkedId !== id)
    );
  };

  return (
    <div className={styles.checkboxesContainer}>
      {fetchedGenres.map((genre: Genre) => (
        <div key={genre.id} className={styles.checkbox}>
          <input
            type="checkbox"
            id={`checkbox-${genre.id}`}
            onChange={(e) => handleCheckboxChange(genre.id, e.target.checked)}
          />
          <label htmlFor={`checkbox-${genre.id}`}>{genre.name}</label>
        </div>
      ))}
    </div>
  );
};

export default GenreList;
