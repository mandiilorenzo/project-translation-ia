import AppBar from '@/components/AppBar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '../FeaturesSection';
import HowItWorksSection from '../HowItWorksSection';
import CTASection from '../CTASection';
import Footer from '../Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-teal-100 selection:text-teal-900 font-sans">
      <AppBar />

      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}