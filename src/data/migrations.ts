import { BaseDatabase } from "../data/BaseDatabase";

export class Migrations extends BaseDatabase {
  printError = (error: any) => {
    console.log(error.sqlMessage || error.message);
  };
  createTable = () =>
    this.getConnection()
      .raw(
        `
    CREATE TABLE IF NOT EXISTS lama_band (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        music_genre VARCHAR(255) NOT NULL,
        responsible VARCHAR(255) UNIQUE NOT NULL 
      );

      CREATE TABLE IF NOT EXISTS lama_shows (
        id VARCHAR(255) PRIMARY KEY,
        week_day VARCHAR(255) NOT NULL,
        start_time INT NOT NULL,
        end_time INT NOT NULL,
        band_id VARCHAR(255) NOT NULL,
        FOREIGN KEY(band_id) REFERENCES BANDAS(id)
      );
      CREATE TABLE IF NOT EXISTS lama_user (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
      );

      CREATE TABLE IF NOT EXISTS lama_ticket (
        id_ticket VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        value FLOAT NOT NULL,
        id_event varchar(255) NOT NULL,
        quantify_total_ticket float NOT NULL,
        quantify_total_solt int NOT NULL DEFAULT 0,
        FOREIGN KEY(id_event) REFERENCES lama_shows(id)
      );
      
      CREATE TABLE IF NOT EXISTS lama_photo (
        id VARCHAR(255) PRIMARY KEY,
        url TEXT(1023) NOT NULL,
        id_event varchar(255) NOT NULL,
        FOREIGN KEY(id_event) REFERENCES lama_shows(id)
      );
    `
      )
      .then(() => {
        console.log("Tabelas criadas");
      })
      .catch(this.printError);
}
const migrations = new Migrations();
migrations.createTable();
