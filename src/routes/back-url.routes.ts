import { Router } from "express";

const backUrlRouter = Router();

backUrlRouter.get("/pago-confirmado", async (req, res) => {
  res.json({ status: "success", message: "Pago confirmado exitosamente" });
});

backUrlRouter.get("/pago-fallido", async (req, res) => {
  res.json({
    status: "failure",
    message: "El pago ha fallado, por favor intenta de nuevo",
  });
});

backUrlRouter.get("/pago-pendiente", async (req, res) => {
  res.json({
    status: "pending",
    message: "Tu pago está pendiente, te notificaremos cuando se confirme",
  });
});

export default backUrlRouter;
