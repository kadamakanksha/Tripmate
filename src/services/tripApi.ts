import { GeneratedItinerary, TravelFormData, DayPlan, SmartSaverTip, FoodieItem } from '../types/travel';
import { KYOTO_REFERENCE_ITINERARY, BALI_REFERENCE_ITINERARY, ASSETS } from '../data/mockData';

export const DEFAULT_BACKEND_URL = 'https://tripmate-ai-travel-planner.onrender.com';

/**
 * Creates natural language trip prompt required by the Express backend API.
 * Matches: "Make a 5 day trip from Pune to Japan" with enriched parameters.
 */
export function buildTripQuery(formData: TravelFormData): string {
  const { fromCity, destination, days, budget, style, foodPreferences } = formData;
  const foodStr = foodPreferences.length > 0 ? ` focusing on ${foodPreferences.join(' and ')}` : '';
  const styleStr = style ? ` for ${style}` : '';
  const budgetStr = budget ? ` with a ${budget} budget` : '';

  return `Make a ${days} day trip from ${fromCity} to ${destination}${budgetStr}${styleStr}${foodStr}`;
}

export interface BackendFetchResult {
  success: boolean;
  itinerary?: GeneratedItinerary;
  rawResponse?: string;
  error?: string;
  querySent: string;
  backendUrl: string;
  usedFallback?: boolean;
}

/**
 * Calls the local Express backend at http://localhost:3002/?trip=<query>
 */
export async function generateItineraryFromBackend(
  formData: TravelFormData,
  backendUrl = DEFAULT_BACKEND_URL
): Promise<BackendFetchResult> {
  const query = buildTripQuery(formData);
  const targetUrl = `${backendUrl.replace(/\/+$/, '')}/?trip=${encodeURIComponent(query)}`;
  const startTime = performance.now();

  try {
    const res = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        Accept: 'text/plain, application/json, */*',
      },
      signal: AbortSignal.timeout(25000),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    const text = await res.text();
    const duration = ((performance.now() - startTime) / 1000).toFixed(1) + 's';

    // Parse the returned response into structured itinerary
    const itinerary = parseBackendTextToItinerary(text, formData, duration);

    return {
      success: true,
      itinerary,
      rawResponse: text,
      querySent: query,
      backendUrl,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.warn(`TripMate Backend [${targetUrl}] unreachable or returned error:`, err);

    return {
      success: false,
      error: errorMessage,
      querySent: query,
      backendUrl,
    };
  }
}

/**
 * Synthesizes an itinerary when backend is offline or for instant preview.
 */
