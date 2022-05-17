import {UserDataBaseDTO} from "./User";



export interface IUSerDataBase{
  createUser(user: UserDataBaseDTO): Promise<void>;
  getUserByEmail(email: string): Promise<UserDataBaseDTO>;
}

