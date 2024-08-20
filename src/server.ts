import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import paymentRouter from "./routes/payment.routes"; // Asegúrate de que los archivos TS están tipados correctamente
import notificationRouter from "./routes/notification.routes";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
console.log(process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Rutas
app.use("/api/ticket", paymentRouter);
app.use("/api/notification", notificationRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({
    message: "Something went wrong!",
    error: err.message,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
