import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Search,
  Hotel,
  ChevronRight,
  Globe,
  Youtube,
  Sparkles,
  Car,
  UtensilsCrossed,
  Users,
  Heart,
  Accessibility,
  Baby,
  PawPrint,
  Smartphone,
  Package,
  MapPin,
  DollarSign,
  Bell,
  Check,
  Info,
  Save,
  Bed,
  Home,
  Wallet,
  Building2,
  Plane,
  Train,
  Bus,
  Navigation,
  Coffee,
  Utensils,
  ShoppingBag,
  UserCircle,
  Languages,
  Briefcase,
  HeartPulse,
  Stethoscope,
  Pill,
  UserPlus,
  Activity,
  Wheelchair,
  MessageSquare,
  Wrench,
  Shield,
  Wifi,
  Map,
  CreditCard,
  FileText,
  X,
  ExternalLink,
  Bookmark,
  AlertCircle,
} from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface TravelEssentialsHubProps {
  onBack: () => void;
  onNavigateToSelfDrive?: () => void;
}

type MainView = 'hub' | 'subcategory-detail' | 'package-builder' | 'preferences-summary' | 'package-choice' | 'price-summary' | 'booking-confirmation';

// Type Definitions
interface Service {
  id: number;
  name: string;
  icon: any; // Lucide icon component
  description: string;
  featured?: boolean;
  isCrossReference?: boolean;
  crossRefCategory?: string;
  crossRefMessage?: string;
}

interface Subcategory {
  id: string;
  name: string;
  icon: any; // Lucide icon component
  emoji: string;
  tagline: string;
  description: string;
  services: Service[];
  isSpecial?: boolean;
  specialNote?: string;
}

