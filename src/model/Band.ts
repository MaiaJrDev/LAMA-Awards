export interface BandDTO {
  name: string;
  musicGenre: string;
  lider: string;
}

export type Band = {
  id: string;
  name: string;
  music_genre: string;
  lider: string;
};


export type DetailBandDTO = {
  token: string;
  id: string;
  name?: string;
};

export type ShowDTO = {
  token: string;
  week_day: string, 
  start_time: string, 
  end_time: string, 
  band_id: string
};


