import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cornRoutes from "./routes/cornRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

// Middleware
app.use(express.json()); // Reemplaza bodyParser.json()
app.use(
  cors({
    origin: ["http://localhost:5173", "https://ejido-san-marcos.netlify.app","https://foto-magica.netlify.app"],
  })
);

// Conexión a la base de datos
mongoose
.connect(
  "mongodb+srv://luis:220690@ejido.lpplq.mongodb.net/?retryWrites=true&w=majority&appName=ejido"
)
.then(() => console.log("Conectado a MongoDB"))
.catch((err) => console.error("Error al conectar a MongoDB:", err));

// Rutas
app.use("/api/corn", cornRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🌽 Bob's Corn server is running on http://localhost:${PORT}`);
});

