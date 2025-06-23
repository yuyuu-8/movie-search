import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NavBar from "./components/Navbar";

function App() {
  return (
    <div>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/movie-search/" element={<Home />} />
          <Route path="/movie-search/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
