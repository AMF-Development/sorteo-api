import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import paymentRouter from "./modules/payment/routes/payment.routes";
import notificationRouter from "./modules/notification/routes/notification.routes";
import cors from "cors";
import ticketRouter from "./modules/ticket/routes/ticket.routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: `${process.env.FRONT_URL}`,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Rutas
app.use("/api/ticket", paymentRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/ticket", ticketRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({
    message: "Something went wrong!",
    error: err.message,
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
