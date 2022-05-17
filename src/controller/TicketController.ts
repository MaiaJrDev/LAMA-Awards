import { Request, Response } from "express";
import { TicketBusiness } from "../business/TicketBusiness";
import { buyTicketDTO, Ticket, TicketDTO } from "../model/Ticket";

export class TicketController {
  constructor(private ticketBusiness: TicketBusiness) {}
  async createTicket(req: Request, res: Response): Promise<void> {
    try {
      const { name, value, idEvent, quantifyTicket } = req.body;
      const token = req.headers.authorization;
      const newValue = Number(value);
      const input: TicketDTO = {
        name,
        value: newValue,
        id_event: idEvent,
        quantifyTicket
      };
      await this.ticketBusiness.createTicket(input, token);
      res.status(201).send({ message: "Ingresso criado com sucesso" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      } else if (error) {
        res.status(400).send({ message: error.sqlMessage });
      } else {
        res.status(500).send({ message: "Erro ao se conectar no servidor" });
      }
    }
  }

  async buyTicket(req: Request, res: Response): Promise<void> {
    try {
      const { quantifyTicket, name } = req.body;
      const token = req.headers.authorization;
      const newQuantify = Number(quantifyTicket);
      const ticketInput: buyTicketDTO = {
        name,
        quantifyTicket: newQuantify
      };
      const ticket = await this.ticketBusiness.buyTicket(ticketInput, token);
      res.status(200).send({ message: "Ingresso vendido", ticket });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      } else if (error) {
        res.status(400).send({ message: error.sqlMessage });
      } else {
        res.status(500).send({ message: "Erro ao se conectar no servidor" });
      }
    }
  }
}