export function synthesizeFallbackItinerary(formData: TravelFormData): GeneratedItinerary {
  const destLower = formData.destination.toLowerCase();
  
  if (destLower.includes('kyoto') && formData.days === 5) {
    return {
      ...KYOTO_REFERENCE_ITINERARY,
      id: 'kyoto-' + Date.now(),
      formData,
      createdAt: Date.now(),
    };
  }

  if (destLower.includes('bali')) {
    return {
      ...BALI_REFERENCE_ITINERARY,
      id: 'bali-' + Date.now(),
      formData,
      createdAt: Date.now(),
    };
  }

  // Generates tailored days for any destination entered by the user
  const daysList: DayPlan[] = [];
  const startDay = new Date();
  startDay.setDate(startDay.getDate() + 14);

  const neighborhoodsByDest: Record<string, string[]> = {
    tokyo: ['Shinjuku & Shibuya', 'Asakusa & Ueno', 'Ginza & Tsukiji', 'Roppongi & Akihabara', 'Shimokitazawa'],
    paris: ['Le Marais & Louvre', 'Montmartre & Sacré-Cœur', 'Latin Quarter & Saint-Germain', 'Eiffel & Champs-Élysées', 'Canal Saint-Martin'],
    bali: ['Seminyak Beach', 'Ubud Valley', 'Uluwatu Cliffs', 'Canggu & Echo Beach', 'Nusa Penida'],
    pune: ['Shivajinagar & Shaniwar Wada', 'Koregaon Park & Osho', 'Sinhagad Fort & Hills', 'Kothrud & FC Road', 'Viman Nagar'],
    rome: ['Colosseum & Roman Forum', 'Vatican & Trastevere', 'Pantheon & Trevi Fountain', 'Villa Borghese', 'Appian Way'],
    london: ['Westminster & Soho', 'Tower Bridge & South Bank', 'Camden & Regent’s Canal', 'Kensington & Notting Hill', 'Shoreditch'],
  };

  const foundKey = Object.keys(neighborhoodsByDest).find((k) => destLower.includes(k));
  const neighborhoodPool = foundKey ? neighborhoodsByDest[foundKey] : ['Downtown District', 'Cultural Heritage Quarter', 'Scenic Waterfront', 'Artisanal Old Town', 'Highland Viewpoint'];

  const foodPref = formData.foodPreferences[0] || 'Local Street Delights';

  for (let i = 1; i <= formData.days; i++) {
    const d = new Date(startDay);
    d.setDate(startDay.getDate() + (i - 1));
    const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
    const monthDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const neighborhood = neighborhoodPool[(i - 1) % neighborhoodPool.length];

    daysList.push({
      dayNumber: i,
      dayOfWeek: dayName,
      dateLabel: monthDay,
      neighborhood: neighborhood.split('&')[0].trim(),
      walkType: i === 1 ? 'Full Day Walk' : i % 2 === 0 ? 'Scenic Riverside' : 'Cultural Immersion',
      themeTitle: `${neighborhood} & Highlights`,
      locationOverview: `${neighborhood}, ${formData.destination}`,
      events: [
        {
          time: '09:00 AM – 12:00 PM',
          tag: 'Morning Discovery',
          tagType: 'morning',
          title: `Iconic Landmarks of ${neighborhood.split('&')[0].trim()}`,
          description: `Early visit to avoid peak crowds, experiencing architecture and historic pathways in ${formData.destination}.`,
          durationWalk: '25 min stroll',
          fee: formData.budget === 'budget' ? 'Free entry' : '$15 admission',
        },
        {
          time: '01:30 PM – 04:30 PM',
          tag: 'Cultural Heritage',
          tagType: 'cultural',
          title: `Artisanal Craft & Local Experience in ${neighborhood}`,
          description: `Immerse in local traditions, neighborhood shops, and hidden courtyards curated for ${formData.style} travelers.`,
          badgeNote: `${formData.style === 'friends' ? 'Group reservation recommended' : 'Solo friendly route'}`,
        },
        {
          time: '06:00 PM – 09:30 PM',
          tag: 'Evening Atmosphere',
          tagType: 'evening',
          title: `Sunset Stroll & ${foodPref} Tour`,
          description: `Experience vibrant dusk illumination and evening cafe culture in the heart of ${formData.destination}.`,
        },
      ],
      foodSpot: {
        title: `Curated ${foodPref} at ${neighborhood.split('&')[0].trim()}`,
        description: `Authentic regional specialties prepared fresh, beloved by local food enthusiasts and matched for ${formData.budget} travelers.`,
        cost: formData.budget === 'budget' ? '~$12 / person' : formData.budget === 'moderate' ? '~$28 / person' : '~$85 / person',
        dietary: formData.foodPreferences.includes('Vegan / Veg') ? 'Vegetarian options' : 'Authentic selections',
        image: ASSETS.kyotoFood,
        mealType: `Chef Recommendation • Day ${i}`,
      },
      previewActivities: [`Explore ${neighborhood}`, `Local ${foodPref}`, 'Evening Walk'],
    });
  }

  const costMultiplier = formData.budget === 'budget' ? 85 : formData.budget === 'moderate' ? 190 : 450;
  const totalCost = `$${(formData.days * costMultiplier).toLocaleString()}`;

  return {
    id: 'trip-' + Date.now(),
    title: `${formData.destination} Discovery`,
    subtitle: `${formData.days} Days of ${foodPref} & Cultural Highlights`,
    heroImage: ASSETS.heroPlanBanner,
    route: `${formData.fromCity.split(',')[0]} ➔ ${formData.destination.split(',')[0]}`,
    matchScore: '97% AI Match',
    durationLabel: `${formData.days} Days • ${formData.days - 1} Nights`,
    budgetLabel: formData.budget === 'budget' ? 'Budget ($)' : formData.budget === 'moderate' ? 'Moderate ($$)' : 'Luxury ($$$)',
    styleLabel: `${formData.style.charAt(0).toUpperCase() + formData.style.slice(1)} Trip`,
    stats: {
      activities: formData.days * 3,
      foodSpots: formData.days * 2,
      costPerPerson: totalCost,
      departureDate: startDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    },
    days: daysList,
    smartSaverTips: [
      {
        icon: 'confirmation_number',
        title: 'Multi-Day Transit Pass',
        description: `Save up to 30% by picking up the regional unlimited transit smartcard upon arrival in ${formData.destination}.`,
      },
      {
        icon: 'schedule',
        title: 'Off-Peak Morning Entry',
        description: 'Major monuments offer free grounds access and minimal lines between 07:30 AM and 09:00 AM.',
      },
      {
        icon: 'payments',
        title: 'Local Neighborhood Stalls',
        description: 'Venture 2 blocks away from main tourist arteries for better authentic quality at half the price.',
      },
    ],
    foodieChecklist: [
      {
        category: 'Local Classic',
        name: `Signature ${foodPref}`,
        venue: 'Historic Central Market',
        price: formData.budget === 'budget' ? '$6 - $12' : '$18 - $30',
      },
      {
        category: 'Street Snack',
        name: 'Artisan Specialty Bites',
        venue: 'Night Bazaar Stalls',
        price: '$4 - $8',
      },
      {
        category: 'Curated Dining',
        name: 'Regional Tasting Course',
        venue: 'Neighborhood Bistro',
        price: formData.budget === 'luxury' ? '$120' : '$45',
      },
      {
        category: 'Sweet Finale',
        name: 'Traditional Dessert & Brew',
        venue: 'Artisanal Cafe Roastery',
        price: '$5 - $9',
      },
    ],
    generationTime: '1.2s',
    modelName: 'TripMate Express Engine',
    createdAt: Date.now(),
    formData,
  };
}

