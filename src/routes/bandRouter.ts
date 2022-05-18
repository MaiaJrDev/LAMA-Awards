import express from "express";
import { BandUserBussines } from "../business/BandBusiness";
import { BandController } from "../controller/BandController";
import { BandUserData } from "../data/BandDataBase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
export const bandRouter = express.Router();

const idGeneration = new IdGenerator();
const authenticator = new Authenticator();
const bandData = new BandUserData();
const bandController = new BandController(
  new BandUserBussines(authenticator, idGeneration, bandData)
);
bandRouter.post("/create", (req, res) => bandController.createBand(req, res));
bandRouter.get("/getAllBands", (req, res) => bandController.getAllBands(req, res));
bandRouter.get("/:idOrName", (req, res) => bandController.getDetailBand(req, res));

