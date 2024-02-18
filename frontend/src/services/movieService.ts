import axios from "axios";
import { Genre, Movie } from "../models";

const BASE_URL_API = "http://localhost:8000/cine-project";

export const getPopularMovies = async (page: number) => {
  const response = await axios.get<Movie[]>(
    `${BASE_URL_API}/movies/popular?pageNumber=${page}`
  );
  return response.data;
};

export const getFavoriteMoviesIds = async () => {
  const response = await axios.get<number[]>(
    `${BASE_URL_API}/favorite-movies-id`
  );
  return response.data;
};

export const getFavoriteMovies = async () => {
  const response = await axios.get<Movie[]>(`${BASE_URL_API}/favorite-movies`);

  return response.data;
};

export const getMovieById = async (movieId: string) => {
  const response = await axios.get<Movie>(`${BASE_URL_API}/movies/${movieId}`);
  return response.data;
};

export const toggleMovieFavoriteStatus = async (movieId: string) => {
  await axios.post(`${BASE_URL_API}/toggle-favorite/${movieId}`);
};

export const getGenres = async () => {
  const response = await axios.get<Genre[]>(`${BASE_URL_API}/genres`);
  return response.data;
};