/**
 * Parses raw text from the Express backend into our rich visual structure,
 * while preserving the raw text for direct display.
 */
function parseBackendTextToItinerary(
  rawText: string,
  formData: TravelFormData,
  generationTime: string
): GeneratedItinerary {
  // Use synthesized template as base, then populate with detected days and sections
  const base = synthesizeFallbackItinerary(formData);
  base.rawText = rawText;
  base.generationTime = generationTime;
  base.modelName = 'TripMate Local Express API';

  try {
    // Check if rawText contains "Day 1", "Day 2", etc.
    const dayRegex = /(?:Day\s*(\d+)[:\s\-]+)([^\n]+)/gi;
    const matches = [...rawText.matchAll(dayRegex)];

    if (matches.length > 0) {
      const parsedDays: DayPlan[] = [];
      const sections = rawText.split(/(?:Day\s*\d+[:\s\-])/i).slice(1);

      for (let i = 0; i < Math.min(sections.length, formData.days); i++) {
        const dayNum = i + 1;
        const sectionContent = sections[i] || '';
        const dayTitleMatch = sectionContent.match(/^[^\n]+/);
        const dayTitle = dayTitleMatch ? dayTitleMatch[0].trim().replace(/^[:\-\*\#\s]+/, '') : `Day ${dayNum} Exploration`;

        // Extract bullet points or paragraphs for morning/afternoon/evening
        const lines = sectionContent
          .split('\n')
          .map((l) => l.trim().replace(/^[\*\-\d\.\s]+/, ''))
          .filter((l) => l.length > 10);

        const morningText = lines[0] || 'Morning sightseeing and landmark discovery.';
        const afternoonText = lines[1] || 'Afternoon local cultural immersion and scenic walk.';
        const eveningText = lines[2] || 'Evening dining and atmospheric stroll.';

        const baseDay = base.days[i] || base.days[0];

        parsedDays.push({
          ...baseDay,
          dayNumber: dayNum,
          themeTitle: dayTitle || baseDay.themeTitle,
          events: [
            {
              time: '09:00 AM – 12:00 PM',
              tag: 'Morning Walk',
              tagType: 'morning',
              title: morningText.slice(0, 50) + (morningText.length > 50 ? '...' : ''),
              description: morningText,
              durationWalk: '20 min walk',
              fee: formData.budget === 'budget' ? 'Free' : '$10 - $20',
            },
            {
              time: '01:30 PM – 04:30 PM',
              tag: 'Cultural Discovery',
              tagType: 'cultural',
              title: afternoonText.slice(0, 50) + (afternoonText.length > 50 ? '...' : ''),
              description: afternoonText,
              badgeNote: 'Recommended by TripMate AI',
            },
            {
              time: '06:00 PM – 09:30 PM',
              tag: 'Evening Stroll',
              tagType: 'evening',
              title: eveningText.slice(0, 50) + (eveningText.length > 50 ? '...' : ''),
              description: eveningText,
            },
          ],
        });
      }

      if (parsedDays.length > 0) {
        base.days = parsedDays;
      }
    }
  } catch (parseErr) {
    console.warn('Could not parse backend text into custom day blocks, using base schema with rawText:', parseErr);
  }

  return base;
}
