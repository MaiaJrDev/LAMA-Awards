import express, { request, response } from "express";
import { BandUserBussines } from "../business/BandBusiness";
import { UserBusiness } from "../business/UserBusiness";
import { BandController } from "../controller/BandController";
import { UserController } from "../controller/UserController";
import { BandUserData } from "../data/BandDataBase";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export const userRouter = express.Router();
const userData = new UserDatabase();
const userBusiness = new UserBusiness(userData);
const userController = new UserController(userBusiness);

const idGeneration = new IdGenerator();
const authenticator = new Authenticator();
const bandData = new BandUserData();
const bandController = new BandController(
  new BandUserBussines(authenticator, idGeneration, bandData)
);
userRouter.post("/signup", (req, res) => userController.signup(req, res));
userRouter.post("/login", (req, res) => userController.login(req, res));



// userRouter.get("/:id", (req, res) => bandController.getDetailBand(req, res));
