"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/common/Hero";

// Types
interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  description: string;
  experience: string;
  achievements: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

interface MissionVision {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

// Data
const aboutPageData = {
  hero: {
    title: "Redefining Luxury Real Estate Excellence",
    subtitle: "Where Vision Meets Reality in Premium Property Development",
    backgroundImage:
      "/images/Booking1.jpg",
  },
  missionVision: [
    {
      title: "Our Mission",
      description:
        "To transform the real estate landscape by delivering exceptional luxury properties that exceed expectations, while maintaining the highest standards of integrity, innovation, and client satisfaction.",
      icon: "🎯",
      features: [
        "Deliver premium quality construction and design",
        "Provide unparalleled customer service experience",
        "Create sustainable and innovative living spaces",
        "Build lasting relationships with our clients and partners",
      ],
    },
    {
      title: "Our Vision",
      description:
        "To be the most trusted and recognized luxury real estate developer, setting new benchmarks in architectural excellence and creating iconic properties that define modern living.",
      icon: "🌟",
      features: [
        "Lead the market in luxury property development",
        "Pioneer sustainable construction practices",
        "Establish global presence in premium real estate",
        "Create communities that enhance quality of life",
      ],
    },
  ],
  team: [
    {
      id: "chairman",
      name: "Altaf Khan",
      position: "Chairman",
      image: "/images/altaf.jpg",
      description:
        "With over 30 years of experience in luxury real estate development, Altaf Khan has been the visionary force behind our company's growth into one of the region's most prestigious property developers.",
      experience: "30+ Years in Real Estate",
      achievements: [
        "Founded the company in 1993 with a vision for luxury development",
        "Led development of over $2B worth of premium properties",
        "Recipient of Real Estate Developer of the Year Award 2023",
        "Pioneer in sustainable luxury construction practices",
        "Established strategic partnerships across 15+ countries",
      ],
      socialLinks: {
        linkedin: "#",
        email: "chairman@company.com",
      },
    },
    {
      id: "md",
      name: "Muhammad Asghar",
      position: "Managing Director",
      image: "/images/altaf2.jpg",
      description:
        "Sarah Davidson brings exceptional operational expertise and strategic leadership to our organization. Her innovative approach to project management and client relations has elevated our standards of excellence.",
      experience: "25+ Years in Operations",
      achievements: [
        "Streamlined operations resulting in 40% efficiency improvement",
        "Implemented award-winning customer service protocols",
        "Led successful delivery of 50+ luxury projects on time",
        "Established quality assurance standards adopted industry-wide",
        "MBA from Harvard Business School with Real Estate specialization",
      ],
      socialLinks: {
        linkedin: "#",
        email: "md@company.com",
      },
    },
    {
      id: "sales",
      name: "Muhammad Sohail",
      position: "Sales Expert",
      image: "/images/altaf3.jpg",
      description:
        "Muhammad Sohail is our top-performing sales professional, renowned for his deep market knowledge and ability to match clients with their perfect luxury properties. His consultative approach has earned him recognition as a trusted advisor.",
      experience: "20+ Years in Luxury Sales",
      achievements: [
        "Achieved over $500M in luxury property sales",
        "Maintained 98% client satisfaction rate over 10 years",
        "Top Sales Professional Award winner for 5 consecutive years",
        "Specialist in ultra-high-net-worth client relationships",
        "Fluent in 6 languages serving international clientele",
      ],
      socialLinks: {
        linkedin: "#",
        email: "sales@company.com",
      },
    },
  ],
  company: {
    foundedYear: "1993",
    description:
      "Established in 1993, we have grown from a boutique real estate firm to one of the region's most prestigious luxury property developers. Our commitment to excellence, innovation, and client satisfaction has made us the preferred choice for discerning buyers seeking exceptional properties.",
    values: [
      {
        title: "Uncompromising Quality",
        description: "We maintain the highest standards in every aspect of our developments."
      },
      {
        title: "Innovative Design", 
        description: "Pushing boundaries with cutting-edge architectural solutions."
      },
      {
        title: "Client-Centric Approach",
        description: "Every decision is made with our clients' best interests in mind."
      },
      {
        title: "Sustainable Development",
        description: "Building for the future with environmental responsibility."
      },
      {
        title: "Integrity & Transparency",
        description: "Honest communication and ethical practices in all our dealings."
      }
    ],
  },
};

// Mission Vision Card Component
const MissionVisionCard: React.FC<{ data: MissionVision; index: number }> = ({
  data,
  index,
}) => {
  return (
    <Card
      className={`card group hover:text-white relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
        index % 2 === 0 ? "lg:mr-8" : "lg:ml-8"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[rgba(140,46,71,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardContent className="relative z-10 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="text-4xl bg-gradient-to-br from-[rgb(140,46,71)] to-[rgb(180,86,111)] p-3 rounded-full shadow-lg">
            {data.icon}
          </div>
          <h3 className="text-2xl font-semibold group-hover:text-white transition-colors duration-300">
            {data.title}
          </h3>
        </div>

        <p className="leading-relaxed mb-6">{data.description}</p>

        <div className="space-y-3">
          {data.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3 group/item">
              <div className="w-2 h-2 rounded-full bg-[rgb(140,46,71)] mt-2 group-hover/item:scale-125 transition-transform duration-200" />
              <span className="transition-colors duration-200">{feature}</span>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[rgb(140,46,71)] to-[rgb(180,86,111)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </CardContent>
    </Card>
  );
};

// Team Member Card Component
const TeamMemberCard: React.FC<{ member: TeamMember; reversed?: boolean }> = ({
  member,
  reversed = false,
}) => {
  return (
    <Card className="overflow-hidden shadow-xl bg-white border-0">
      <CardContent className="p-0">
        <div
          className={`flex flex-col ${
            reversed ? "lg:flex-row-reverse" : "lg:flex-row"
          } h-[600px]`}
        >
          {/* Image Section */}
          <div className="lg:w-1/2 h-full relative overflow-hidden group/image">
            <Image
              src={member.image}
              alt={member.name}
              width={600}
              height={600}
              className="w-full h-full object-cover group-hover/image:scale-110 transition-transform duration-700"
              priority
            />
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 h-full p-8 lg:p-12 flex flex-col justify-center">
            <div className="mb-6">
              <h3 className="text-3xl lg:text-4xl font-bold mb-2">
                {member.name}
              </h3>
              <div className="font-medium text-[rgb(140,46,71)] mb-4">
                {member.position}
              </div>
              <div className="w-16 h-1 bg-gradient-to-r from-[rgb(140,46,71)] to-[rgb(180,86,111)] rounded-full" />
            </div>

            <p className="leading-relaxed mb-8">{member.description}</p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Key Achievements</h3>
              {member.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 group/achievement"
                >
                  <div className="w-3 h-3 rounded-full bg-[rgb(140,46,71)] mt-1.5 flex-shrink-0 group-hover/achievement:scale-125 transition-transform duration-200" />
                  <span className="transition-colors duration-200">
                    {achievement}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Company Value Card Component
const CompanyValueCard: React.FC<{ value: { title: string; description: string }; index: number }> = ({
  value,
  index,
}) => {
  return (
    <Card className="card group relative overflow-hidden hover:text-white bg-white border border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 px-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(140,46,71,0.05)] to-[rgba(140,46,71,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardContent className="relative z-10 p-2 text-center">
        <div className="bg-[rgb(140,46,71)] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl font-bold">{index + 1}</span>
        </div>
        
        <h3 className="text-xl mb-4 group-hover:text-white transition-colors duration-300">
          {value.title}
        </h3>
        
        <p className="leading-relaxed  transition-colors duration-300">
          {value.description}
        </p>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[rgb(140,46,71)] to-[rgb(255,108,147)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </CardContent>
    </Card>
  );
};

// Main About Page Component
export default function AboutPage() {
  const [, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.5s forwards;
          opacity: 0;
        }

        .animate-fade-in-up-delay {
          animation: fade-in-up 1s ease-out 1s forwards;
          opacity: 0;
        }

        .animate-fade-in-up-delay-2 {
          animation: fade-in-up 1s ease-out 1.5s forwards;
          opacity: 0;
        }

        .animate-fade-in-up-delay-3 {
          animation: fade-in-up 1s ease-out 2s forwards;
          opacity: 0;
        }
      `}</style>

      {/* Hero Section */}
      <HeroSection {...aboutPageData.hero} page="About Us"/>

      {/* Mission & Vision Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,<svg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'><g fill=\'none\' fill-rule=\'evenodd\'><g fill=\'#f3f4f6\' fill-opacity=\'0.4\'><circle cx=\'20\' cy=\'20\' r=\'1\'/></g></g></svg>\')] opacity-30" />

        <div className="container mx-auto relative z-10 px-24">
          <div className="mb-16 flex gap-12 w-full">
            <motion.h1 className="text-4xl lg:text-6xl text-[rgb(140,46,71)] mb-4 w-1/2">
              Real luxury is time well spent in peace, not things well owned in
              noise.
            </motion.h1>
            <motion.p className="w-1/2">
              Altaf Developments was founded in the UAE in October 2014, with
              our construction division operating in the region for nearly 20
              years. We believe that the future of real estate lies not just in
              building spaces but in creating immersive experiences that
              inspire, transform, and integrate communities. At the heart of our
              philosophy is a steadfast commitment to delivering lasting value
              to our customers and stakeholders. We strive for the
              extraordinary, with a mission to revolutionise the real estate
              industry by setting new benchmarks in design, functionality, and
              sustainability. Driven by a relentless pursuit of innovation and
              excellence, we continue to push the boundaries of what&apos;s possible,
              reshaping the future of real estate, one project at a time. Join
              us as we embark on A Journey to Perfection, enriching lives along
              the way.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-2 max-w-7xl mx-auto">
            {aboutPageData.missionVision.map((item, index) => (
              <MissionVisionCard key={index} data={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-16">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl  mb-6">
              Meet Our Leaders
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Our experienced leadership team brings decades of combined
              expertise in luxury real estate development, operations, and
              client relations.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[rgb(140,46,71)] to-[rgb(180,86,111)] mx-auto rounded-full" />
          </div>

          <div className="space-y-20 mx-auto">
            {aboutPageData.team.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                reversed={index % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl mb-6">
              Our Core Values
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              {aboutPageData.company.description}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[rgb(140,46,71)] to-[rgb(180,86,111)] mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {aboutPageData.company.values.map((value, index) => (
              <CompanyValueCard key={index} value={value} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}