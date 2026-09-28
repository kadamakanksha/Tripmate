import { GeneratedItinerary, TravelFormData } from '../types/travel';

export const ASSETS = {
  heroPlanBanner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6j_3ARw1xm79_tNqjoU0GOejE2RDdY67O0VOD6Kqc3YIa1uT91jtARLHgL5G9L7S9PYeyj2gUSegq-uszG8kwVhz0Gs_6iTvb2CvoouSiy-B5DGxshZGEYnFA0Fo39EZ-f88f6pDlOSQ-ybOwMUEysxDKUAUERf2Mra7XezxUx6o1Xp6p-UwAFDACRjcVWbTH6zGItDeqTcS4sNT6wxjlTxfmssSAp3Ujqyv1lMlfAw8DGVzCe9nQ',
  heroKyotoItinerary: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHY5up9H24OhKcZe5FL-4Ivg2L--MtG1Z2SawuA01d6GhvxqYjVQ9LImXs6bMDn595iSdd9mCjD7hcv_sTS0jcE0Rg3NYdPCA3kDFKgsRMOhFOj_y3ys1w_HoPyZKPf18VPML3ErOiTcTU1i2KvzMcYNz1XMUIh-43lwkCiWQK3lCp8PvJDXD2riCuvbgW72Jiz1sVJruShHIOqwK_oVCUJJjkC3APZSexbBIgYppsLa3t5E0Ef0pZ',
  profilePic: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkFaY72tfunagpVR1nfh2-Ti_SoE_uJvErjqVEQ7I1QDBuIFxO0Ab7vn1H2tZAu1a9jLXptOGXw996vy7ZeM_DbtkmwNOE_6X23J7nq1XQOfVKWXtUABu4e4h5Y2KFtscqCxDiiLWGEDurWhANWpoP0-RU8N8wp-LIJ7iw0e1akPceuGjpgFecbHVubuTsScUO5M-9UumBzC_J_3O8z6izaeb029cppTbE_uAedrVkJeVyj33q4Qro',
  kyotoFood: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnKUI6WeZQleEFV6KyJR23zP9TDrob-5Xa4uoyT7xYzOfkP2jpEVgs0mTG0eAGrFjmVafxFzOlUh4kd2CL_yLBxjXh-yIJKRMtHNmouSx7mFH2OhT5S4y_gY29jXnGeKQLdEwKNrxEv8NYQ7i66DPieox_ZxRQvt5Vhnk3mgygEoQJYU3-xyalu0sawy41AO3v8Y_8mOKBhy3wsscNbkCHnrcKWpFKsTqzVXQDP_K5jG_yMSOBabAl',
  kyotoTrendingCard: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEhFJeVh3-j42UBSxhNuXUfW_MNfjkeIb2yxmBn3zoxsDd7JFv2ZXl-r-b7P75BdzwtUGR0UdKm9GN6QHRGlV-fzdTv60ZsPyKP-IiIQ-eyWc29t8YNtc9FT7uftwHFoEctq6y5rn0PCievoH8HgVanDE2spxIhj2PSGlHTsyBSvrsPdio09pzHpjFn4Pw7jqSbcYVVJljHpi1hoEVSyEMfgTx94qDTx4eLnFFMAHxCMOgR6lr_kCm',
  baliTrendingCard: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7yke8W6HZEumC6sQgsRZRKsymqYvfCZ0wOkFaHGFByu0vn5e4oOYK-jwBu5iuBj7LmGlymL2Xh14KOv0dOz4GBxNY4tRhUW4rmh64YDTBs0-xYB4y-Fqjaa5a_92HwgxzhVYRJkbLNlvbfTed2XgPe0sXMUt0pd8-TxIl38IUAkwGGI-vfVIWEsGCfMBwy8MiUW619PeisjS6JJe1duJYxcSCQBucXf0euOYGk9AcZ-MKQ0G6ACbu',
};

