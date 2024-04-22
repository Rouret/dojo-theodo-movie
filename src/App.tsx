import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MovieProvider } from "./context/MovieContext";
import { Header } from "./components/Header/Header";
import { MovieCatalog } from "./components/MovieCatalog/MovieCatalog";
import { FavoriteMovies } from "./components/FavoriteMovies/FavoriteMovies";
import MovieDetails from "./components/MovieDetails/MovieDetails";

export const POSTER_URL_PREFIX = "https://image.tmdb.org/t/p/original/";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MovieProvider>
          <Header />
          <Routes>
            <Route path="/" element={<MovieCatalog />} />
            <Route path="/favorites" element={<FavoriteMovies />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
          AAAA
        </MovieProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
