import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bookRoute from "./routes/booksRoutes.js";

dotenv.config();
const url = process.env.mongoURL;
const app = express();

// Middleware for parsing request bosy
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow all origins with default of cors(*)
app.use(cors());

// Option 2: Allow custom origins => More control
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to Bookstore");
});

app.use("/books", bookRoute);

mongoose
  .connect(url)
  .then(() => {
    console.log("Database running. App connected to database");

    app.listen(process.env.PORT, () => {
      console.log(
        `Server running. App is listening to port: ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
