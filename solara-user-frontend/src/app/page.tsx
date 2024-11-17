
import MainBanner from '@/app/homepage/MainBanner'
import SpecialFeatures from './homepage/SpecialFeatures/SpecialFeatures';
import Reviews from './homepage/Reviews/Reviews'
import PartnerSection from './homepage/PartnerSection/PartnerSection';
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
