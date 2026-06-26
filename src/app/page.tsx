'use client';

import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import LandingScreen from '@/components/sections/LandingScreen';
import TheWomanBehindTheLegacy from '@/components/sections/TheWomanBehindTheLegacy';
import JourneyThroughTime from '@/components/sections/JourneyThroughTime';
import ByTheNumbers from '@/components/sections/ByTheNumbers';
import TheSchoolSheHelpedShape from '@/components/sections/TheSchoolSheHelpedShape';
import GalleryOfMemories from '@/components/sections/GalleryOfMemories';
import MomentsOfImpact from '@/components/sections/MomentsOfImpact';
import VoicesOfGratitude from '@/components/sections/VoicesOfGratitude';
import LegacyWall from '@/components/sections/LegacyWall';
import ThankYouSection from '@/components/sections/ThankYouSection';

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main>
        <LandingScreen />
        <TheWomanBehindTheLegacy />
        <JourneyThroughTime />
        <ByTheNumbers />
        <TheSchoolSheHelpedShape />
        <GalleryOfMemories />
        <MomentsOfImpact />
        <VoicesOfGratitude />
        <LegacyWall />
        <ThankYouSection />
        <footer className="bg-black py-8 text-center">
          <p className="text-white/50 text-sm">
            Made with love by{' '}
            <span
              style={{
                color: '#c9a227',
                animation: 'glowSubtle 3s ease-in-out infinite',
                display: 'inline-block',
              }}
            >
              ASB Middle Section
            </span>
          </p>
        </footer>
      </main>
    </SmoothScrollProvider>
  );
}
