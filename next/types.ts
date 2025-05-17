export type ResultType = "Success" | "Error";


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

export interface Prefecture {
  id: number;
  name: string;
};

export interface Rating {
  id: number;
  review_id: number;
  safety: number;
  public_transportation: number;
  child_rearing: number;
  city_policies: number;
  livability: number;
  created_at: string;
  updated_at: string;
};

export interface Photo {
  id: number;
  review_id: number;
  photo_url: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export interface Review {
  id: number;
  user_id: number;
  city_id: number;
  prefecture_id: number;
  good_comment: string;
  bad_comment: string;
  created_at: string;
  updated_at: string;
  city: City;
  prefecture: Prefecture;
  rating: Rating;
  photos: Photo[];
  likes: unknown[]; // 型が不明なため。必要に応じて定義してください
  user: User;
};