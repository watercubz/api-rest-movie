import { createApp } from "./app.js";

import { MovieModel } from "./models/local-file-system/local-movie.js";

createApp({ movieModel: MovieModel });
