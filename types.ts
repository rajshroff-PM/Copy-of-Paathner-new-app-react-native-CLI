export interface Coordinate {
  x: number;
  y: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
}

export interface Store {
  id: string;
  name: string;
  category: string;
  iconName: string;
  color: string;
  position: Coordinate;
  floor: string;
  hours: string;
  description: string;
  rating?: number;
  image?: string;
  menu?: MenuItem[];
  offer?: string;
}

export interface ParkingZone {
  id: string;
  name: string;
  level: string;
  capacity: number;
  occupied: number;
  type: '4-Wheeler' | '2-Wheeler' | 'EV Charging';
  position: Coordinate;
  bounds: { x: number, y: number, width: number, height: number };
  color: string;
}

export interface SavedVehicle {
  zoneId: string;
  slotNumber: string;
  level: string;
  timestamp: number;
  photo?: string;
  position: Coordinate;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  image: string;
  color: string;
  position: Coordinate;
  floor: string;
  isSharing: boolean;
  lastUpdate: string;
}

export interface GeoJSONFeature {
  type: 'Feature';
  properties: {
    type: 'boundary' | 'unit';
    storeId?: string;
    name?: string;
  };
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
}

export interface GeoJSON {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

export type AvatarId = 'glider' | 'cat' | 'bot';

export interface ChatSource {
  title: string;
  uri: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  sources?: ChatSource[];
  relatedStore?: Store;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
  category: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export interface BlogPost {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
  image?: string;
}

export interface LostItem {
  id: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  category: string;
  date: string;
  location: string;
  image?: string;
  status: 'open' | 'resolved';
  contactName: string;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  state: string;
  type: 'Mall' | 'Airport' | 'Hospital' | 'Expo';
  image: string;
  isPremium?: boolean;
}
