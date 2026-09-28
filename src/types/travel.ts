export type BudgetTier = 'budget' | 'moderate' | 'luxury';
export type TravelStyle = 'solo' | 'family' | 'friends' | 'student';

export interface TravelFormData {
  fromCity: string;
  destination: string;
  days: number;
  budget: BudgetTier;
  style: TravelStyle;
  foodPreferences: string[];
}

export interface ItineraryEvent {
  time: string;
  tag: string;
  tagType?: 'morning' | 'cultural' | 'evening' | 'general';
  title: string;
  description: string;
  badgeNote?: string;
  durationWalk?: string;
  fee?: string;
}

export interface FoodSpot {
  title: string;
  description: string;
  cost: string;
  dietary: string;
  image: string;
  mealType: string;
}

export interface DayPlan {
  dayNumber: number;
  dayOfWeek: string;
  dateLabel: string;
  neighborhood: string;
  themeTitle: string;
  walkType: string;
  locationOverview: string;
  events: ItineraryEvent[];
  foodSpot?: FoodSpot;
  previewActivities?: string[];
}

export interface SmartSaverTip {
  icon: string;
  title: string;
  description: string;
}

export interface FoodieItem {
  category: string;
  name: string;
  venue: string;
  price: string;
}

export interface GeneratedItinerary {
  id: string;
  title: string;
  subtitle: string;
  heroImage: string;
  route: string;
  matchScore: string;
  durationLabel: string;
  budgetLabel: string;
  styleLabel: string;
  stats: {
    activities: number;
    foodSpots: number;
    costPerPerson: string;
    departureDate: string;
  };
  days: DayPlan[];
  smartSaverTips: SmartSaverTip[];
  foodieChecklist: FoodieItem[];
  generationTime: string;
  rawText?: string;
  modelName?: string;
  createdAt: number;
  formData: TravelFormData;
}

export interface SavedTrip {
  id: string;
  savedAt: number;
  itinerary: GeneratedItinerary;
}
