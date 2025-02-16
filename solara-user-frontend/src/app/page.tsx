import MainBanner from '@/components/Homepage/MainBanner/MainBanner'
import SpecialFeatures from '../components/Homepage/SpecialFeatures/SpecialFeatures';
import Reviews from '../components/Homepage/Reviews/Reviews'
import PartnerSection from '../components/Homepage/PartnerSection/PartnerSection';
import AppFooter from '@/components/layout/AppFooter';
import InformationSection from '@/components/Homepage/InformationSection/InformationSection';
export default function Home() {
  return (
    <div className='bg-white'>
      <MainBanner/>
      <SpecialFeatures/>
      <Reviews/>
      <PartnerSection/>
      <InformationSection/>
      <AppFooter></AppFooter>
    </div>
  );
}
