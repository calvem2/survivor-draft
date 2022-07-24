export interface Castaway {
  name: string;
  occupation: string;
  points: Points;
}

export interface Points {
  "1"?: object;
  "2"?: object;
  "3"?: object;
  "4"?: object;
  "5"?: object;
}

export interface PointRecord {
  "pts": number;
  "multiplier": number;
}