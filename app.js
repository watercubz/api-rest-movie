import express, { json } from "express";
import { valideMiddleware } from "./middlewares/cors.js";
import { createMovieRouter } from "./router/routes.movies.js";

export const createApp = ({ movieModel }) => {
  const app = express();
  app.use(json());
  app.use(valideMiddleware());
  app.disable("x-powered-by");

  // todos los recursos que sean MOVIES se identifica con /movies
  app.use("/movies", createMovieRouter({ movieModel }));

  const PORT = process.env.PORT ?? 4000;

  app.listen(PORT, () => {
    console.log(`server is running on port: http://localhost:${PORT}`);
  });
};
