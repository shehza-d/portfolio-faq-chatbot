import express, { urlencoded, json } from "express";
import "dotenv/config";
import axios from "axios";
import path from "path";
import cors from "cors";

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: ["https://shehzad.vercel.app"] }));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use((req, res, next) => {
  console.log(`Path ${req.path} with Method ${req.method}`);
  next();
});


// app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});


