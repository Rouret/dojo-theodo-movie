import React, { createContext, useState, useContext, useEffect } from "react";
import * as apiService from "../services/movieService";
import { Movie } from "../models";

interface MovieContextType {
  getPopularMovies: () => Promise<void>;
  getSearchedMovies: (searchText: string) => Promise<void>;
  getNextPage: () => Promise<void>;
  movies: Movie[];
  filterMoviesByGenres: (selectedGenres: number[]) => Promise<void>;
}

export const MovieContext = createContext<MovieContextType>({
  getPopularMovies: async () => {},
  getSearchedMovies: async (searchText: string) => {},
  getNextPage: async () => {},
  movies: [],
  filterMoviesByGenres: async (selectedGenres: number[]) => {},
});

interface MovieProviderProps {
  children: React.ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [fetchedMovies, setFetchedMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [checkedGenres, setCheckedGenres] = useState<number[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [fetchType, setFetchType] = useState<"popular" | "searched">("popular");

  const getPopularMovies = async () => {
    try {
      // Appel à l'API pour récupérer les films populaires
      const popularMovies = await apiService.getPopularMovies(pageNumber);
      setFilteredMovies(filteredMovies.concat(popularMovies));
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  const getSearchedMovies = async (searchText: string) => {
    try {
      // Appel à l'API pour récupérer les films correspondant à la recherche
    } catch (error) {
      console.error("Error fetching searched movies:", error);
    }
  };

  const getMovies = async () => {
    // Appel à l'API pour récupérer les films
  };

  const filterMoviesByGenres = async (selectedGenres: number[]) => {
    // Filtrer les films par les genres sélectionnés
  };

  useEffect(() => {
    getPopularMovies();
  }, [pageNumber]);

  useEffect(() => {
    if (filteredMovies.length < 20) {
      getNextPage();
    }
  }, [filteredMovies]);

  const getNextPage = async () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <MovieContext.Provider
      value={{
        movies: filteredMovies,
        getPopularMovies,
        getSearchedMovies,
        getNextPage,
        filterMoviesByGenres,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

// Custom hook for consuming context
export const useMovies = () => useContext(MovieContext);
