import { ITicketData } from "../model/ITicketData";
import { Ticket } from "../model/Ticket";
import { BaseDatabase } from "./BaseDatabase";

export class TicketDataBase extends BaseDatabase implements ITicketData {
  private TABLE_TICKET = "lama_ticket";
  insertTicket = async (ticket: Ticket): Promise<void> => {
    await this.getConnection().insert(ticket).into(this.TABLE_TICKET);
  };

  getTicketById = async (id_event: string): Promise<boolean> => {
    const result = await this.getConnection()
      .from(this.TABLE_TICKET)
      .where({ id_event });

    if (result.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  getTicketByName = async (name: string): Promise<boolean> => {
    const result = await this.getConnection()
      .from(this.TABLE_TICKET)
      .where({ name });
    if (result.length === 0) {
      return true;
    } else {
      return false;
    }
  };
  ticket = async (quantifyTicket: number): Promise<Ticket[]> => {
    const result = await this.getConnection()
      .from(this.TABLE_TICKET)
      .where("quantify_total_ticket", ">=", `${quantifyTicket}`);
    return result;
  };

  ticketSolt = async (
    id: string,
    quantify_total_ticket: number,
    quantify_total_solt: number
  ): Promise<void> => {
    const [qauntifySoltTick] = await this.getConnection()
      .select("quantify_total_solt")
      .from(this.TABLE_TICKET);
    const totalSoltTicket =
      qauntifySoltTick.quantify_total_solt + quantify_total_solt;
    await this.getConnection()
      .from(this.TABLE_TICKET)
      .where({ id_ticket: id })
      .update({ quantify_total_ticket, quantify_total_solt: totalSoltTicket });
  };
}