// 10 Subcategories Data
const subcategories = [
  {
    id: 'accommodation',
    name: 'Accommodation',
    icon: Bed,
    emoji: '🛏️',
    tagline: 'Places to stay',
    description: 'Hotels, resorts, villas, and budget stays',
    services: [
      { id: 1, name: 'Admin-Added Hotels & Resorts', icon: Building2, description: 'Comfortable stays with amenities' },
      { id: 2, name: 'Admin-Added Villas & Homes', icon: Home, description: 'Private vacation rentals' },
      { id: 3, name: 'Admin-Added Budget Stays', icon: Wallet, description: 'Affordable accommodations' },
      { id: 4, name: 'Admin-Added Luxury Suites', icon: Sparkles, description: 'Premium luxury experiences' },
    ],
  },
  {
    id: 'transportation',
    name: 'Transportation',
    icon: Car,
    emoji: '🚗',
    tagline: 'Ways to get around',
    description: 'Airport transfers, rentals, and public transit',
    services: [
      { id: 1, name: 'Admin-Added Airport Transfers', icon: Plane, description: 'Reliable pickup and drop-off' },
      { id: 2, name: 'Admin-Added Car Rentals', icon: Car, description: 'Self-drive and chauffeur options' },
      { id: 3, name: 'Admin-Added Train Booking', icon: Train, description: 'Railway reservations' },
      { id: 4, name: 'Admin-Added Bus Services', icon: Bus, description: 'Intercity and local buses' },
      { 
        id: 5, 
        name: '🚗 Self-Drive Vehicles', 
        icon: Navigation, 
        description: 'Explore at your own pace',
        isCrossReference: true,
        crossRefCategory: 'Self-Drive Tourism',
        crossRefMessage: 'This service is fully featured in the Self-Drive Tourism category with complete vehicle options, route planning, and booking features.',
      },
    ],
  },
  {
    id: 'hospitality-dining',
    name: 'Hospitality & Dining',
    icon: UtensilsCrossed,
    emoji: '🍽️',
    tagline: 'Food and experiences',
    description: 'Restaurants, food tours, and local cuisine',
    services: [
      { id: 1, name: 'Admin-Added Restaurants', icon: Utensils, description: 'Curated dining experiences' },
      { id: 2, name: 'Admin-Added Food Tours', icon: Coffee, description: 'Guided culinary adventures' },
      { id: 3, name: 'Admin-Added Catering Services', icon: UtensilsCrossed, description: 'Event and group catering' },
      { id: 4, name: 'Admin-Added Local Cuisine', icon: Coffee, description: 'Authentic regional flavors' },
    ],
  },
  {
    id: 'personal-assistance',
    name: 'Personal Assistance',
    icon: UserCircle,
    emoji: '👤',
    tagline: 'Help during your trip',
    description: 'Companions, translators, and concierge',
    services: [
      { id: 1, name: 'Admin-Added Travel Companion', icon: Users, description: 'Professional travel buddies' },
      { id: 2, name: 'Admin-Added Language Support', icon: Languages, description: 'Translation and interpretation' },
      { id: 3, name: 'Admin-Added Concierge Service', icon: Briefcase, description: '24/7 assistance and planning' },
      { id: 4, name: 'Admin-Added Shopping Assistant', icon: ShoppingBag, description: 'Local market guides' },
    ],
  },
  {
    id: 'senior-care',
    name: 'Senior Care',
    icon: Heart,
    emoji: '👵',
    tagline: 'Services for elderly travelers',
    description: 'Medical support, assistance, and monitoring',
    services: [
      { id: 1, name: 'Admin-Added Doctor on Tour', icon: Stethoscope, description: 'Medical professional accompaniment', featured: true },
      { id: 2, name: 'Admin-Added Nursing Care', icon: HeartPulse, description: 'Trained nursing assistance' },
      { id: 3, name: 'Admin-Added Personal Assistant', icon: UserPlus, description: 'Dedicated helper for seniors', featured: true },
      { id: 4, name: 'Admin-Added Health Monitoring', icon: Activity, description: 'Continuous health tracking' },
      { id: 5, name: 'Admin-Added Medication Support', icon: Pill, description: 'Medication management help' },
      { id: 6, name: 'Admin-Added Mobility Assistance', icon: Accessibility, description: 'Support for movement challenges' },
    ],
    specialNote: 'Some senior services may also be available in the Senior Wellness Hub category.',
  },
  {
    id: 'accessibility-services',
    name: 'Accessibility Services',
    icon: Accessibility,
    emoji: '♿',
    tagline: 'Services for disabilities',
    description: 'Wheelchair access, sign language, equipment',
    services: [
      { id: 1, name: 'Admin-Added Wheelchair Vans', icon: Car, description: 'Accessible vehicle transport' },
      { id: 2, name: 'Admin-Added Accessible Hotels', icon: Building2, description: 'Fully accessible accommodations' },
      { id: 3, name: 'Admin-Added Sign Language Guide', icon: MessageSquare, description: 'Professional interpreters' },
      { id: 4, name: 'Admin-Added Special Equipment', icon: Wrench, description: 'Mobility aids and devices' },
    ],
  },
  {
    id: 'family-services',
    name: 'Family Services',
    icon: Baby,
    emoji: '👨‍👩‍👧‍👦',
    tagline: 'Help for traveling with kids',
    description: 'Child care, activities, meals, and play areas',
    services: [
      { id: 1, name: 'Admin-Added Child Care', icon: Baby, description: 'Professional babysitting services' },
      { id: 2, name: 'Admin-Added Family Activities', icon: Users, description: 'Kid-friendly experiences' },
      { id: 3, name: 'Admin-Added Kids Meals', icon: Utensils, description: 'Child-appropriate dining' },
      { id: 4, name: 'Admin-Added Play Areas', icon: Sparkles, description: 'Safe spaces for children' },
    ],
  },
  {
    id: 'pet-travel',
    name: 'Pet Travel',
    icon: PawPrint,
    emoji: '🐾',
    tagline: 'Services for traveling with pets',
    description: 'Pet-friendly hotels, transport, care, and vets',
    services: [
      { id: 1, name: 'Admin-Added Pet-Friendly Hotels', icon: Building2, description: 'Accommodations that welcome pets' },
      { id: 2, name: 'Admin-Added Pet Transport', icon: Car, description: 'Safe pet travel arrangements' },
      { id: 3, name: 'Admin-Added Pet Care', icon: PawPrint, description: 'Professional pet sitting' },
      { id: 4, name: 'Admin-Added Vet Services', icon: HeartPulse, description: 'Veterinary care on the go' },
    ],
  },
  {
    id: 'digital-tools',
    name: 'Digital Tools',
    icon: Smartphone,
    emoji: '📱',
    tagline: 'Essential travel tech & docs',
    description: 'Insurance, eSIM, guides, payments, visas',
    services: [
      { id: 1, name: 'Admin-Added Travel Insurance', icon: Shield, description: 'Comprehensive trip protection' },
      { id: 2, name: 'Admin-Added eSIM & Data', icon: Wifi, description: 'Internet connectivity solutions' },
      { id: 3, name: 'Admin-Added Digital Guides', icon: Map, description: 'Interactive travel information' },
      { id: 4, name: 'Admin-Added Payment Solutions', icon: CreditCard, description: 'Multi-currency payment options' },
      { id: 5, name: 'Admin-Added Visa Assistance', icon: FileText, description: 'Document processing help' },
    ],
  },
  {
    id: 'custom-package-builder',
    name: 'Travel Essentials',
    icon: Package,
    emoji: '🧳',
    tagline: 'Custom package builder',
    description: 'Mix and match services for your perfect trip',
    isSpecial: true,
    services: [],
  },
];

