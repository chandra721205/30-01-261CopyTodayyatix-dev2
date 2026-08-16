import { useState, useEffect } from 'react';
import { AdminModeProvider } from './components/admin/AdminModeContext';
import { MainLayout } from './components/layout/MainLayout';
import { SplashScreen } from './components/onboarding/SplashScreen';
import { LanguageSelection } from './components/onboarding/LanguageSelection';
import { SignUp } from './components/onboarding/SignUp';
import { OTPVerification } from './components/onboarding/OTPVerification';
import { KYCIntro } from './components/onboarding/KYCIntro';
import { KYCPhone } from './components/onboarding/KYCPhone';
import { KYCDocuments } from './components/onboarding/KYCDocuments';
import { WelcomeVerified } from './components/onboarding/WelcomeVerified';
import { OnboardingSlides } from './components/onboarding/OnboardingSlides';
import { WelcomePostOnboarding } from './components/onboarding/WelcomePostOnboarding';
import { GetStarted } from './components/onboarding/GetStarted';
import { Toaster } from './components/ui/sonner';
import { UserData } from '../types/index';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const onboarded = localStorage.getItem('grokyatra_onboarded');
    if (onboarded) {
      setIsOnboarded(true);
      setCurrentScreen('main');
    }
  }, []);

  const handleNavigation = (screen: string, data?: Partial<UserData>) => {
    setCurrentScreen(screen);
    if (data) {
      setUserData({ ...userData, ...data });
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem('grokyatra_onboarded', 'true');
    setIsOnboarded(true);
    setCurrentScreen('main');
  };

  if (isOnboarded && currentScreen === 'main') {
    return (
      <AdminModeProvider>
        <MainLayout userData={userData} />
        <Toaster />
      </AdminModeProvider>
    );
  }

  return (
    <AdminModeProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50">
        {currentScreen === 'splash' && (
          <SplashScreen onComplete={() => handleNavigation('language')} />
        )}
        {currentScreen === 'language' && (
          <LanguageSelection onNext={(lang) => handleNavigation('signup', { language: lang })} />
        )}
        {currentScreen === 'signup' && (
          <SignUp onNext={(data) => handleNavigation('otp', data)} />
        )}
        {currentScreen === 'otp' && (
          <OTPVerification onNext={() => handleNavigation('kyc-intro')} />
        )}
        {currentScreen === 'kyc-intro' && (
          <KYCIntro onNext={() => handleNavigation('kyc-phone')} />
        )}
        {currentScreen === 'kyc-phone' && (
          <KYCPhone onNext={() => handleNavigation('kyc-documents')} />
        )}
        {currentScreen === 'kyc-documents' && (
          <KYCDocuments onNext={() => handleNavigation('welcome-verified')} />
        )}
        {currentScreen === 'welcome-verified' && (
          <WelcomeVerified onNext={() => handleNavigation('onboarding-slides')} />
        )}
        {currentScreen === 'onboarding-slides' && (
          <OnboardingSlides onNext={() => handleNavigation('welcome-post')} />
        )}
        {currentScreen === 'welcome-post' && (
          <WelcomePostOnboarding onNext={() => handleNavigation('get-started')} />
        )}
        {currentScreen === 'get-started' && (
          <GetStarted onComplete={completeOnboarding} />
        )}
      </div>
      <Toaster />
    </AdminModeProvider>
  );
}
