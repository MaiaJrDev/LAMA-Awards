import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { ShowDTO } from "../model/Band";
import { ShowBusiness } from "../business/ShowBusiness";

export class ShowController {
  constructor(private showBusiness: ShowBusiness) {}

  async createShow(req: Request, res: Response): Promise<void> {
    try {
      const { week_day, start_time, end_time, band_id } = req.body;
      const token = req.headers.authorization;

      const input: ShowDTO = {
        token,
        week_day,
        start_time,
        end_time,
        band_id
      };

      await this.showBusiness.createShow(input);

      res.status(201).send({ message: "Show criado com sucesso" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      } else if (error) {
        res.status(400).send(error.sqlMessage);
      } else {
        res.status(500).send({ message: "Erro ao se conectar com o servidor" });
      }
    }

    await BaseDatabase.destroyConnection();
  }

  async getAllShowByday(req: Request, res: Response) {
    try {
      let day = req.params.day;
      day.toUpperCase();
      const token = req.headers.authorization;
      const allShowByDay = await this.showBusiness.returnAllShow(day, token);
      res.status(200).send({ allShowByDay });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      } else if (error) {
        res.status(400).send(error.sqlMessage);
      } else {
        res.status(500).send({ message: "Erro ao se conectar com o servidor" });
      }
    }
  }


  async getAllShow(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization;

      const shows = await this.showBusiness.getAllShow(token);

      res.status(200).send(shows);

    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      } else if (error) {
        res.status(400).send(error.sqlMessage);
      } else {
        res.status(500).send({ message: "Erro ao se conectar com o servidor" });
      }
    }

    await BaseDatabase.destroyConnection();
  }

}
