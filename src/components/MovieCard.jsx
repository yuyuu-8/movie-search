import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { GENRES } from "../services/genres";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  const genreNames = movie.genre_ids
    ? movie.genre_ids
        .map((id) => GENRES.find((g) => g.id === id)?.name)
        .filter(Boolean)
    : [];

  return (
    <Link to={`/movie-search/movie/${movie.id}`} className="movie-card-link">
      <div className="movie-card">
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-overlay">
            <button
              className={`favorite-btn ${favorite ? "active" : ""}`}
              onClick={onFavoriteClick}
            >
              ♥
            </button>
          </div>
        </div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.split("-")[0]}</p>
          {genreNames.length > 0 && (
            <div className="movie-genres">
              {genreNames.map((name) => (
                <span className="movie-genre-tag" key={name}>
                  {name}
                </span>
              ))}
            </div>
          )}
          {typeof movie.vote_average === "number" && (
            <div className="user-rating">★ {movie.vote_average.toFixed(1)}</div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
