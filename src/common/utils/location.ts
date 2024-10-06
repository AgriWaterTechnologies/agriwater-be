export interface Coordinates {
  lat: number;
  lon: number;
}

export function generateBoundingBox(
  center: Coordinates,
  offset: number,
): { topLeft: Coordinates; bottomRight: Coordinates } {
  const { lat, lon } = center;

  const topLeft = {
    lat: lat + offset,
    lon: lon - offset,
  };

  const bottomRight = {
    lat: lat - offset,
    lon: lon + offset,
  };

  return { topLeft, bottomRight };
}

export function encodeCoordinates(coordinates: Coordinates[]) {
  return JSON.stringify(coordinates.map(({ lat, lon }) => [lat, lon]));
}

export function decodeCoordinates(encodedCoordinates: string): Coordinates[] {
  return JSON.parse(encodedCoordinates).map(([lat, lon]: number[]) => ({
    lat,
    lon,
  }));
}

export function getCentralPoint(coord: Coordinates[]) {
  const x = coord.map((c) => c.lat);
  const y = coord.map((c) => c.lon);

  const minX = Math.min(...x);
  const maxX = Math.max(...x);
  const minY = Math.min(...y);
  const maxY = Math.max(...y);

  return {
    lat: (minX + maxX) / 2,
    lon: (minY + maxY) / 2,
  };
}

export function parseCentralPoint(centralPoint: string) {
  const [lat, lon] = JSON.parse(centralPoint);
  return {
    lat,
    lon,
  };
}
