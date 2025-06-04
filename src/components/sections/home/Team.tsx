"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Linkedin,
  Twitter,
  Mail,
  Phone,
  Users,
  Calendar,
} from "lucide-react";

// Import animations from constants
import {
  fadeInUp,
  scaleOnHover,
  cardHover,
  staggerContainer,
  slideInFromBottom,
  rotateOnHover,
  microSlide,
  quickFade,
  viewportDefault,
} from "@/lib/constants";

// Team member data
const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    position: "Chief Technology Officer",
    image: "/images/altaf3.jpg",
    bio: "Michael drives our technological innovation, ensuring we stay ahead in the digital real estate landscape.",
    email: "altaf1@company.com",
    phone: "+1 (555) 123-4568",
    linkedin: "#",
    twitter: "#",
    experience: "12+ Years",
    specialties: ["Technology", "Innovation", "Digital Solutions"],
    achievements: ["Tech Innovation Award", "Best CTO 2022"],
  },
  {
    id: 2,
    name: "Altaf Khan",
    position: "Chief Executive Officer",
    image: "/images/altaf.jpg",
    bio: "Emily's exceptional sales expertise and client relationship skills have made her an invaluable team leader.",
    email: "altaf@company.com",
    phone: "+92 1234567890",
    linkedin: "#",
    twitter: "#",
    experience: "10+ Years",
    specialties: ["Sales Strategy", "Client Relations", "Team Leadership"],
    achievements: ["Sales Leader of the Year", "Top Performer 2023"],
  },
  {
    id: 3,
    name: "David Thompson",
    position: "Senior Property Manager",
    image: "/images/altaf2.jpg",
    bio: "David ensures our properties are maintained to the highest standards while maximizing investment returns.",
    email: "david.thompson@company.com",
    phone: "+92 1234567890",
    linkedin: "#",
    twitter: "#",
    experience: "8+ Years",
    specialties: ["Management", "Investment Analysis", "Maintenance"],
    achievements: ["Property Manager Excellence", "Client Satisfaction Award"],
  },
];

const MeetOurTeam = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  return (
    <section className="py-12 px-4 sm:py-16 md:py-20 lg:py-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12 sm:mb-16" 
          {...slideInFromBottom}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-[#8B2131]/10 px-3 py-2 sm:px-4 rounded-full mb-4 sm:mb-6"
            {...microSlide}
          >
            <Users size={16} className="text-[#8B2131] sm:w-5 sm:h-5" />
            <span className="text-[#8B2131] font-medium dark:text-white text-sm sm:text-base">
              Our Team
            </span>
          </motion.div>

          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 sm:mb-6"
            {...fadeInUp}
          >
            MEET OUR
            <span className="bg-gradient-to-r from-[#8B2131] to-[#B91C1C] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold block sm:inline">
              {" "}CEO
            </span>
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed dark:text-white px-4 sm:px-0"
            {...fadeInUp}
          >
            Our dedicated team of professionals brings decades of combined
            experience to help you achieve your real estate goals with
            confidence and expertise.
          </motion.p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportDefault}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              className="group dark:bg-gray-900 w-full"
              variants={fadeInUp}
              onHoverStart={() => setHoveredMember(member.id)}
              onHoverEnd={() => setHoveredMember(null)}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:bg-gray-900 dark:border-gray-700 w-full"
                {...cardHover}
              >
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={320}
                    className="w-full h-64 sm:h-72 md:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                    {...rotateOnHover}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Social Links Overlay */}
                  <motion.div
                    className="absolute bottom-4 left-4 right-4 flex justify-center gap-2 sm:gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredMember === member.id ? 1 : 0,
                      y: hoveredMember === member.id ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.a
                      href={member.linkedin}
                      className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-[#8B2131] hover:bg-white transition-colors"
                      {...scaleOnHover}
                    >
                      <Linkedin size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </motion.a>
                    <motion.a
                      href={member.twitter}
                      className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-[#8B2131] hover:bg-white transition-colors"
                      {...scaleOnHover}
                    >
                      <Twitter size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </motion.a>
                    <motion.a
                      href={`mailto:${member.email}`}
                      className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-[#8B2131] hover:bg-white transition-colors"
                      {...scaleOnHover}
                    >
                      <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </motion.a>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-6">
                  <motion.h3
                    className="text-lg sm:text-xl dark:text-white mb-2 font-semibold"
                    {...microSlide}
                  >
                    {member.name}
                  </motion.h3>

                  <motion.p
                    className="text-[#8B2131] dark:text-[#B91C1C] font-semibold mb-3 sm:mb-4 text-sm sm:text-base"
                    {...microSlide}
                  >
                    {member.position}
                  </motion.p>

                  <motion.p
                    className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 sm:mb-6"
                    {...quickFade}
                  >
                    {member.bio}
                  </motion.p>

                  {/* Experience & Contact */}
                  <motion.div
                    className="space-y-3 sm:space-y-4 mb-4 sm:mb-6"
                    variants={staggerContainer}
                  >
                    <motion.div
                      className="flex items-center gap-2 text-sm"
                      {...microSlide}
                    >
                      <Calendar
                        size={14}
                        className="text-[#8B2131] dark:text-[#B90C0C] flex-shrink-0"
                      />
                      <span className="dark:text-white">
                        {member.experience} Experience
                      </span>
                    </motion.div>
                    
                    <motion.div
                      className="flex items-center gap-2 text-sm"
                      {...microSlide}
                    >
                      <Phone
                        size={14}
                        className="text-[#8B2131] dark:text-[#B90C0C] flex-shrink-0"
                      />
                      <span className="dark:text-white truncate">{member.phone}</span>
                    </motion.div>
                  </motion.div>

                  {/* Specialties */}
                  <motion.div {...microSlide}>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <motion.span
                          key={specialty}
                          className="px-2 py-1 sm:px-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05, duration: 0.2 }}
                        >
                          {specialty}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-12 sm:mt-16" 
          {...slideInFromBottom}
        >
          <motion.div
            className="bg-gradient-to-r from-[#8B2131] to-[#B91C1C] rounded-2xl p-6 sm:p-8 text-white mx-4 sm:mx-0"
            {...cardHover}
          >
            <motion.h3
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4"
              {...fadeInUp}
            >
              Ready to Work with Our Team?
            </motion.h3>

            <motion.p
              className="text-white/90 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base"
              {...fadeInUp}
            >
              Get in touch with our experts today and let us help you find your
              perfect property or achieve your real estate investment goals.
            </motion.p>

            <motion.button
              className="bg-white text-[#8B2131] px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
              {...scaleOnHover}
            >
              Contact Our Team
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetOurTeam;