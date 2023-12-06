import { createApp } from "./app.js";

import { MovieModel } from "./models/mysql/movie-sql.js";

createApp({ movieModel: MovieModel });
