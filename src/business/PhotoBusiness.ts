import { IPhotoData } from "../model/IPhotoData";
import { IShowData } from "../model/IShowData";
import { Photo, PhotoDto } from "../model/Photo";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class PhotoBusiness {
  constructor(
    private idGeneration: IdGenerator,
    private authentication: Authenticator,
    private photoData: IPhotoData,
    private showDataBase: IShowData
  ) {}
  async addPhoto(photoInput: PhotoDto, token: string): Promise<void> {
    const { url, id_event } = photoInput;
    if (!url || !id_event) {
      throw new Error("Verifique se todos os campos foram preenchidos");
    }
    if (!token) {
      throw new Error("É necessário passar o token de acesso");
    }
    const tokenData = this.authentication.getData(token);
    if (!tokenData) {
      throw new Error("Usuário deslogado");
    }
    const id = this.idGeneration.generationId();
    const verifyExistShow = await this.showDataBase.verifyExistShow(id_event);
    if (!verifyExistShow) {
      throw new Error("Esse evento não existe");
    }

    const photo: Photo = {
      id,
      url,
      id_event
    };
    await this.photoData.insertPhoto(photo);
  }

  async getAllPhotoByEvent(idEvent: string, token: string): Promise<Photo[]> {
    if (!idEvent) {
      throw new Error("É necessário passar o id do evento!");
    }
    if (!token) {
      throw new Error("É necessário passar o token de acesso!");
    }

    const tokenData = this.authentication.getData(token);
    if (!tokenData) {
      throw new Error("Usuário deslogado");
    }
    const photos = await this.photoData.getPhoto(idEvent);
    if (photos.length === 0) {
      throw new Error("Sem fotos");
    }
    
    return photos;
  }
}
