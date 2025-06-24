import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/MovieCard.css";
import MovieCard from "../components/MovieCard";

const API_KEY = "5e38073b687436663fb4e0038fc5bed7";
const BASE_URL = "https://api.themoviedb.org/3";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        if (!res.ok) throw new Error("Movie not found");
        const data = await res.json();
        setMovie(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  useEffect(() => {
    async function fetchSimilar() {
      if (!id) return;
      try {
        const res = await fetch(
          `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`
        );
        if (!res.ok) return;
        const data = await res.json();
        setSimilar(data.results || []);
      } catch {}
    }
    fetchSimilar();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return null;

  return (
    <div
      className="movie-details"
      style={{
        maxWidth: 700,
        margin: "2rem auto",
        background: "#181818",
        borderRadius: 12,
        padding: 24,
      }}
    >
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{
          width: 250,
          float: "left",
          marginRight: 24,
          borderRadius: 8,
        }}
      />
      <div>
        <p>
          <b>Release:</b> {movie.release_date}
        </p>
        <p>
          <b>Rating:</b> {movie.vote_average?.toFixed(1)} / 10
        </p>
        <p>
          <b>Genres:</b> {movie.genres?.map((g) => g.name).join(", ")}
        </p>
        <p>
          <b>Overview:</b> {movie.overview}
        </p>
        <p>
          <b>Runtime:</b> {movie.runtime} min
        </p>
        <p>
          <b>Status:</b> {movie.status}
        </p>
      </div>
      <div style={{ clear: "both" }}></div>
      {similar.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h3 style={{ marginBottom: 16 }}>Similar Movies</h3>
          <div className="similar-movies-grid">
            {similar.slice(0, 8).map((m) => (
              <MovieCard movie={m} key={m.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
