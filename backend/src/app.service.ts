import { Injectable } from "@nestjs/common";
import axios from "axios";
import { GenreDto, Movie, MovieDto } from "src/models";

@Injectable()
export class AppService {
  myFavoriteMovies: number[] = [];

  getAllPopularMovies = async (pageNumber: number) => {
    const url = `${process.env.TMDB_URL}/3/movie/popular?api_key=${process.env.API_KEY}&language=fr-FR&page=${pageNumber}`;
    try {
      const response = await axios.get<MovieDto>(url);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch popular movies");
    }
  };

  getMovieById = async (movieId: number) => {
    const url = `${process.env.TMDB_URL}/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=fr-FR`;
    return axios.get(url).then((response) => response.data);
  };

  searchPopularMovies = async (searchText: string, pageNumber: number) => {
    const url = `${process.env.TMDB_URL}/3/search/movie?api_key=${process.env.API_KEY}&language=fr-FR&query=${searchText}&page=${pageNumber}`;
    return axios.get<MovieDto>(url).then((response) => response.data);
  };

  getMovieGenres = async (): Promise<GenreDto> => {
    const url = `${process.env.TMDB_URL}/3/genre/movie/list?api_key=${process.env.API_KEY}&language=fr-FR`;
    try {
      const response = await axios.get<GenreDto>(url);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch movie genres");
    }
  };

  toggleMovieToFavorites = (movieId: number) => {
    const index = this.myFavoriteMovies.indexOf(movieId);
    if (index === -1) {
      this.myFavoriteMovies.push(movieId);
    } else {
      this.myFavoriteMovies.splice(index, 1);
    }
    return this.myFavoriteMovies;
  };

  getMoviesByIds(): Promise<Movie[]> {
    const moviePromises = this.myFavoriteMovies.map((id) =>
      this.getMovieById(id)
    );
    return Promise.all(moviePromises);
  }
}
