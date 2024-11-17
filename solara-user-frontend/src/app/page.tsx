
import MainBanner from '@/components/Homepage/MainBanner'
import SpecialFeatures from '../components/Homepage/SpecialFeatures/SpecialFeatures';
import Reviews from '../components/Homepage/Reviews/Reviews'
import PartnerSection from '../components/Homepage/PartnerSection/PartnerSection';
export default function Home() {
  return (
    <div>
      <MainBanner/>
      <SpecialFeatures/>
      <Reviews/>
      <PartnerSection/>
    </div>
  );
}