export const DEFAULT_FORM_DATA: TravelFormData = {
  fromCity: 'San Francisco, USA',
  destination: 'Kyoto, Japan',
  days: 5,
  budget: 'moderate',
  style: 'friends',
  foodPreferences: ['Local Street Food', 'Authentic Cuisine'],
};

export const KYOTO_REFERENCE_ITINERARY: GeneratedItinerary = {
  id: 'kyoto-autumn-5d',
  title: 'Autumn in Kyoto',
  subtitle: 'Culinary Delights & Ancient Temples',
  heroImage: ASSETS.heroKyotoItinerary,
  route: 'SFO ➔ KIX / Kyoto',
  matchScore: '98% AI Match',
  durationLabel: '5 Days • 4 Nights',
  budgetLabel: 'Moderate ($$)',
  styleLabel: 'Friends (3 pax)',
  stats: {
    activities: 14,
    foodSpots: 8,
    costPerPerson: '$1,420',
    departureDate: 'Oct 14',
  },
  days: [
    {
      dayNumber: 1,
      dayOfWeek: 'Tuesday',
      dateLabel: 'Oct 14',
      neighborhood: 'Gion',
      walkType: 'Full Day Walk',
      themeTitle: 'Historic Eastern Kyoto & Traditional Alleyways',
      locationOverview: 'Gion, Higashiyama & Kiyomizu',
      events: [
        {
          time: '08:30 AM – 11:30 AM',
          tag: 'Morning Walk',
          tagType: 'morning',
          title: 'Kiyomizu-dera Temple Sunrise & Slopes',
          description:
            'Beat crowds on the historic wooden veranda overlooking maple valleys. Descend along stone-paved Sannenzaka and Ninenzaka slopes.',
          durationWalk: '25 min scenic stroll',
          fee: '¥400 entrance',
        },
        {
          time: '01:00 PM – 04:30 PM',
          tag: 'Cultural Immersion',
          tagType: 'cultural',
          title: 'Tea Ceremony at Kodaiji & Maruyama Park',
          description:
            'Experience private ceremonial whisking of Uji matcha in a 400-year-old teahouse, followed by peaceful strolling under Kodaiji’s bamboo garden.',
          badgeNote: 'Pre-booked slot for 3 guests confirmed',
        },
        {
          time: '06:00 PM – 09:30 PM',
          tag: 'Atmospheric Twilight',
          tagType: 'evening',
          title: 'Twilight Lantern Stroll in Gion Hanamikoji',
          description:
            'Wander preserved wooden machiya merchant houses softly lit with paper lanterns. Discreet spot to respectfully admire Geiko apprentices on their evening route.',
        },
      ],
      foodSpot: {
        title: 'Chao Chao & Kyoto Duck Soba',
        description:
          'Signature crispy feather gyoza, piping hot duck broth soba, and matcha warabi mochi.',
        cost: '~¥1,800 / person',
        dietary: 'Veggie friendly',
        image: ASSETS.kyotoFood,
        mealType: 'Dinner Recommendation • Day 1',
      },
      previewActivities: [
        'Kiyomizu-dera',
        'Kodaiji Teahouse',
        'Gion Hanamikoji',
      ],
    },
    {
      dayNumber: 2,
      dayOfWeek: 'Wednesday',
      dateLabel: 'Oct 15',
      neighborhood: 'Arashiyama',
      walkType: 'Scenic Riverside',
      themeTitle: 'Arashiyama Bamboo Forest & River Cruise',
      locationOverview: 'Western Kyoto & Sagano Scenic Line',
      events: [
        {
          time: '08:00 AM – 10:30 AM',
          tag: 'Scenic Nature',
          tagType: 'morning',
          title: 'Arashiyama Bamboo Grove & Tenryu-ji Garden',
          description:
            'Morning quiet walks under towering emerald stalks with golden sunbeams, followed by reflection in Sogenchi dry pond Zen garden.',
          durationWalk: '30 min forest walk',
          fee: '¥500 entrance',
        },
        {
          time: '11:30 AM – 02:30 PM',
          tag: 'River Experience',
          tagType: 'cultural',
          title: 'Hozugawa Traditional River Punting Boat',
          description:
            'Glide down the scenic gorges with skilled boatmen using oars and bamboo poles amidst vivid autumn foliage.',
          badgeNote: 'Reserved 11:30 AM boat launch',
        },
        {
          time: '06:30 PM – 09:00 PM',
          tag: 'Riverside Dining',
          tagType: 'evening',
          title: 'Pontocho Alley & Kamogawa River Dining',
          description:
            'Atmospheric narrow stone alleyways featuring intimate yakitori bars and tatami dining platforms facing the cool Kamogawa waters.',
        },
      ],
      foodSpot: {
        title: 'Arashiyama Yudofu Sagano',
        description:
          'Silken handmade Kyoto tofu served in a serene bamboo garden pavilion with seasonal tempura and dashi broth.',
        cost: '~¥3,200 / person',
        dietary: 'Vegetarian friendly',
        image: ASSETS.kyotoFood,
        mealType: 'Lunch Recommendation • Day 2',
      },
      previewActivities: ['Tenryu-ji Zen Garden', 'Hozugawa Boat', 'Pontocho Alley Dinner'],
    },
    {
      dayNumber: 3,
      dayOfWeek: 'Thursday',
      dateLabel: 'Oct 16',
      neighborhood: 'Fushimi',
      walkType: 'Mountain Trail',
      themeTitle: 'Sacred Torii Gates & Sake Brewing District',
      locationOverview: 'Southern Kyoto & Fushimi Inari Shrine',
      events: [
        {
          time: '07:30 AM – 11:00 AM',
          tag: 'Shrine Pilgrimage',
          tagType: 'morning',
          title: 'Fushimi Inari Taisha 10,000 Vermilion Gates',
          description:
            'Early morning hike up Mount Inari through winding vermilion shrine tunnels with panoramic viewpoints over Kyoto basin.',
          durationWalk: '2-hour loop trail',
          fee: 'Free admission',
        },
        {
          time: '12:30 PM – 03:30 PM',
          tag: 'Heritage & Tasting',
          tagType: 'cultural',
          title: 'Gekkeikan Okura Sake Museum & Canal Boat',
          description:
            'Explore 400-year-old timber sake storehouses, sample spring-water daiginjo sake, and relax along willow-lined canals.',
          badgeNote: 'Tasting flight included',
        },
        {
          time: '06:00 PM – 08:30 PM',
          tag: 'Night Stalls',
          tagType: 'evening',
          title: 'Kyoto Station Sky Garden & Ramen Alley (拉麺小路)',
          description:
            'Panoramic night city views from the illuminated Grand Staircase followed by regional ramen bowls from across Japan.',
        },
      ],
      previewActivities: ['Senbon Torii', 'Fushimi Sake Quarter', 'Kyoto Station Skywalk'],
    },
    {
      dayNumber: 4,
      dayOfWeek: 'Friday',
      dateLabel: 'Oct 17',
      neighborhood: 'Nara Day',
      walkType: 'Excursion',
      themeTitle: 'Ancient Capitals & Sacred Deer of Nara Park',
      locationOverview: 'Nara City (45 min Kintetsu Express)',
      events: [
        {
          time: '09:00 AM – 12:00 PM',
          tag: 'Wildlife & UNESCO',
          tagType: 'morning',
          title: 'Todai-ji Great Buddha & Free-Roaming Deer',
          description:
            'Marvel at the world’s largest wooden building sheltering the 15-meter bronze Daibutsu Buddha, with bow-trained sika deer in the parklands.',
          durationWalk: 'Park stroll',
          fee: '¥600 entrance',
        },
        {
          time: '01:30 PM – 04:00 PM',
          tag: 'Forest Shrine',
          tagType: 'cultural',
          title: 'Kasuga Taisha Lantern Path',
          description:
            'Ancient cedar forest path lined with over 3,000 stone and hanging bronze lanterns, untouched for over 1,200 years.',
        },
        {
          time: '06:00 PM – 09:00 PM',
          tag: 'Dinner Gathering',
          tagType: 'evening',
          title: 'Naramachi Machiya Izakaya',
          description:
            'Feast on Miwa somen noodles, persimmon-wrapped sushi (kaki-no-ha sushi), and craft local draft beers.',
        },
      ],
      previewActivities: ['Todai-ji Buddha', 'Nara Deer Park', 'Naramachi Old Town'],
    },
    {
      dayNumber: 5,
      dayOfWeek: 'Saturday',
      dateLabel: 'Oct 18',
      neighborhood: 'Markets',
      walkType: 'Culinary Walk',
      themeTitle: 'Kitchen of Kyoto & Nishiki Food Safari',
      locationOverview: 'Downtown Kyoto & Shijo Kawaramachi',
      events: [
        {
          time: '09:30 AM – 01:00 PM',
          tag: 'Market Tasting',
          tagType: 'morning',
          title: 'Nishiki Market 400-Year Food Alley',
          description:
            'Graze through 130 vendor stalls sampling freshly grilled tako tamago, matcha soft serve, wagyu skewers, and yuba tofu skin rolls.',
          durationWalk: 'Market stroll',
          fee: 'Pay per stall',
        },
        {
          time: '02:00 PM – 05:00 PM',
          tag: 'Artisan Crafts',
          tagType: 'cultural',
          title: 'Kyoto Handicraft Center & Souvenir Hunt',
          description:
            'Find hand-carved woodblock prints, Kiyomizu-yaki ceramics, and artisanal sencha tea leaves for your journey home.',
        },
        {
          time: '06:00 PM – 09:30 PM',
          tag: 'Farewell Dinner',
          tagType: 'evening',
          title: 'Kaiseki Finale Overlooking Kamo River',
          description:
            'Celebratory 8-course seasonal autumn Kyoto kaiseki with friends celebrating unforgettable memories.',
        },
      ],
      previewActivities: ['Nishiki Market', 'Shijo Shopping', 'Kaiseki Farewell'],
    },
  ],
  smartSaverTips: [
    {
      icon: 'confirmation_number',
      title: '72h Kansai Thru Pass',
      description: 'Saves ~35% on local private rail & Kyoto subway lines for groups.',
    },
    {
      icon: 'schedule',
      title: 'Early Birds',
      description:
        'Kiyomizu outer gardens & Fushimi Inari torii gates are free admission before 08:00 AM.',
    },
    {
      icon: 'train',
      title: 'SmartEX Shinkansen',
      description:
        'Book Shinkansen Nozomi tickets 21 days ahead for Hayatoku-21 group discounts.',
    },
  ],
  foodieChecklist: [
    {
      category: 'Dessert',
      name: 'Uji Matcha Parfait',
      venue: 'Tsujiri Tea House',
      price: '¥1,200',
    },
    {
      category: 'Street Food',
      name: 'Nishiki Skewers',
      venue: 'Tako Tamago & Wagyu',
      price: '¥500 - 900',
    },
    {
      category: 'Fine Dining',
      name: 'Kaiseki Ryori',
      venue: 'Multi-course seasonal',
      price: '¥6,500',
    },
    {
      category: 'Comfort Bowl',
      name: 'Kyoto Tonkotsu',
      venue: 'Rich broth & chashu',
      price: '¥1,100',
    },
  ],
  generationTime: '1.4s',
  modelName: 'TripMate GPT-4o',
  createdAt: Date.now(),
  formData: DEFAULT_FORM_DATA,
};

