import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
  constructor(private userBusiness: UserBusiness) {}
  async signup(req: Request, res: Response): Promise<string> {
    try {
      const { name, email, password, role } = req.body;
      const input: UserInputDTO = {
        email,
        name,
        password,
        role
      };
      
      const token = await this.userBusiness.signup(input);

      res.status(201).send({ message: "Usuário criado com sucesso", token });
      return token;
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

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const loginData: LoginInputDTO = {
        email,
        password
      };
      const token = await this.userBusiness.getUserByEmail(loginData);

      res.status(200).send({ token });
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
