import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ticketRouter from "./routes/ticket.routes"; // Asegúrate de que los archivos TS están tipados correctamente
import notificationRouter from "./routes/notification-webhook.routes";

dotenv.config();

const app = express();

app.use(express.json());
console.log(process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Rutas
app.use("/api/ticket", ticketRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/success", (req: Request, res: Response) => {
  res.send("Pago exitoso!");
});

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
