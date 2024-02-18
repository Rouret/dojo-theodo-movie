import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { useMovies } from "../../Context/MovieContext";
import { Link } from "react-router-dom";
import { Clapperboard, Search } from "lucide-react";

export const Navbar = () => {
  const [searchText, setSearchText] = useState<string>("");
  const { getPopularMovies, getSearchedMovies } = useMovies();
  const [timeoutId, setTimeoutId] = React.useState<NodeJS.Timeout | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchText(newValue);
    if (timeoutId) clearTimeout(timeoutId);

    setTimeoutId(
      setTimeout(() => {
        if (newValue === "") {
          return getPopularMovies();
        }
        return getSearchedMovies(newValue);
      }, 500)
    );
  };

  return (
    <nav className={styles.navbar}>
      <Link to={`/`} style={{ textDecoration: "none" }}>
        <div className={styles.logo} style={{ color: "white" }}>
          <Clapperboard size={32} />
          <h2>Cine-Project</h2>
        </div>
      </Link>
      <Link
        to={`/favorites`}
        style={{ textDecoration: "none", color: "white" }}
      >
        <h3>Mes films</h3>
      </Link>

      <div className={styles.searchBar}>
        <div className={styles.searchBarContainer}>
          <Search size={24} />
          <input
            className={styles.searchBarInput}
            type="text"
            placeholder="Recherche ton film préféré..."
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </nav>
  );
};
