import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trash2, Edit3, Eye, EyeOff, Plus, Search, Filter, 
  ChevronDown, ChevronRight, FolderOpen, FileCode, Settings, Save, X 
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

// Define screen structure
export interface ScreenInfo {
  id: string;
  name: string;
  path: string;
  category: string;
  subcategory?: string;
  isVisible: boolean;
  isEditable: boolean;
  screens: number;
  lastModified: string;
}

// Comprehensive screen registry for GrokYatra (206 screens across 23 categories)
const SCREEN_REGISTRY: ScreenInfo[] = [
  // Onboarding (11 screens)
  { id: 'onb-1', name: 'Splash Screen', path: '/src/app/components/onboarding/SplashScreen.tsx', category: 'Onboarding', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'onb-2', name: 'Language Selection', path: '/src/app/components/onboarding/LanguageSelection.tsx', category: 'Onboarding', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'onb-3', name: 'Sign Up', path: '/src/app/components/onboarding/SignUp.tsx', category: 'Onboarding', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'onb-4', name: 'OTP Verification', path: '/src/app/components/onboarding/OTPVerification.tsx', category: 'Onboarding', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'onb-5', name: 'KYC Intro', path: '/src/app/components/onboarding/KYCIntro.tsx', category: 'Onboarding', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'onb-6', name: 'KYC Phone', path: '/src/app/components/onboarding/KYCPhone.tsx', category: 'Onboarding', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'onb-7', name: 'KYC Documents', path: '/src/app/components/onboarding/KYCDocuments.tsx', category: 'Onboarding', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'onb-8', name: 'Welcome Verified', path: '/src/app/components/onboarding/WelcomeVerified.tsx', category: 'Onboarding', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'onb-9', name: 'Onboarding Slides', path: '/src/app/components/onboarding/OnboardingSlides.tsx', category: 'Onboarding', screens: 3, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'onb-10', name: 'Welcome Post Onboarding', path: '/src/app/components/onboarding/WelcomePostOnboarding.tsx', category: 'Onboarding', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'onb-11', name: 'Get Started', path: '/src/app/components/onboarding/GetStarted.tsx', category: 'Onboarding', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },

  // Main Navigation (5 screens)
  { id: 'main-1', name: 'Main Home', path: '/src/app/components/main/MainHome.tsx', category: 'Main Navigation', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'main-2', name: 'Explore', path: '/src/app/components/main/Explore.tsx', category: 'Main Navigation', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'main-3', name: 'My Bookings', path: '/src/app/components/main/MyBookings.tsx', category: 'Main Navigation', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'main-4', name: 'Messages', path: '/src/app/components/main/Messages.tsx', category: 'Main Navigation', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'main-5', name: 'Profile', path: '/src/app/components/main/Profile.tsx', category: 'Main Navigation', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },

  // Adventure Tourism (8 screens)
  { id: 'adv-1', name: 'Adventure Tourism Hub', path: '/src/app/components/categories/AdventureTourismHub.tsx', category: 'Adventure Tourism', screens: 8, isVisible: true, isEditable: true, lastModified: '2026-02-10' },

  // Devotional Tourism (26 screens)
  { id: 'dev-1', name: 'Devotional Tourism Hub', path: '/src/app/components/categories/DevotionalTourismHub.tsx', category: 'Devotional Tourism', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'dev-2', name: 'Hindu Pilgrims Flow', path: '/src/app/components/categories/HinduPilgrimsFlow.tsx', category: 'Devotional Tourism', subcategory: 'Hindu', screens: 6, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'dev-3', name: 'Muslim Travelers', path: '/src/app/components/categories/MuslimTravelersEnhanced.tsx', category: 'Devotional Tourism', subcategory: 'Muslim', screens: 2, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'dev-4', name: 'Christian Pilgrims', path: '/src/app/components/categories/ChristianPilgrimsEnhanced.tsx', category: 'Devotional Tourism', subcategory: 'Christian', screens: 2, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'dev-5', name: 'Sikh Devotees', path: '/src/app/components/categories/SikhDevoteesEnhanced.tsx', category: 'Devotional Tourism', subcategory: 'Sikh', screens: 2, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'dev-6', name: 'Buddhist Followers', path: '/src/app/components/categories/BuddhistFollowersEnhanced.tsx', category: 'Devotional Tourism', subcategory: 'Buddhist', screens: 2, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'dev-7', name: 'Jain Pilgrims', path: '/src/app/components/categories/JainPilgrimsEnhanced.tsx', category: 'Devotional Tourism', subcategory: 'Jain', screens: 2, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'dev-8', name: 'Jewish Heritage', path: '/src/app/components/categories/JewishHeritageEnhanced.tsx', category: 'Devotional Tourism', subcategory: 'Jewish', screens: 2, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'dev-9', name: 'Parsi Heritage', path: '/src/app/components/categories/ParsiHeritageEnhanced.tsx', category: 'Devotional Tourism', subcategory: 'Parsi', screens: 2, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'dev-10', name: 'Bahai Visitors', path: '/src/app/components/categories/BahaiVisitorsEnhanced.tsx', category: 'Devotional Tourism', subcategory: 'Bahai', screens: 2, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'dev-11', name: 'Indigenous Tribal', path: '/src/app/components/categories/IndigenousTribalEnhanced.tsx', category: 'Devotional Tourism', subcategory: 'Indigenous', screens: 2, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'dev-12', name: 'All Religions Enhanced', path: '/src/app/components/categories/AllReligionsEnhanced.tsx', category: 'Devotional Tourism', subcategory: 'All Religions', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },

  // Health & Wellness (12 screens)
  { id: 'wellness-1', name: 'Senior Wellness Hub', path: '/src/app/components/seniors/SeniorWellnessHub.tsx', category: 'Health & Wellness', screens: 12, isVisible: true, isEditable: true, lastModified: '2026-02-10' },

  // Heritage & Cultural (10 screens)
  { id: 'heritage-1', name: 'Heritage Complete Flow', path: '/src/app/components/heritage/HeritageCompleteFlow.tsx', category: 'Heritage & Cultural', screens: 10, isVisible: true, isEditable: true, lastModified: '2026-02-10' },

  // Eco Tourism (8 screens)
  { id: 'eco-1', name: 'Eco Tourism Hub', path: '/src/app/components/categories/EcoTourismHub.tsx', category: 'Eco Tourism', screens: 8, isVisible: true, isEditable: true, lastModified: '2026-02-10' },

  // Educational Tourism (32 screens)
  { id: 'edu-1', name: 'Educational Tourism Hub', path: '/src/app/components/categories/EducationalTourismHub.tsx', category: 'Educational Tourism', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'edu-2', name: 'School Groups K-12 Flow', path: '/src/app/components/categories/SchoolGroupsK12Flow.tsx', category: 'Educational Tourism', subcategory: 'School Groups', screens: 11, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'edu-3', name: 'College University Groups Flow', path: '/src/app/components/categories/CollegeUniversityGroupsFlow.tsx', category: 'Educational Tourism', subcategory: 'College Groups', screens: 10, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'edu-4', name: 'Individual Researchers Flow', path: '/src/app/components/categories/IndividualResearchersFlow.tsx', category: 'Educational Tourism', subcategory: 'Researchers', screens: 6, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'edu-5', name: 'Research Groups Flow', path: '/src/app/components/categories/ResearchGroupsFlow.tsx', category: 'Educational Tourism', subcategory: 'Research Groups', screens: 4, isVisible: true, isEditable: true, lastModified: '2026-02-10' },

  // Corporate & MICE (18 screens)
  { id: 'corp-1', name: 'Corporate MICE Hub Enhanced', path: '/src/app/components/categories/CorporateMICEHubEnhanced.tsx', category: 'Corporate & MICE', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'corp-2', name: 'Corporate Planning Flow', path: '/src/app/components/categories/CorporateMICEPlanningFlow.tsx', category: 'Corporate & MICE', screens: 17, isVisible: true, isEditable: true, lastModified: '2026-02-10' },

  // Cruise & Family Fun (15 screens)
  { id: 'cruise-1', name: 'Cruise Tourism Hub', path: '/src/app/components/categories/CruiseTourismHub.tsx', category: 'Cruise & Family Fun', screens: 15, isVisible: true, isEditable: true, lastModified: '2026-02-10' },

  // Sports Tourism (8 screens)
  { id: 'sports-1', name: 'Sports Tourism Hub', path: '/src/app/components/categories/SportsTourismHub.tsx', category: 'Sports Tourism', screens: 8, isVisible: true, isEditable: true, lastModified: '2026-02-10' },

  // Honeymoon (6 screens)
  { id: 'honey-1', name: 'Honeymoon Hub', path: '/src/app/components/honeymoon/HoneymoonHub.tsx', category: 'Honeymoon', screens: 6, isVisible: true, isEditable: true, lastModified: '2026-02-10' },

  // Travel Essentials (30 screens)
  { id: 'essentials-1', name: 'Travel Essentials Hub', path: '/src/app/components/categories/TravelEssentialsHub.tsx', category: 'Travel Essentials', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'essentials-2', name: 'Self Drive Flow', path: '/src/app/components/essentials/SelfDriveFlow.tsx', category: 'Travel Essentials', subcategory: 'Self-Drive', screens: 29, isVisible: true, isEditable: true, lastModified: '2026-02-10' },

  // Custom Tour Builder (9 screens)
  { id: 'custom-1', name: 'Multi-Category Planner', path: '/src/app/components/custom-tour/MultiCategoryPlanner.tsx', category: 'Custom Tour Builder', screens: 9, isVisible: true, isEditable: true, lastModified: '2026-02-10' },

  // Shared Components
  { id: 'shared-1', name: 'Interest Tracker', path: '/src/app/components/shared/InterestTracker.tsx', category: 'Shared Components', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'shared-2', name: 'Research Destination', path: '/src/app/components/shared/ResearchDestination.tsx', category: 'Shared Components', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
  { id: 'shared-3', name: 'Personalized Deals Alert', path: '/src/app/components/shared/PersonalizedDealsAlert.tsx', category: 'Shared Components', screens: 1, isVisible: true, isEditable: true, lastModified: '2026-02-10' },
];

interface ScreenManagerProps {
  onClose?: () => void;
}

export function ScreenManager({ onClose }: ScreenManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [selectedScreens, setSelectedScreens] = useState<Set<string>>(new Set());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [editingScreen, setEditingScreen] = useState<ScreenInfo | null>(null);

  // Get unique categories
  const categories = Array.from(new Set(SCREEN_REGISTRY.map(s => s.category)));

  // Filter screens
  const filteredScreens = SCREEN_REGISTRY.filter(screen => {
    const matchesSearch = screen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         screen.path.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || screen.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group by category
  const groupedScreens = categories.reduce((acc, category) => {
    acc[category] = filteredScreens.filter(s => s.category === category);
    return acc;
  }, {} as Record<string, ScreenInfo[]>);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleScreenSelection = (screenId: string) => {
    const newSelected = new Set(selectedScreens);
    if (newSelected.has(screenId)) {
      newSelected.delete(screenId);
    } else {
      newSelected.add(screenId);
    }
    setSelectedScreens(newSelected);
  };

  const handleDeleteSelected = () => {
    console.log('Deleting screens:', Array.from(selectedScreens));
    setShowDeleteConfirm(false);
    setSelectedScreens(new Set());
  };

  const handleEditScreen = (screen: ScreenInfo) => {
    setEditingScreen(screen);
    setShowEditPanel(true);
  };

  const totalScreens = SCREEN_REGISTRY.reduce((sum, s) => sum + s.screens, 0);
  const visibleScreens = SCREEN_REGISTRY.filter(s => s.isVisible).reduce((sum, s) => sum + s.screens, 0);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Screen Manager</h2>
              <p className="text-indigo-100 text-sm mt-1">
                Manage all {totalScreens} screens across {categories.length} categories
              </p>
            </div>
            {onClose && (
              <Button
                onClick={onClose}
                className="bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-3">
              <div className="text-2xl font-bold">{totalScreens}</div>
              <div className="text-xs text-indigo-100">Total Screens</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <div className="text-2xl font-bold">{visibleScreens}</div>
              <div className="text-xs text-indigo-100">Visible</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <div className="text-2xl font-bold">{categories.length}</div>
              <div className="text-xs text-indigo-100">Categories</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <div className="text-2xl font-bold">{selectedScreens.size}</div>
              <div className="text-xs text-indigo-100">Selected</div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="border-b border-gray-200 p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search screens by name or path..."
                className="pl-10"
              />
            </div>
            <Button
              onClick={() => setSelectedCategory(null)}
              variant={selectedCategory === null ? 'default' : 'outline'}
            >
              <Filter className="w-4 h-4 mr-2" />
              All
            </Button>
          </div>

          {/* Category filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.slice(0, 8).map(category => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                variant={category === selectedCategory ? 'default' : 'outline'}
                size="sm"
                className="whitespace-nowrap"
              >
                {category}
                <Badge variant="secondary" className="ml-2">
                  {groupedScreens[category]?.reduce((sum, s) => sum + s.screens, 0) || 0}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Bulk actions */}
          {selectedScreens.size > 0 && (
            <div className="bg-indigo-50 rounded-xl p-3 flex items-center justify-between">
              <div className="text-sm font-medium text-indigo-900">
                {selectedScreens.size} screen(s) selected
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedScreens(new Set())}
                >
                  Clear
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Screen List */}
        <div className="flex-1 overflow-y-auto p-4">
          {categories.map(category => {
            const categoryScreens = groupedScreens[category] || [];
            if (categoryScreens.length === 0) return null;

            const isExpanded = expandedCategories.has(category);
            const categoryTotal = categoryScreens.reduce((sum, s) => sum + s.screens, 0);

            return (
              <div key={category} className="mb-4">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    )}
                    <FolderOpen className="w-5 h-5 text-indigo-600" />
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{category}</div>
                      <div className="text-xs text-gray-500">
                        {categoryScreens.length} component(s), {categoryTotal} screen(s)
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">{categoryTotal}</Badge>
                </button>

                {/* Category Items */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-4 mt-2 space-y-2"
                    >
                      {categoryScreens.map(screen => (
                        <div
                          key={screen.id}
                          className={`bg-white border-2 rounded-xl p-4 transition-all ${
                            selectedScreens.has(screen.id)
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            {/* Screen Info */}
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <input
                                  type="checkbox"
                                  checked={selectedScreens.has(screen.id)}
                                  onChange={() => toggleScreenSelection(screen.id)}
                                  className="w-4 h-4 text-indigo-600 rounded"
                                />
                                <FileCode className="w-5 h-5 text-gray-400" />
                                <div>
                                  <div className="font-medium text-gray-900">{screen.name}</div>
                                  {screen.subcategory && (
                                    <div className="text-xs text-gray-500">{screen.subcategory}</div>
                                  )}
                                </div>
                              </div>
                              <div className="ml-7 space-y-1">
                                <div className="text-xs text-gray-500 font-mono">{screen.path}</div>
                                <div className="flex items-center gap-3">
                                  <Badge variant="outline" className="text-xs">
                                    {screen.screens} screen(s)
                                  </Badge>
                                  <Badge variant={screen.isVisible ? 'default' : 'secondary'} className="text-xs">
                                    {screen.isVisible ? (
                                      <><Eye className="w-3 h-3 mr-1" /> Visible</>
                                    ) : (
                                      <><EyeOff className="w-3 h-3 mr-1" /> Hidden</>
                                    )}
                                  </Badge>
                                  <span className="text-xs text-gray-400">
                                    Modified: {screen.lastModified}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditScreen(screen)}
                              >
                                <Edit3 className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedScreens(new Set([screen.id]));
                                  setShowDeleteConfirm(true);
                                }}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-2xl p-6 max-w-md w-full"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Screens?</h3>
                  <p className="text-gray-600">
                    Are you sure you want to delete {selectedScreens.size} screen(s)? This action cannot be undone.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => setShowDeleteConfirm(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeleteSelected}
                    variant="destructive"
                    className="flex-1"
                  >
                    Delete
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Panel */}
        <AnimatePresence>
          {showEditPanel && editingScreen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute inset-y-0 right-0 w-96 bg-white border-l border-gray-200 shadow-2xl"
            >
              <div className="h-full flex flex-col">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold">Edit Screen</h3>
                    <Button
                      onClick={() => setShowEditPanel(false)}
                      size="sm"
                      className="bg-white/20 hover:bg-white/30"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-indigo-100">{editingScreen.name}</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Screen Name
                    </label>
                    <Input defaultValue={editingScreen.name} />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      File Path
                    </label>
                    <Input defaultValue={editingScreen.path} className="font-mono text-xs" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Category
                    </label>
                    <Input defaultValue={editingScreen.category} />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Subcategory (Optional)
                    </label>
                    <Input defaultValue={editingScreen.subcategory || ''} />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Number of Screens
                    </label>
                    <Input type="number" defaultValue={editingScreen.screens} />
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={editingScreen.isVisible}
                        className="w-4 h-4 text-indigo-600 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">Visible</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={editingScreen.isEditable}
                        className="w-4 h-4 text-indigo-600 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">Editable</span>
                    </label>
                  </div>
                </div>

                <div className="border-t border-gray-200 p-4">
                  <Button className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
