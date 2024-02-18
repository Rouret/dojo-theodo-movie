// AAA
export interface Movie {
  id: number;
  title: string;
  releaseDate: Date;
  overview: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  genre_ids: number[];
  poster_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreDto {
  genres: Genre[];
}

export interface MovieDto {
  page: number;
  results: Movie[];
}
