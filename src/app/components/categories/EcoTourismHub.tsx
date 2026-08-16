import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Settings, HelpCircle, Globe, Youtube } from 'lucide-react';
import { Button } from '../ui/button';
import { EcoTourismLanding } from '../eco/EcoTourismLanding';
import { EcoSubCategoryTemplate } from '../eco/EcoSubCategoryTemplate';
import { EcoInterestCapture } from '../eco/EcoInterestCapture';
import { EcoBudgetPreferences } from '../eco/EcoBudgetPreferences';
import { EcoFlowDiagram } from '../eco/EcoFlowDiagram';
import { EcoAdminDashboard } from '../eco/EcoAdminDashboard';
import { EcoBudgetPreferencesData } from '../../../types/index';

interface EcoTourismHubProps {
  onBack: () => void;
}

type EcoScreen = 
  | 'landing'
  | 'subcategory'
  | 'flow-diagram'
  | 'admin-dashboard';

interface SubCategoryData {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const subCategoryMapping: Record<string, SubCategoryData> = {
  'national-parks': {
    id: 'national-parks',
    name: 'National Parks & Wildlife',
    icon: '🐅',
    description: 'Tiger reserves, birdwatching, bio-diverse zones',
  },
  'tribal-villages': {
    id: 'tribal-villages',
    name: 'Tribal & Heritage Villages',
    icon: '🏘️',
    description: 'Indigenous communities, traditional crafts, cultural exchange',
  },
  'organic-farms': {
    id: 'organic-farms',
    name: 'Organic Farms & Agro-Tourism',
    icon: '🌾',
    description: 'Farm stays, organic produce, hands-on farming',
  },
  'eco-lodges': {
    id: 'eco-lodges',
    name: 'Eco-Lodges & Sustainable Stays',
    icon: '🏡',
    description: 'Zero-waste resorts, bamboo cottages, tree houses',
  },
  'coastal-marine': {
    id: 'coastal-marine',
    name: 'Coastal & Marine Conservation',
    icon: '🐚',
    description: 'Beach cleanups, coral protection, mangrove tours',
  },
  'mountain-trekking': {
    id: 'mountain-trekking',
    name: 'Mountain & Trekking Eco-Tours',
    icon: '⛰️',
    description: 'Responsible hiking, minimal-impact trails, eco-camping',
  },
};

export function EcoTourismHub({ onBack }: EcoTourismHubProps) {
  const [currentScreen, setCurrentScreen] = useState<EcoScreen>('landing');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [currentDestination, setCurrentDestination] = useState<string>('');

  const handleSubCategorySelect = (categoryId: string) => {
    setSelectedSubCategory(categoryId);
    setCurrentScreen('subcategory');
  };

  const handleBackToLanding = () => {
    setCurrentScreen('landing');
    setSelectedSubCategory(null);
  };

  const handleSaveInterest = (destinationId: string) => {
    setCurrentDestination(destinationId);
    setShowInterestModal(true);
  };

  const handleSetPreferences = () => {
    setShowPreferencesModal(true);
  };

  const handleSavePreferences = (preferences: EcoBudgetPreferencesData) => {
    console.log('Preferences saved:', preferences);
    setShowPreferencesModal(false);
    // In a real app, this would save to backend/context
  };

  const handleGoogleSearch = () => {
    const query = selectedSubCategory 
      ? `${subCategoryMapping[selectedSubCategory]?.name} eco tourism india`
      : 'eco tourism india';
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  };

  const handleYouTubeSearch = () => {
    const query = selectedSubCategory 
      ? `${subCategoryMapping[selectedSubCategory]?.name} eco tourism india`
      : 'eco tourism india';
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank');
  };

  // Admin Dashboard
  if (showAdminDashboard) {
    return <EcoAdminDashboard isOpen={true} onClose={() => setShowAdminDashboard(false)} />;
  }

  // Flow Diagram Screen
  if (currentScreen === 'flow-diagram') {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="sticky top-0 z-10 bg-gray-800 px-6 py-4 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentScreen('landing')}
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-white text-xl font-bold">Eco Tourism Flow Diagram</h1>
          </div>
        </div>
        <EcoFlowDiagram />
      </div>
    );
  }

  // Subcategory Screen
  if (currentScreen === 'subcategory' && selectedSubCategory) {
    const subCat = subCategoryMapping[selectedSubCategory];
    
    // Handle invalid subcategory selection
    if (!subCat) {
      setCurrentScreen('landing');
      setSelectedSubCategory(null);
      return null;
    }
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 rounded-b-3xl shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handleBackToLanding}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleSetPreferences}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                <Settings className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => setCurrentScreen('flow-diagram')}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                <HelpCircle className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Google & YouTube Search Buttons */}
          <div className="flex gap-2 mb-2">
            <Button
              onClick={handleGoogleSearch}
              className="flex-1 bg-white text-green-600 hover:bg-gray-100 rounded-full h-9 flex items-center justify-center gap-2 text-sm"
            >
              <Globe className="w-4 h-4" />
              Google Search
            </Button>
            <Button
              onClick={handleYouTubeSearch}
              className="flex-1 bg-white text-red-600 hover:bg-gray-100 rounded-full h-9 flex items-center justify-center gap-2 text-sm"
            >
              <Youtube className="w-4 h-4" />
              YouTube
            </Button>
          </div>
        </div>

        {/* Subcategory Content */}
        <EcoSubCategoryTemplate
          categoryId={subCat.id}
          categoryName={subCat.name}
          categoryIcon={subCat.icon}
          categoryDescription={subCat.description}
          onBack={handleBackToLanding}
          onSaveInterest={handleSaveInterest}
          onSetPreferences={handleSetPreferences}
        />

        {/* Interest Capture Modal */}
        <EcoInterestCapture
          isOpen={showInterestModal}
          onClose={() => setShowInterestModal(false)}
          destinationName={currentDestination}
          categoryName={subCat.name}
        />

        {/* Budget Preferences Modal */}
        <EcoBudgetPreferences
          isOpen={showPreferencesModal}
          onClose={() => setShowPreferencesModal(false)}
          onSave={handleSavePreferences}
        />
      </div>
    );
  }

  // Landing Screen (Default)
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-white text-2xl font-bold">🌿 Eco Tourism</h1>
              <p className="text-white/80 text-sm">Sustainable Travel Experiences</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSetPreferences}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              <Settings className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => setCurrentScreen('flow-diagram')}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              <HelpCircle className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Google & YouTube Search Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleGoogleSearch}
            className="flex-1 bg-white text-green-600 hover:bg-gray-100 rounded-full h-10 flex items-center justify-center gap-2"
          >
            <Globe className="w-4 h-4" />
            Google Search
          </Button>
          <Button
            onClick={handleYouTubeSearch}
            className="flex-1 bg-white text-red-600 hover:bg-gray-100 rounded-full h-10 flex items-center justify-center gap-2"
          >
            <Youtube className="w-4 h-4" />
            YouTube Browse
          </Button>
        </div>
      </div>

      {/* Landing Content */}
      <div className="px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <EcoTourismLanding onSubCategorySelect={handleSubCategorySelect} />
        </motion.div>

        {/* Admin Access (Hidden in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8">
            <Button
              onClick={() => setShowAdminDashboard(true)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl h-12"
            >
              🔧 Admin Dashboard (Dev Only)
            </Button>
          </div>
        )}
      </div>

      {/* Budget Preferences Modal */}
      <EcoBudgetPreferences
        isOpen={showPreferencesModal}
        onClose={() => setShowPreferencesModal(false)}
        onSave={handleSavePreferences}
      />
    </div>
  );
}
