import WhyChoose from "@/components/sections/home/WhyChooseUs";
import ProjectsSection from "@/components/sections/home/Projects";
import Testimonials from "@/components/sections/home/Testimonials";
import Newsletter from "@/components/sections/home/Newsletters";
// import { LatestProperties } from "@/components/sections/home/FeaturedProperties";
import HeroSection from "@/components/sections/home/Hero";
import PropertyShowcase from "@/components/sections/home/PropertySlider";
import MeetOurTeam from "@/components/sections/home/Team";
import RealEstateLeafletMap from "@/components/layout/Map";
import BlogSection from "@/components/sections/home/Blogs";
import { getBlogPosts } from "@/data/blogs";
import CEOMessage from "@/components/sections/home/Vision";
import Amenities from "@/components/sections/home/Amenities";
// import PropertyGallery from "@/components/sections/home/ApartmentGallery";

const HomePage = () => {
  const posts = getBlogPosts();
  return (
    <div className="">
      {/* <Header /> */}
      <HeroSection />.
      <div>
        <CEOMessage />
        {/* <PropertyGallery /> */}
        <ProjectsSection />
        <PropertyShowcase />
        {/* <LatestProperties /> */}
        <Amenities />
        <WhyChoose />
        <Testimonials />
        <Newsletter />
        <BlogSection posts={posts}/>
        <MeetOurTeam />
      </div>
      <RealEstateLeafletMap />
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
