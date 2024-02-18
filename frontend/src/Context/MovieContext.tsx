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
  getPopularMovies: async () => {},
  getSearchedMovies: async (searchText: string) => {},
  getNextPage: async () => {},
  filteredMovies: [],
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
  const [fetchType, setFetchType] = useState<"popular" | "searched">("popular");
  const [searchText, setSearchText] = useState("");

  const getPopularMovies = async () => {
    try {
      // Appel à l'API pour récupérer les films populaires
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
    getMovies();
  }, [pageNumber]);

  useEffect(() => {
    if (filteredMovies.length < 20) {
      getNextPage();
    }
  }, [filteredMovies]);

  const getNextPage = async () => {
    // Mettre à jour le numéro de page
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
