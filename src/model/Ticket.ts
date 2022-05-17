export type TicketDTO = {
  name: string;
  value: number;
  id_event: string;
  quantifyTicket: number;
};

export type Ticket = {
  id_ticket: string;
  name: string;
  value: number;
  id_event: string;
  quantify_total_ticket: number;
};
export type buyTicketDTO = {
  name: string;
  quantifyTicket: number;
};
