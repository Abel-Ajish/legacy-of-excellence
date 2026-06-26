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
import MessageForm from '@/components/MessageForm';
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
        <MessageForm />
        <LegacyWall />
        <ThankYouSection />
        <footer className="bg-black py-8 px-6 text-center relative">
          <p className="text-white/30 text-xs absolute bottom-2 right-4">
            Courtesy: Abel Ajish
          </p>
          <p className="text-white/50 text-sm">
            Made with love by{' '}
            <span
              className="text-gold inline-block animate-glow-subtle"
            >
              ASB Family
            </span>
          </p>
        </footer>
      </main>
    </SmoothScrollProvider>
  );
}
