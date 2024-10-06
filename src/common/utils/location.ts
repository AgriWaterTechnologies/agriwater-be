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
