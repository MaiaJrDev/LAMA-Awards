import {
  UserInputDTO,
  LoginInputDTO,
  UserDataBaseDTO,
} from "../model/User";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IUSerDataBase } from "../model/IUserDataBase";

export class UserBusiness {
  private idGenerator: IdGenerator;
  private autenthicator: Authenticator;
  private hashPassword: HashManager;
  private userData: IUSerDataBase;
  constructor(userRepository: IUSerDataBase) {
    this.userData = userRepository;
    this.idGenerator = new IdGenerator();
    this.hashPassword = new HashManager();
    this.autenthicator = new Authenticator();
  }

  signup = async (input: UserInputDTO): Promise<string> => {
    const { name, email, password, role } = input;
    if (!name || !email || !password) {
      throw new Error(
        "Por favor, preencha os campos 'name', 'email' e 'password' "
      );
    }
    if (email.indexOf("@") === -1) {
      throw new Error(
        "Formato de email invalido !"
      );
    }
    if (password.length < 8) {
      throw new Error("A senha tem que ter no mínimo 8 caracteres");
    }
    
    const verifyExistUser = await this.userData.getUserByEmail(email);


    if (verifyExistUser) {
      throw new Error("Usuário já existe");
    }

    const id = this.idGenerator.generationId();
    const newPassword = this.hashPassword.createHash(password);
    const user: UserDataBaseDTO = {
      id,
      name,
      email,
      password: newPassword,
      role
    };

    this.userData.createUser(user);

    const accessToken = this.autenthicator.generateToken({
      id,
      role: user.role
    });
    return accessToken;
  };
   async getUserByEmail(user: LoginInputDTO) {
    const { email, password } = user;
    
    const userFromDB = await this.userData.getUserByEmail(email);

    if (!email || !password) {
      throw new Error("Por favor verifique os campos 'email' e 'password'");
    }
    const isPassword = this.hashPassword.compareHash(
      password,
      userFromDB.password
    );
    if (!userFromDB || !isPassword) {
      throw new Error("Email ou senha inválidos");
    }

    const accessToken = this.autenthicator.generateToken({
      id: userFromDB.id,
      role: userFromDB.role
    });

    return accessToken;
  }
}
