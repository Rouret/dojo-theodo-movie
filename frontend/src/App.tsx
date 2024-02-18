import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { MovieList } from "./components/MovieList";
import { MovieProvider } from "./Context/MovieContext";
import MoviePage from "./components/MoviePage/MoviePage";
import { Favorites } from "./components/Favorites/Favorites";

function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movies/:id" element={<MoviePage />} />
        </Routes>
      </BrowserRouter>
    </MovieProvider>
  );
}

export default App;
