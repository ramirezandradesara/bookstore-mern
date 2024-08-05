import express from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to Bookstore");
});

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Database running. App connected to database");

    app.listen(PORT, () => {
      console.log(`Server running. App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
