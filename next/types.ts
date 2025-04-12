export interface ChartData {
  name: string;
  score: number;
  fullMark: number;
}

export interface City {
  id: number;
  name: string;
  prefectures_id: number;
}


export interface User {
  id: number;
  name: string;
  imagePath: string | null;
  commment: string;
}