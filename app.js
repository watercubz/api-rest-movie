const express = require("express");
const movies = require("./movie.json");
const crypto = require("node:crypto");
const { validateMovie, validatePartialMovie } = require("./schema/movieSchema");

const app = express();
app.use(express.json());
app.disable("x-powered-by");

const ACCEPTED_ORIGINS = [
  "http://localhost:49302",
  "http://localhost:4000",
  "http://localhost:5173",
  "http://localhost:1234",
  "http://localhost:8080",
];

// todos los recursos que sean MOVIES se identifica con /movie
app.get("/movies", (req, res) => {
  const origin = req.header("origin");
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    res.json(filteredMovies);
  }
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  // path-to-regexp
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);

  res.status(404).json({ message: "Movie not found" });
});

app.post("/movies", (req, res) => {
  const result = validateMovie(req.body);

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    ...result.data,
  };

  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.delete("/movies/:id", (req, res) => {
  const origin = req.header("origin");
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  movies.slice(movieIndex, 1);

  return res.json({ message: "Movie deleted" });
});

app.patch("/movies/:id", (req, res) => {
  const result = validatePartialMovie(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  };
  movies[movieIndex] = updateMovie;

  return res.json(updateMovie);
});

app.options("/movies/:id", (req, res) => {
  const origin = req.header("origin");
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  }
  res.send(200);
});

const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
  console.log(`server is running on port: http://localhost:${PORT}`);
});
