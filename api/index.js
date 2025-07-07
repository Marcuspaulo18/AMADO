import express from "express";
import cors from "cors";
import userRoutes from "./rotas/rotas.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/",userRoutes);
// Start the server
app.listen(5050, () => {
  console.log("Server is running on port 5050");
});