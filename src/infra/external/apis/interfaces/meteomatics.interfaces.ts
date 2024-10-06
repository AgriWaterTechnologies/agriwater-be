export interface MeteomaticsResponse {
  version: string;
  user: string;
  dateGenerated: string;
  status: string;
  data: Data[];
}

export interface Data {
  parameter: string;
  coordinates: Coordinate[];
}

export interface Coordinate {
  lat: number;
  lon: number;
  dates: Date[];
}

export interface Date {
  date: string;
  value: number;
}
