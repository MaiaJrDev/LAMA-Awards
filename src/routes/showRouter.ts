import express from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { ShowController } from "../controller/ShowController";
import { ShowDataBase } from "../data/ShowDataBase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export const showRouter = express.Router();

const idGeneration = new IdGenerator();
const authenticator = new Authenticator();
const showData = new ShowDataBase();

const showBusiness = new ShowBusiness(authenticator, idGeneration, showData);
const showController = new ShowController(showBusiness);

showRouter.post("/create", (req, res) => showController.createShow(req, res));
showRouter.get("/getAllShows", (req, res) => showController.getAllShow(req, res));
showRouter.get("/:day", (req, res) => showController.getAllShowByday(req, res));
