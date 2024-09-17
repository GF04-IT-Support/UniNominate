import HeroSection from "@/components/pages/root/home/HeroSection";
import FeaturedNominations from "@/components/pages/root/home/FeaturedNominations";
import HowItWorks from "@/components/pages/root/home/HowItWorks";
import KeyStats from "@/components/pages/root/home/KeyStats";
import FAQSection from "@/components/pages/root/home/FAQSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedNominations />
      <HowItWorks />
      <KeyStats />
      <FAQSection limitToThree={true} />
    </div>
  );
}
