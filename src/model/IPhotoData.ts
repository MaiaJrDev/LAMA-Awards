import { Photo } from "./Photo";

export interface IPhotoData {
  insertPhoto(photo: Photo): Promise<void>;
  getPhoto(id_event: string): Promise<Photo[]>;
}
