import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NavBar from "./components/Navbar";
import { MovieProvider } from "./contexts/MovieContext";
import MovieDetails from "./pages/MovieDetails";

function Footer() {
  return (
    <footer className="footer">
      <p>
        This product uses the TMDB API but is not endorsed or certified by TMDB.{" "}
        <br />© 2025, yuyu
      </p>
    </footer>
  );
}

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/movie-search/" element={<Home />} />
          <Route path="/movie-search/favorites" element={<Favorites />} />
          <Route path="/movie-search/movie/:id" element={<MovieDetails />} />
        </Routes>
      </main>
      <Footer />
    </MovieProvider>
  );
}

export default App;
