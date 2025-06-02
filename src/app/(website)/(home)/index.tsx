
import WhyChoose from "@/components/sections/home/WhyChooseUs";
import ProjectsSection from "@/components/sections/home/Projects";
import Testimonials from "@/components/sections/home/Testimonials";
import Newsletter from "@/components/sections/home/Newsletters";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import FeaturedProperties from "@/components/sections/home/FeaturedProperties";
import HeroSection from "@/components/sections/home/Hero";

const HomePage = () => {

  return (
    <div>
      {/* <Header /> */}
      <HeroSection />
      <ProjectsSection />
      <FeaturedProperties />
      <WhyChoose />
      <Testimonials />
      <Newsletter  />
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
