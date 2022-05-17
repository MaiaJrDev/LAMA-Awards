import express from "express";
import { PhotoBusiness } from "../business/PhotoBusiness";
import { PhotoController } from "../controller/PhotoController";
import { PhotoDataBase } from "../data/PhotoDataBase";
import { ShowDataBase } from "../data/ShowDataBase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
export const photoRouter = express.Router();
const photoBusiness = new PhotoBusiness(
  new IdGenerator(),
  new Authenticator(),
  new PhotoDataBase(),
  new ShowDataBase()
);
const photoController = new PhotoController(photoBusiness);
photoRouter.post("/add", (req, res) => photoController.addPhoto(req, res));
photoRouter.get("/:idEvent", (req, res) =>
  photoController.getAllPhotoByEvent(req, res)
);
