import express from "express";
import { TicketBusiness } from "../business/TicketBusiness";
import { TicketController } from "../controller/TicketController";
import { TicketDataBase } from "../data/TicketDataBase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export const ticketRouter = express.Router();
const idGeneration = new IdGenerator();
const authenticator = new Authenticator();
const ticketData = new TicketDataBase();
const ticketBusiness = new TicketBusiness(
  authenticator,
  idGeneration,
  ticketData
);

const ticketController = new TicketController(ticketBusiness);
ticketRouter.post("/create", (req, res) =>
  ticketController.createTicket(req, res)
);

ticketRouter.post("/buy", (req, res) => ticketController.buyTicket(req, res));