export const BALI_REFERENCE_ITINERARY: GeneratedItinerary = {
  id: 'bali-coastline-7d',
  title: 'Bali Coastline & Island Sanctuary',
  subtitle: 'Tropical Horizons, Coral Reefs & Ancient Water Temples',
  heroImage: ASSETS.baliTrendingCard,
  route: 'SFO ➔ DPS / Bali',
  matchScore: '96% AI Match',
  durationLabel: '7 Days • 6 Nights',
  budgetLabel: 'Luxury ($$$)',
  styleLabel: 'Friends (4 pax)',
  stats: {
    activities: 18,
    foodSpots: 11,
    costPerPerson: '$2,150',
    departureDate: 'Nov 04',
  },
  days: [
    {
      dayNumber: 1,
      dayOfWeek: 'Monday',
      dateLabel: 'Nov 04',
      neighborhood: 'Seminyak',
      walkType: 'Coastal Sunset',
      themeTitle: 'Sunset Coastline & Beachfront Welcome',
      locationOverview: 'Seminyak & Petitenget Beach',
      events: [
        {
          time: '02:00 PM – 05:00 PM',
          tag: 'Beach Arrival',
          tagType: 'morning',
          title: 'Villa Check-in & Coconut Chill',
          description: 'Settle into your private pool sanctuary with fresh cold coconuts.',
        },
        {
          time: '05:30 PM – 08:30 PM',
          tag: 'Sunset Session',
          tagType: 'evening',
          title: 'La Lucciola Beachfront Sunset Dinner',
          description: 'Watch the Indian Ocean swell break as dusk turns violet and golden.',
        },
      ],
      previewActivities: ['Private Pool Villa', 'Petitenget Beach', 'Sunset Cocktails'],
    },
    {
      dayNumber: 2,
      dayOfWeek: 'Tuesday',
      dateLabel: 'Nov 05',
      neighborhood: 'Ubud',
      walkType: 'Jungle Mist',
      themeTitle: 'Emerald Rice Terraces & Sacred Waterfalls',
      locationOverview: 'Tegallalang & Ubud Art Forest',
      events: [
        {
          time: '08:00 AM – 11:30 AM',
          tag: 'Jungle Trek',
          tagType: 'morning',
          title: 'Tegallalang Sunrise Valley Walk',
          description: 'Hike through misty terraced rice paddies with local farmers.',
        },
        {
          time: '01:00 PM – 04:30 PM',
          tag: 'Holistic Spa',
          tagType: 'cultural',
          title: 'Traditional Balinese Flower Bath & Herb Scrub',
          description: 'Ayurvedic relaxation surrounded by cascading river canyons.',
        },
      ],
      previewActivities: ['Tegallalang Terraces', 'Tegenungan Waterfall', 'Ubud Market'],
    },
  ],
  smartSaverTips: [
    {
      icon: 'directions_car',
      title: 'Private Day Driver',
      description: 'Book private chauffeured SUV for 10 hours at ~$45 total for your group.',
    },
    {
      icon: 'local_atm',
      title: 'Local Money Changers',
      description: 'Use BMC or Central Kuta authorized exchange stalls for fair rates without fees.',
    },
    {
      icon: 'sim_card',
      title: 'Telkomsel e-SIM',
      description: 'Pre-register e-SIM before arrival for instant 25GB 5G coverage across islands.',
    },
  ],
  foodieChecklist: [
    {
      category: 'Street Food',
      name: 'Babi Guling Ibu Oka',
      venue: 'Ubud Palace',
      price: 'IDR 75,000',
    },
    {
      category: 'Fine Dining',
      name: 'Locavore NXT',
      venue: 'Locally Foraged 7-Course',
      price: 'IDR 1,200,000',
    },
    {
      category: 'Seafood',
      name: 'Jimbaran Grilled Snapper',
      venue: 'Menega Cafe',
      price: 'IDR 250,000',
    },
    {
      category: 'Dessert',
      name: 'Pandan Dadar Gulung',
      venue: 'Seminyak Patisserie',
      price: 'IDR 45,000',
    },
  ],
  generationTime: '1.6s',
  modelName: 'TripMate GPT-4o',
  createdAt: Date.now(),
  formData: {
    fromCity: 'San Francisco, USA',
    destination: 'Bali, Indonesia',
    days: 7,
    budget: 'luxury',
    style: 'friends',
    foodPreferences: ['Seafood Lover', 'Authentic Cuisine', 'Fine Dining'],
  },
};
