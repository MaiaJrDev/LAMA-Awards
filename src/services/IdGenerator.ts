import { v4 } from "uuid";

export class IdGenerator {
  generationId = (): string => {
    return v4();
  };
}
