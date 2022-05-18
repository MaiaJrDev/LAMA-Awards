import { Show } from "./User";

export interface IShowData {
  InsertShow(input: Show): Promise<void>;
  getBandById(id: string): Promise<boolean>;
  getShowByDay(day: string): Promise<Show[]>;
  getVerifyAvailableTime(
    week_day: string,
    start_time: number,
    end_time: number
  ): Promise<boolean>;
  verifyExistShow(id: string): Promise<boolean>;
  getAllShows(): Promise<Show[]>;
}
