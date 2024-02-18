import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { Movie } from "../models";

interface MovieContextType {
  fetchedMovies: Movie[];
  getPopularMovies: () => Promise<void>;
  getSearchedMovies: (searchText: string) => Promise<void>;
  getNextPage: () => Promise<void>;
  filteredMovies: Movie[];
  filterMoviesByGenres: (selectedGenres: number[]) => Promise<void>;
}

export const MovieContext = createContext<MovieContextType>({
  fetchedMovies: [],
  getPopularMovies: async () => { },
  getSearchedMovies: async (searchText: string) => { },
  getNextPage: async () => { },
  filteredMovies: [],
  filterMoviesByGenres: async (selectedGenres: number[]) => { },
});

interface MovieProviderProps {
  children: React.ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [fetchedMovies, setFetchedMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [checkedGenres, setCheckedGenres] = useState<number[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [fetchType, setFetchType] = useState("popular");
  const [searchText, setSearchText] = useState("");

  const getPopularMovies = async () => {
    setFetchType("popular");
    setPageNumber(2);
    try {
      const response = await axios.get<Movie[]>(
        `http://localhost:8000/cine-project/movies/popular?pageNumber=1`
      );
      setFetchedMovies(response.data);
      setFilteredMovies(response.data);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  const getSearchedMovies = async (searchText: string) => {
    setSearchText(searchText);
    setPageNumber(1);
    setFetchType("searched");
    try {
      const response = await axios.get<Movie[]>(
        `http://localhost:8000/cine-project/search`,
        {
          params: {
            pageNumber: 1,
            searchText: searchText,
          },
        }
      );
      setFetchedMovies(response.data);
      setFilteredMovies(response.data);
    } catch (error) {
      console.error("Error fetching searched movies:", error);
    }
  };

  const getMovies = async () => {
    const nextPage = pageNumber + 1;
    const url =
      fetchType === "popular"
        ? `http://localhost:8000/cine-project/movies/popular?pageNumber=${nextPage}`
        : `http://localhost:8000/cine-project/search?pageNumber=${nextPage}&searchText=${searchText}`;

    const response = await axios.get<Movie[]>(url);
    setFetchedMovies((prevMovies) => prevMovies.concat(response.data));

    if (checkedGenres.length === 0) {
      setFilteredMovies((prevMovies) => prevMovies.concat(response.data));
    } else {
      setFilteredMovies((prevMovies) =>
        prevMovies.concat(
          response.data.filter((movie) =>
            movie.genre_ids.some((id) => checkedGenres.includes(id))
          )
        )
      );
    }
  };

  const filterMoviesByGenres = async (selectedGenres: number[]) => {
    setCheckedGenres(selectedGenres);

    if (selectedGenres.length === 0) {
      setFilteredMovies(fetchedMovies);
    } else {
      setFilteredMovies(
        fetchedMovies.filter((movie) =>
          movie.genre_ids.some((id) => selectedGenres.includes(id))
        )
      );
    }
  };

  useEffect(() => {
    getMovies();
  }, [pageNumber]);

  useEffect(() => {
    if (filteredMovies.length < 20) {
      getNextPage();
    }
  }, [filteredMovies]);

  const getNextPage = async () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  return (
    <MovieContext.Provider
      value={{
        fetchedMovies,
        getPopularMovies,
        getSearchedMovies,
        getNextPage,
        filteredMovies,
        filterMoviesByGenres,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

// Custom hook for consuming context
export const useMovies = () => useContext(MovieContext);
