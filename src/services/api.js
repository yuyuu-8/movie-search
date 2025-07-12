const API_KEY = "5e38073b687436663fb4e0038fc5bed7";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );
    if (!response.ok) throw new Error("Network error: " + response.status);
    const data = await response.json();
    if (!data.results) throw new Error("No results returned");
    return data.results;
  } catch (err) {
    throw new Error(
      "Failed to fetch popular movies: " +
        err.message +
        "Try turning VPN on and reload the page"
    );
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );
    if (!response.ok) throw new Error("Network error: " + response.status);
    const data = await response.json();
    if (!data.results) throw new Error("No results returned");
    return data.results;
  } catch (err) {
    throw new Error(
      "Failed to search movies: " +
        err.message +
        "Try turning VPN on and reload the page"
    );
  }
};
