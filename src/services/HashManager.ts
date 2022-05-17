import * as bcrypt from "bcryptjs";

export class HashManager {
  // public async hash(text: string): Promise<string> {
  //     const rounds = 12;
  //     const salt = await bcrypt.genSalt(rounds);
  //     const result = await bcrypt.hash(text, salt);
  //     return result;
  // }

  // public async compare(text: string, hash: string): Promise<boolean>{
  //     return await bcrypt.compare(text, hash);
  // }
  createHash = (plainText: string): string => {
    const cost: number = 12;
    const salt: string = bcrypt.genSaltSync(cost);
    const cypherText: string = bcrypt.hashSync(plainText, salt);
    return cypherText;
  };
  compareHash = (plainText: string, cypherText: string): boolean => {
    return bcrypt.compareSync(plainText, cypherText);
  };
}
