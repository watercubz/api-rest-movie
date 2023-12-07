import msql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "sosadev16",
  database: "moviesdb",
};

const connection = await msql.createConnection(config);

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase();

      const [genres] = await connection.query(
        "SELECT id, name FROM genre WHERE LOWER(name) = ?;",
        [lowerCaseGenre]
      );
      // no genre found
      if (genres.length === 0) return [];

      // get the id from the firs genre result
      const [{ id }] = genres;

      // get all movies ids from database table
      // la query a movie_genres
      //join
      // y devolver los resultados...
      return [];
    }

    const [movies] = await connection.query(
      "SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie "
    );
    return movies;
  }

  static async getById({ id }) {
    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    );

    if (movies === 0) return null;

    return movies[0];
  }

  static async create({ input }) {
    const {
      genre: genreInput,
      title,
      year,
      duration,
      director,
      rate,
      poster,
    } = input;

    const [uuidResult] = await connection.query(`SELECT UUID() uuid;`);
    const [{ uuid }] = uuidResult;

    // Evita la inyección SQL utilizando parámetros de marcadores de posición (?)
    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate)
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [title, year, director, duration, poster, rate]
      );
    } catch (e) {
      throw new Error("error creating movie");
    }

    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
         FROM movie WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    );
    return movies[0];
  }

  static async delete({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) return false;

    movies.splice(movieIndex, 1);
    return true;
  }

  static async update({ id, input }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) return false;

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input,
    };

    return movies[movieIndex];
  }
}
