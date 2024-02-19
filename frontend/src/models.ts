export interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  genres: number[];
  genre_ids: number[];
  poster_path: string;
}

export interface Genre {
  id: number;
  name: string;
}