export function TravelEssentialsHub({ onBack, onNavigateToSelfDrive }: TravelEssentialsHubProps) {
  const [currentView, setCurrentView] = useState<MainView>('hub');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [budgetRange, setBudgetRange] = useState('');
  const [locationDetected, setLocationDetected] = useState('[Admin: Auto-Detect Location]');
  const [savedPreferences, setSavedPreferences] = useState<Record<string, string[]>>({});
  const [selectedServices, setSelectedServices] = useState<Record<string, boolean>>({});
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Load saved preferences from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('grokyatra-travel-essentials-preferences');
      if (saved) {
        setSavedPreferences(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load saved preferences:', error);
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    try {
      if (Object.keys(savedPreferences).length > 0) {
        localStorage.setItem(
          'grokyatra-travel-essentials-preferences', 
          JSON.stringify(savedPreferences)
        );
      }
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  }, [savedPreferences]);

  const handleGoogleSearch = (serviceName?: string) => {
    try {
      const query = serviceName 
        ? `best ${serviceName} in ${locationDetected} 2026`
        : searchQuery || 'travel services india';
      const newWindow = window.open(
        `https://www.google.com/search?q=${encodeURIComponent(query)}`, 
        '_blank'
      );
      if (!newWindow) {
        alert('⚠️ Please allow popups to search externally');
      }
    } catch (error) {
      console.error('Failed to open Google search:', error);
      alert('Unable to open search. Please check your browser settings.');
    }
  };

  const handleYouTubeSearch = (serviceName?: string) => {
    try {
      const query = serviceName 
        ? `${serviceName} ${locationDetected} review guide 2026`
        : searchQuery || 'travel services india';
      const newWindow = window.open(
        `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, 
        '_blank'
      );
      if (!newWindow) {
        alert('⚠️ Please allow popups to browse YouTube');
      }
    } catch (error) {
      console.error('Failed to open YouTube search:', error);
      alert('Unable to open YouTube. Please check your browser settings.');
    }
  };

  const handleSavePreferences = (subcategoryId: string) => {
    const selectedInCategory = Object.keys(selectedServices).filter(
      key => key.startsWith(`${subcategoryId}-`) && selectedServices[key]
    );
    
    setSavedPreferences({
      ...savedPreferences,
      [subcategoryId]: selectedInCategory,
    });

    alert(`✅ Preferences saved! We'll suggest these services when you book tours in other categories.`);
  };

  const toggleServiceSelection = (subcategoryId: string, serviceId: number) => {
    const key = `${subcategoryId}-${serviceId}`;
    setSelectedServices({
      ...selectedServices,
      [key]: !selectedServices[key],
    });
  };

  // Route to different views
  if (currentView === 'subcategory-detail' && selectedSubcategory) {
    if (selectedSubcategory.isSpecial && selectedSubcategory.id === 'custom-package-builder') {
      return (
        <CustomPackageBuilder
          onBack={() => setCurrentView('hub')}
          allSubcategories={subcategories}
          savedPreferences={savedPreferences}
          onGoogleSearch={handleGoogleSearch}
          onYouTubeSearch={handleYouTubeSearch}
        />
      );
    }

    return (
      <SubcategoryDetailScreen
        subcategory={selectedSubcategory}
        onBack={() => setCurrentView('hub')}
        selectedServices={selectedServices}
        toggleServiceSelection={toggleServiceSelection}
        onSavePreferences={handleSavePreferences}
        onGoogleSearch={handleGoogleSearch}
        onYouTubeSearch={handleYouTubeSearch}
        onNavigateToSelfDrive={onNavigateToSelfDrive}
      />
    );
  }

  if (currentView === 'preferences-summary') {
    return (
      <PreferencesSummaryScreen
        onBack={() => setCurrentView('hub')}
        savedPreferences={savedPreferences}
        subcategories={subcategories}
        onClearAll={() => setSavedPreferences({})}
      />
    );
  }

  // Main Hub View
  const totalServices = subcategories.reduce((acc, cat) => acc + cat.services.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button
          onClick={onBack}
          className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Hotel className="w-9 h-9 text-white" />
          </div>
          <div>
            <h1 className="text-white text-4xl font-bold">Travel Essentials</h1>
            <p className="text-white/90 text-base">Complete concierge services for your journey</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <Input
            type="text"
            placeholder="Search services, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-14 h-14 rounded-full bg-white border-0 shadow-lg text-base"
          />
        </div>

        {/* Location & Budget Row */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <MapPin className="w-5 h-5 text-white flex-shrink-0" />
            <span className="text-white text-sm font-semibold flex-1">{locationDetected}</span>
            <button
              onClick={() => setLocationDetected('[Admin: Change Location]')}
              className="text-xs text-white/90 bg-white/20 px-3 py-1 rounded-full"
            >
              Change
            </button>
          </div>

          <div className="flex items-center gap-2 p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <DollarSign className="w-5 h-5 text-white flex-shrink-0" />
            <Input
              type="text"
              placeholder="[Admin: Set your budget range]"
              value={budgetRange}
              onChange={(e) => setBudgetRange(e.target.value)}
              className="flex-1 bg-transparent border-0 text-white placeholder:text-white/70 h-auto p-0 text-sm font-semibold focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Deal Alerts Banner */}
        <div className="flex items-center gap-2 p-3 bg-yellow-500/90 rounded-2xl mb-4">
          <Bell className="w-5 h-5 text-yellow-900 flex-shrink-0" />
          <span className="text-yellow-900 text-sm font-semibold flex-1">[Admin: Get Travel Essentials Deal Alerts]</span>
          <Button className="text-xs bg-yellow-900 text-yellow-100 px-3 py-1 h-auto rounded-full hover:bg-yellow-800">
            Enable
          </Button>
        </div>

        {/* Global Google Search & YouTube Browse Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={() => handleGoogleSearch()}
            className="flex-1 bg-white text-blue-600 hover:bg-gray-100 rounded-full h-9 flex items-center justify-center gap-2 text-sm"
          >
            <Globe className="w-4 h-4" />
            Google Search
          </Button>
          <Button
            onClick={() => handleYouTubeSearch()}
            className="flex-1 bg-white text-red-600 hover:bg-gray-100 rounded-full h-9 flex items-center justify-center gap-2 text-sm"
          >
            <Youtube className="w-4 h-4" />
            YouTube
          </Button>
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Info Button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Service Categories</h2>
            <p className="text-gray-600 text-sm">{totalServices} services across {subcategories.length} categories</p>
          </div>
          <button
            onClick={() => setShowInfoModal(true)}
            className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
            aria-label="Show information about Travel Essentials"
          >
            <Info className="w-5 h-5 text-blue-600" />
          </button>
        </div>

        {/* My Preferences Quick Access */}
        {Object.keys(savedPreferences).length > 0 && (
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-5 shadow-lg mb-6 border-2 border-green-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">My Saved Preferences</h3>
                  <p className="text-sm text-gray-600">
                    {Object.keys(savedPreferences).length} categories configured
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setCurrentView('preferences-summary')}
                variant="outline"
                className="rounded-full h-8 text-xs"
              >
                View All
              </Button>
            </div>
          </Card>
        )}

        {/* 10 Subcategory Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {subcategories.map((subcategory, index) => (
            <motion.button
              key={subcategory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setSelectedSubcategory(subcategory);
                setCurrentView('subcategory-detail');
              }}
              className={`bg-white rounded-3xl p-5 shadow-xl hover:shadow-2xl transition-all text-left ${
                subcategory.isSpecial ? 'border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50' : ''
              }`}
            >
              <div className="text-5xl mb-3">{subcategory.emoji}</div>
              <h3 className="font-bold text-base mb-1">{subcategory.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{subcategory.tagline}</p>
              
              {!subcategory.isSpecial && (
                <div className="flex items-center gap-1 mb-3">
                  <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-semibold">
                    {subcategory.services.length} services
                  </div>
                </div>
              )}

              {subcategory.isSpecial && (
                <div className="flex items-center gap-1 mb-3">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-[10px] font-semibold text-purple-700">Build Your Bundle</span>
                </div>
              )}

              <div className="flex items-center gap-1 text-blue-600">
                <span className="text-xs font-semibold">
                  {subcategory.isSpecial ? 'Start Building' : 'View Services'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Admin Note */}
        <Card className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-3xl p-5 shadow-lg border-2 border-blue-300 mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-700 flex-shrink-0 mt-1" />
            <div>
              <p className="font-bold text-base text-blue-900 mb-1">How Travel Essentials Works</p>
              <p className="text-sm text-blue-800 mb-2">
                This is your smart concierge hub. Unlike tour categories where you book complete packages, here you discover support services, research them via Google/YouTube, and book directly with providers.
              </p>
              <p className="text-sm text-blue-800">
                Save your preferences, and they'll be suggested when booking tours in other categories!
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
            onClick={() => setShowInfoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold">How Travel Essentials Works</h3>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">Discover Support Services</p>
                    <p className="text-xs text-gray-600">Browse services you need for your trip</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">Research via Google/YouTube</p>
                    <p className="text-xs text-gray-600">Use our smart search to find real providers</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">Book Directly with Providers</p>
                    <p className="text-xs text-gray-600">Complete your booking on their official websites</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">Save Preferences for Future Trips</p>
                    <p className="text-xs text-gray-600">Your choices will be suggested in tour bookings</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setShowInfoModal(false)}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"
              >
                Got It!
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Subcategory Detail Screen
interface SubcategoryDetailScreenProps {
  subcategory: Subcategory;
  onBack: () => void;
  selectedServices: Record<string, boolean>;
  toggleServiceSelection: (subcategoryId: string, serviceId: number) => void;
  onSavePreferences: (subcategoryId: string) => void;
  onGoogleSearch: (serviceName: string) => void;
  onYouTubeSearch: (serviceName: string) => void;
  onNavigateToSelfDrive?: () => void;
}

function SubcategoryDetailScreen({
  subcategory,
  onBack,
  selectedServices,
  toggleServiceSelection,
  onSavePreferences,
  onGoogleSearch,
  onYouTubeSearch,
  onNavigateToSelfDrive,
}: SubcategoryDetailScreenProps) {
  const Icon = subcategory.icon;
  const selectedCount = subcategory.services.filter((s: Service) => 
    selectedServices[`${subcategory.id}-${s.id}`]
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button
          onClick={onBack}
          className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Icon className="w-9 h-9 text-white" />
          </div>
          <div>
            <h1 className="text-white text-3xl font-bold">{subcategory.name}</h1>
            <p className="text-white/90 text-base">{subcategory.description}</p>
          </div>
        </div>

        {selectedCount > 0 && (
          <div className="mt-4 p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <p className="text-white text-sm font-semibold">
              ✓ {selectedCount} service{selectedCount > 1 ? 's' : ''} selected
            </p>
          </div>
        )}
      </div>

      <div className="px-6 -mt-4">
        {/* Special Note for Categories with Cross-References */}
        {subcategory.specialNote && (
          <Card className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl p-5 shadow-lg mb-6 border-2 border-amber-300">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-700 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-base text-amber-900 mb-1">Note</p>
                <p className="text-sm text-amber-800">{subcategory.specialNote}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Service Cards */}
        <div className="space-y-4 mb-6">
          {subcategory.services.map((service: Service, index: number) => {
            const ServiceIcon = service.icon;
            const isSelected = selectedServices[`${subcategory.id}-${service.id}`];
            const isCrossRef = service.isCrossReference;

            if (isCrossRef) {
              return (
                <Card
                  key={service.id}
                  className="bg-gradient-to-r from-gray-100 to-blue-50 rounded-2xl p-5 shadow-lg border-2 border-blue-300"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center flex-shrink-0">
                      <ServiceIcon className="w-6 h-6 text-blue-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base mb-1">{service.name}</h3>
                      <p className="text-xs text-gray-600 mb-2">{service.description}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-100 rounded-xl mb-3">
                    <div className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-blue-900">{service.crossRefMessage}</p>
                    </div>
                  </div>

                  <Button
                    className="w-full h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-sm"
                    onClick={() => {
                      if (onNavigateToSelfDrive) {
                        onNavigateToSelfDrive();
                      } else {
                        alert(`Navigation to ${service.crossRefCategory} category`);
                      }
                    }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View {service.crossRefCategory}
                  </Button>
                </Card>
              );
            }

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`rounded-2xl p-5 shadow-lg transition-all ${
                    isSelected ? 'border-2 border-blue-500 bg-blue-50' : 'bg-white'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <button
                      onClick={() => toggleServiceSelection(subcategory.id, service.id)}
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
                        isSelected
                          ? 'bg-blue-600 border-blue-600'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </button>

                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <ServiceIcon className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-bold text-base">{service.name}</h3>
                        {service.featured && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-[10px] font-semibold">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{service.description}</p>
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Available
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => onGoogleSearch(service.name)}
                      variant="outline"
                      className="flex-1 h-9 rounded-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 text-xs"
                    >
                      <Globe className="w-4 h-4 mr-1" />
                      Google
                    </Button>
                    <Button
                      onClick={() => onYouTubeSearch(service.name)}
                      variant="outline"
                      className="flex-1 h-9 rounded-full border-2 border-red-500 text-red-600 hover:bg-red-50 text-xs"
                    >
                      <Youtube className="w-4 h-4 mr-1" />
                      YouTube
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Sticky Save Preferences Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl p-6 z-40">
        <Button
          onClick={() => onSavePreferences(subcategory.id)}
          disabled={selectedCount === 0}
          className="w-full h-14 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
        >
          <Save className="w-5 h-5 mr-2" />
          Save {subcategory.name} Preferences {selectedCount > 0 && `(${selectedCount})`}
        </Button>
      </div>
    </div>
  );
}

// Custom Package Builder
interface CustomPackageBuilderProps {
  onBack: () => void;
  allSubcategories: Subcategory[];
  savedPreferences: Record<string, string[]>;
  onGoogleSearch: (query?: string) => void;
  onYouTubeSearch: (query?: string) => void;
}

function CustomPackageBuilder({
  onBack,
  allSubcategories,
  savedPreferences,
  onGoogleSearch,
  onYouTubeSearch,
}: CustomPackageBuilderProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [estimatedBudget] = useState(0);

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const availableCategories = allSubcategories.filter(cat => !cat.isSpecial);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-24">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button
          onClick={onBack}
          className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Package className="w-9 h-9 text-white" />
          </div>
          <div>
            <h1 className="text-white text-3xl font-bold">Custom Package Builder</h1>
            <p className="text-white/90 text-base">Mix and match services for your perfect trip</p>
          </div>
        </div>

        {selectedCategories.length > 0 && (
          <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
            <p className="text-white text-sm font-semibold mb-1">
              Selected: {selectedCategories.length} categories
            </p>
            <p className="text-white/90 text-xs">
              Estimated Budget: ₹{estimatedBudget.toLocaleString()} [Admin: Calculate]
            </p>
          </div>
        )}
      </div>

      <div className="px-6 -mt-4">
        <Card className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-5 text-white shadow-xl mb-6">
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-white flex-shrink-0 mt-1" />
            <div>
              <p className="font-bold text-base mb-2">How to Build Your Package</p>
              <p className="text-sm text-white/95 mb-4">
                Select service categories below, research providers via Google/YouTube, and create your custom bundle.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => onGoogleSearch('custom travel package builder india')}
              className="flex-1 bg-white text-blue-600 hover:bg-gray-100 rounded-full h-10 text-sm font-semibold"
            >
              <Globe className="w-4 h-4 mr-2" />
              Google
            </Button>
            <Button
              onClick={() => onYouTubeSearch('how to plan custom travel package')}
              className="flex-1 bg-white text-red-600 hover:bg-gray-100 rounded-full h-10 text-sm font-semibold"
            >
              <Youtube className="w-4 h-4 mr-2" />
              YouTube
            </Button>
          </div>
        </Card>

        <h2 className="text-2xl font-bold mb-5">Select Service Categories</h2>

        <div className="space-y-3 mb-6">
          {availableCategories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategories.includes(category.id);
            const hasSavedPreferences = savedPreferences[category.id]?.length > 0;

            return (
              <motion.button
                key={category.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleCategory(category.id)}
                className={`w-full p-5 rounded-2xl transition-all text-left ${
                  isSelected
                    ? 'bg-purple-100 border-2 border-purple-500'
                    : 'bg-white border-2 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      isSelected
                        ? 'bg-purple-600 border-purple-600'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>

                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-base">{category.name}</h3>
                      {hasSavedPreferences && (
                        <Bookmark className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{category.services.length} services available</p>
                    {hasSavedPreferences && (
                      <p className="text-xs text-green-600 mt-1">
                        ✓ You have saved preferences here
                      </p>
                    )}
                  </div>

                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </motion.button>
            );
          })}
        </div>

        <Card className="bg-gradient-to-r from-orange-100 to-red-100 rounded-3xl p-5 shadow-lg border-2 border-orange-300 mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-orange-700 flex-shrink-0 mt-1" />
            <div>
              <p className="font-bold text-base text-orange-900 mb-1">Next Steps</p>
              <p className="text-sm text-orange-800">
                After selecting categories, use Google/YouTube to research specific providers in each category. Book directly with them to create your custom package.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl p-6 z-40">
        <Button
          disabled={selectedCategories.length === 0}
          className="w-full h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
          onClick={() => alert('Package summary and research tools opened')}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          View Package Summary ({selectedCategories.length})
        </Button>
      </div>
    </div>
  );
}

// Preferences Summary Screen
interface PreferencesSummaryScreenProps {
  onBack: () => void;
  savedPreferences: Record<string, string[]>;
  subcategories: Subcategory[];
  onClearAll: () => void;
}

function PreferencesSummaryScreen({
  onBack,
  savedPreferences,
  subcategories,
  onClearAll,
}: PreferencesSummaryScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-8">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 pt-12 pb-8 rounded-b-[2rem]">
        <button
          onClick={onBack}
          className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-6"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Bookmark className="w-9 h-9 text-white" />
          </div>
          <div>
            <h1 className="text-white text-3xl font-bold">My Travel Preferences</h1>
            <p className="text-white/90 text-base">Your saved service preferences</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4">
        <Card className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-3xl p-5 shadow-lg mb-6 border-2 border-blue-300">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-700 flex-shrink-0 mt-1" />
            <div>
              <p className="font-bold text-base text-blue-900 mb-1">How Preferences Work</p>
              <p className="text-sm text-blue-800">
                These will be suggested when you book tours in other categories, making your planning faster and easier.
              </p>
            </div>
          </div>
        </Card>

        {Object.keys(savedPreferences).length === 0 ? (
          <Card className="bg-white rounded-3xl p-8 shadow-lg text-center">
            <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No Preferences Saved Yet</h3>
            <p className="text-gray-600 text-sm mb-6">
              Browse service categories and save your preferences to get personalized suggestions.
            </p>
            <Button
              onClick={onBack}
              className="h-12 px-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"
            >
              Browse Services
            </Button>
          </Card>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {Object.entries(savedPreferences).map(([categoryId, services]) => {
                const category = subcategories.find(cat => cat.id === categoryId);
                if (!category || services.length === 0) return null;

                const Icon = category.icon;

                return (
                  <Card key={categoryId} className="bg-white rounded-2xl p-5 shadow-lg">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                        <p className="text-sm text-gray-600">
                          {services.length} service{services.length > 1 ? 's' : ''} selected
                        </p>
                      </div>
                      <button className="text-sm text-blue-600 font-semibold">Edit</button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {services.map((serviceKey, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          Service {i + 1}
                        </span>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>

            <Button
              onClick={() => {
                if (confirm('Are you sure you want to clear all saved preferences?')) {
                  onClearAll();
                }
              }}
              variant="outline"
              className="w-full h-12 rounded-full border-2 border-red-300 text-red-600 hover:bg-red-50"
            >
              <X className="w-5 h-5 mr-2" />
              Clear All Preferences
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
