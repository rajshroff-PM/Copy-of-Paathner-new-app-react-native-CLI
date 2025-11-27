import { Store, GeoJSON, ParkingZone, Friend, AvatarId, Event, BlogPost, LostItem, Venue } from './types';
import { 
  Smartphone, Shirt, Pizza, UtensilsCrossed, Apple, Store as StoreIcon,
  Coffee, ShoppingBag, Watch, Glasses, Gamepad2, Gift, Car, Bike, Zap, 
  DoorOpen, LogOut, Film, Bot, Ghost, Smile
} from 'lucide-react-native';

export const ICON_MAP: Record<string, any> = {
  'apple': Apple,
  'shirt': Shirt,
  'pizza': Pizza,
  'utensils': UtensilsCrossed,
  'smartphone': Smartphone,
  'coffee': Coffee,
  'bag': ShoppingBag,
  'watch': Watch,
  'glasses': Glasses,
  'game': Gamepad2,
  'gift': Gift,
  'car': Car,
  'bike': Bike,
  'ev': Zap,
  'entry': DoorOpen,
  'exit': LogOut,
  'film': Film,
  'default': StoreIcon,
};

export const FLOORS = ["P2", "P1", "Ground", "1st Floor", "2nd Floor", "Food Court"];

export const MALL_GEOJSON: GeoJSON = {
  type: "FeatureCollection",
  features: [
    // Outer Boundary
    {
      type: "Feature",
      properties: { type: "boundary" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [[100, 100], [900, 100], [900, 500], [700, 500], [700, 800], [300, 800], [300, 600], [100, 600], [100, 100]]
        ]
      }
    },
    // Unit A
    {
      type: "Feature",
      properties: { type: "unit", name: "Unit A" },
      geometry: { type: "Polygon", coordinates: [[[110, 110], [190, 110], [190, 190], [110, 190], [110, 110]]] }
    },
    // Unit C (Center)
    {
      type: "Feature",
      properties: { type: "unit", name: "Unit C" },
      geometry: { type: "Polygon", coordinates: [[[400, 180], [480, 180], [480, 260], [400, 260], [400, 180]]] }
    },
    // Unit G (Right)
    {
      type: "Feature",
      properties: { type: "unit", name: "Unit G" },
      geometry: { type: "Polygon", coordinates: [[[600, 500], [680, 500], [680, 580], [600, 580], [600, 500]]] }
    }
  ]
};

export const PARKING_ZONES: ParkingZone[] = [
  {
    id: 'p1-a',
    name: 'Zone A (Premium)',
    level: 'P1',
    capacity: 50,
    occupied: 42,
    type: '4-Wheeler',
    position: { x: 300, y: 300 },
    bounds: { x: 150, y: 150, width: 300, height: 300 },
    color: '#066CE4'
  }
];

export const MALL_STORES: Store[] = [
  {
    id: '1',
    name: "Apple Store",
    category: "Electronics",
    iconName: "apple",
    color: "#1A1A1A",
    position: { x: 300, y: 200 },
    floor: "Ground",
    hours: "10:00 AM - 10:00 PM",
    description: "The latest iPhone, iPad, Mac, and more.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1556656793-02715d8dd660?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: '6',
    name: "Starbucks",
    category: "Cafe",
    iconName: "coffee",
    color: "#15803d",
    position: { x: 600, y: 600 },
    floor: "Ground",
    hours: "08:00 AM - 11:00 PM",
    description: "Premium coffee and snacks.",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
  }
];

export const INITIAL_USER_LOCATION = { x: 400, y: 650 };

export const MALL_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival',
    date: '15 Aug',
    time: '6:00 PM',
    location: 'Central Atrium',
    description: 'Live performance by top local bands. Entry free for all.',
    image: 'https://images.unsplash.com/photo-1459749411177-287ce3276916?auto=format&fit=crop&w=800&q=80',
    category: 'Music'
  },
  {
    id: '2',
    title: 'Kids Art Workshop',
    date: '16 Aug',
    time: '11:00 AM',
    location: 'Kids Zone, 2nd Floor',
    description: 'Learn painting and sketching with expert artists.',
    image: 'https://images.unsplash.com/photo-1560421683-6856ea585c78?auto=format&fit=crop&w=800&q=80',
    category: 'Workshop'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    author: 'Sarah Jenkins',
    content: 'Just tried the new Italian place on the 2nd floor. The pasta is to die for! 🍝 #Foodie',
    timestamp: '2 hours ago',
    likes: 24,
    liked: false,
    comments: [
      { id: 'c1', author: 'Mike T', content: 'Is it expensive?', timestamp: '1 hour ago' }
    ],
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80'
  }
];

export const AVATAR_CONFIG: Record<AvatarId, { name: string; icon: any; color: string; desc: string }> = {
  'glider': { name: 'The Glider', icon: Zap, color: '#3B82F6', desc: 'Fast and energetic' },
  'cat': { name: 'Cyber Cat', icon: Ghost, color: '#EC4899', desc: 'Agile and curious' },
  'bot': { name: 'Mecha Bot', icon: Bot, color: '#10B981', desc: 'Precise and smart' }
};

export const INITIAL_LOST_ITEMS: LostItem[] = [
  {
    id: '1',
    type: 'lost',
    title: 'Blue Leather Wallet',
    description: 'Lost near the food court. Contains ID card.',
    category: 'Personal',
    date: 'Today, 2:00 PM',
    location: 'Food Court',
    status: 'open',
    contactName: 'Rahul',
    image: 'https://images.unsplash.com/photo-1627123424574-183730eb2126?auto=format&fit=crop&w=800&q=80'
  }
];

export const VENUES: Venue[] = [
  {
    id: 'v1',
    name: 'Amanora Mall',
    city: 'Pune',
    state: 'Maharashtra',
    type: 'Mall',
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3c9e?auto=format&fit=crop&w=800&q=80',
    isPremium: true
  },
  {
    id: 'v2',
    name: 'Phoenix Marketcity',
    city: 'Mumbai',
    state: 'Maharashtra',
    type: 'Mall',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
    isPremium: true
  },
  {
    id: 'v3',
    name: 'Indira Gandhi Int. Airport',
    city: 'New Delhi',
    state: 'Delhi',
    type: 'Airport',
    image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=800&q=80'
  }
];
