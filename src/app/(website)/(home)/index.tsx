import WhyChoose from "@/components/sections/home/WhyChooseUs";
import ProjectsSection from "@/components/sections/home/Projects";
import Testimonials from "@/components/sections/home/Testimonials";
// import Newsletter from "@/components/sections/home/Newsletters";
// import { LatestProperties } from "@/components/sections/home/FeaturedProperties";
// import HeroSection from "@/components/sections/home/Hero";
import PropertyShowcase from "@/components/sections/home/PropertySlider";
// import MeetOurTeam from "@/components/sections/home/Team";
// import RealEstateLeafletMap from "@/components/layout/Map";
import BlogSection from "@/components/sections/home/Blogs";
import { getBlogPosts } from "@/data/blogs";
import CEOMessage from "@/components/sections/home/Vision";
import Amenities from "@/components/sections/home/Amenities";
import { Hero } from "@/components/common/Hero";
// import { RegisterInterestForm } from "@/components/register-form/register-interest-form";
import { RegisterHero } from "@/components/register-form/hero-section";
// import PropertyGallery from "@/components/sections/home/ApartmentGallery";

const HomePage = () => {
  const posts = getBlogPosts();
  return (
    <div >
      {/* <Header /> */}
      {/* <HeroSection /> */}
      <Hero
      title="Luxury Living Redefined"
      subtitle="Experience unparalleled comfort and elegance"
      backgroundType="video"
      backgroundSrc="video2_lzrdux.mp4"
      fallbackImage="video2_lzrdux.jpg"
      showScrollIndicator={true}
      contentAlignment="left"
      enableAnimations={true}
    />
    
      <div>
        <CEOMessage />
        <ProjectsSection />
        {/* <PropertyGallery /> */}
        <PropertyShowcase />
        {/* <LatestProperties /> */}
        <Amenities />
        <WhyChoose />
        <Testimonials />
        {/* <Newsletter /> */}
        {/* <MeetOurTeam /> */}
        <BlogSection posts={posts}/>
        <RegisterHero />
      </div>
      {/* <RealEstateLeafletMap /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
