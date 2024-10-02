import dynamic from 'next/dynamic';
import HeroSection from "@/components/pages/root/home/HeroSection";
import NominationPositionsList from "@/components/pages/root/nominations/NominationPositionsList";
import HowItWorks from "@/components/pages/root/home/HowItWorks";
import KeyStats from "@/components/pages/root/home/KeyStats";
import FAQSkeleton from "@/components/pages/root/home/FAQSkeleton";
import { getNominationPositions } from "@/services/public/nominationService";

// Dynamically import FAQSection with SSR disabled
const FAQSection = dynamic(
  () => import('@/components/pages/root/home/FAQSection'),
  { 
    ssr: false,
    loading: () => <FAQSkeleton />
  }
);

export default async function Home() {
  const featuredPositions = await getNominationPositions(3);

  return (
    <div>
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl text-center font-bold mb-8">
          Open Nominations
        </h2>
        <NominationPositionsList
          positions={featuredPositions}
          showSearch={false}
        />
      </div>
      <HowItWorks />
      <KeyStats />
      <FAQSection limitToThree={true} />
    </div>
  );
}
