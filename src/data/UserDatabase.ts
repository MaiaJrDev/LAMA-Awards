import { BaseDatabase } from "./BaseDatabase";
import { User, UserDataBaseDTO } from "../model/User";
import { IUSerDataBase } from "../model/IUserDataBase";

export class UserDatabase extends BaseDatabase implements IUSerDataBase {
  
  private static TABLE_NAME = "lama_user";

  public async createUser(user: UserDataBaseDTO): Promise<void> {
    try {
      await this.getConnection().insert(user).into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<UserDataBaseDTO> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return result[0];
  }
}
