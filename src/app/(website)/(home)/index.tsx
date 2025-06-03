
import WhyChoose from "@/components/sections/home/WhyChooseUs";
import ProjectsSection from "@/components/sections/home/Projects";
import Testimonials from "@/components/sections/home/Testimonials";
import Newsletter from "@/components/sections/home/Newsletters";
import {LatestProperties} from "@/components/sections/home/FeaturedProperties";
import HeroSection from "@/components/sections/home/Hero";
import PropertyShowcase from "@/components/sections/home/PropertySlider";
import MeetOurTeam from "@/components/sections/home/Team";
import RealEstateLeafletMap from "@/components/layout/Map";

const HomePage = () => {

  return (
    <div>
      {/* <Header /> */}
      <HeroSection />
      <ProjectsSection />
      <PropertyShowcase />
      <LatestProperties />
      <WhyChoose />
      <Testimonials />
      <Newsletter  />
      <MeetOurTeam />
      <RealEstateLeafletMap />
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
