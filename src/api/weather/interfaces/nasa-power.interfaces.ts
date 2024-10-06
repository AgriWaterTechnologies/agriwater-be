export interface NasaPowerResponse {
  type: string;
  geometry: Geometry;
  properties: Properties;
  header: Header;
  messages: string[];
  parameters: Parameters;
  times: Times;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties {
  parameter: Parameter;
}

export interface Parameter {
  T2M: Record<string, number>;
  PRECTOTCORR: Record<string, number>;
}

export interface Header {
  title: string;
  api: Api;
  sources: string[];
  fill_value: number;
  start: string;
  end: string;
}

export interface Api {
  version: string;
  name: string;
}

export interface Parameters {
  T2M: T2MParams;
  PRECTOTCORR: PrectotcorrParams;
}

export interface T2MParams {
  units: string;
  longname: string;
}

export interface PrectotcorrParams {
  units: string;
  longname: string;
}

export interface Times {
  data: number;
  process: number;
}
