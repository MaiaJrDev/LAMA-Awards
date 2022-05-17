import { Ticket } from "./Ticket";

export interface ITicketData {
  insertTicket(ticket: Ticket): Promise<void>;
  getTicketById(id: string): Promise<boolean>;
  getTicketByName(name: string): Promise<boolean>;
  ticket(quantifyTicket: number): Promise<Ticket[]>;
  ticketSolt(
    id: string,
    quantify_total_ticket: number,
    quantify_total_solt: number
  ): Promise<void>;
}
