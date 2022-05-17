import { IPhotoData } from "../model/IPhotoData";
import { Photo } from "../model/Photo";
import { BaseDatabase } from "./BaseDatabase";

export class PhotoDataBase extends BaseDatabase implements IPhotoData {
  private TABLE_PHOTO = "lama_photo";
  async insertPhoto(photo: Photo): Promise<void> {
    await this.getConnection().insert(photo).into(this.TABLE_PHOTO);
  }

  async getPhoto(id_event: string): Promise<Photo[]> {
    const result = await this.getConnection()
      .from(this.TABLE_PHOTO)
      .where({ id_event });
    
    return result;
  }
}
