import { Router } from "express";

const notificationRouter = Router();

// POST /api/tickets - Crear un nuevo ticket
notificationRouter.post("/", (req, res) => {
  console.log(req.body);
  console.log("Notification received");
  // Handle the request and response here
});

// GET /api/tickets - Obtener todos los tickets
// router.get("/", ticketController.getAllTickets);

export default notificationRouter;
