
export class Area {

  $key: string;
  title: string;
  description: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  placesCount: number;
  priority: number;

  static fromJSON({$key, title, description, imageUrl, latitude, longitude, placesCount, priority}: any): Area {
    return new Area($key, title, description, imageUrl, latitude, longitude, placesCount, priority );
  }

  static fromJSONArray(json: any[]): Area[] {
    return json.map(Area.fromJSON);
  }

  constructor(
    $key: string,
    title: string,
    description: string,
    imageUrl: string,
    latitude: number,
    longitude: number,
    placesCount: number,
    priority: number
  ) {

    this.$key = $key || '';
    this.title = title || '';
    this.description = description || '';
    this.imageUrl = imageUrl || '';
    this.latitude = latitude || 0;
    this.longitude = longitude || 0;
    this.placesCount = placesCount || 0;
    this.priority = priority || 0;

  }

}

