import { Request, Response } from "express";
import { PhotoBusiness } from "../business/PhotoBusiness";
import { PhotoDto } from "../model/Photo";

export class PhotoController {
  constructor(private photoBusiness: PhotoBusiness) {}
  async addPhoto(req: Request, res: Response): Promise<void> {
    try {
      const { url, idEvent } = req.body;
      const token = req.headers.authorization;
      const input: PhotoDto = {
        url,
        id_event: idEvent
      };
      await this.photoBusiness.addPhoto(input, token);
      res.status(201).send({ message: "Foto adicionada com sucesso!" });
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
  async getAllPhotoByEvent(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization;
      const idEvent = req.params.idEvent;
      const photo = await this.photoBusiness.getAllPhotoByEvent(idEvent, token);
      res.status(200).send({ photo });
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
