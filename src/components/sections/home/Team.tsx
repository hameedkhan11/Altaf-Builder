"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Award,
  Users,
  Calendar,
} from "lucide-react";

// Optimized animations from constants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.4,
    ease: [0.25, 0.25, 0, 1],
    willChange: "transform, opacity",
  },
};

const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: {
    duration: 0.4,
    willChange: "transform, opacity",
  },
};

const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: {
    duration: 0.4,
    willChange: "transform, opacity",
  },
};

const scaleOnHover = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: {
    duration: 0.15,
    ease: "easeOut",
  },
};

const cardHover = {
  whileHover: {
    y: -6,
    scale: 1.01,
  },
  transition: {
    duration: 0.2,
    ease: "easeOut",
    willChange: "transform",
  },
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    duration: 0.3,
    staggerChildren: 0.08,
    ease: "easeOut",
  },
};

const slideInFromBottom = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.5,
    ease: "easeOut",
    willChange: "transform, opacity",
  },
};

const rotateOnHover = {
  whileHover: { rotate: 3 },
  transition: {
    duration: 0.2,
    ease: "easeOut",
    willChange: "transform",
  },
};

const microSlide = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.25,
    ease: "easeOut",
    willChange: "transform, opacity",
  },
};

const quickFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

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
    position: "Cheif Executive Officer",
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
    <section className="py-24 px-4">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <motion.div className="text-center mb-16" {...slideInFromBottom}>
          <motion.div
            className="inline-flex items-center gap-2 bg-[#8B2131]/10 px-4 py-2 rounded-full mb-6"
            {...microSlide}
          >
            <Users size={20} className="text-[#8B2131]" />
            <span className="text-[#8B2131] font-medium dark:text-white">
              Our Team
            </span>
          </motion.div>

          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl  mb-6"
            {...fadeInUp}
          >
            MEET OUR
            <span className="bg-gradient-to-r from-[#8B2131] to-[#B91C1C] bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl font-bold">
              {" "}
              CEO
            </span>
          </motion.h2>

          <motion.p
            className="text-xl max-w-3xl mx-auto leading-relaxed dark:text-white"
            {...fadeInUp}
          >
            Our dedicated team of professionals brings decades of combined
            experience to help you achieve your real estate goals with
            confidence and expertise.
          </motion.p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="group dark:bg-gray-900"
              variants={fadeInUp}
              onHoverStart={() => setHoveredMember(member.id)}
              onHoverEnd={() => setHoveredMember(null)}
            >
              <motion.div
                className=" rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                {...cardHover}
              >
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                    {...rotateOnHover}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Social Links Overlay */}
                  <motion.div
                    className="absolute bottom-4 left-4 right-4 flex justify-center gap-3"
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
                      <Linkedin size={18} />
                    </motion.a>
                    <motion.a
                      href={member.twitter}
                      className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-[#8B2131] hover:bg-white transition-colors"
                      {...scaleOnHover}
                    >
                      <Twitter size={18} />
                    </motion.a>
                    <motion.a
                      href={`mailto:${member.email}`}
                      className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-[#8B2131] hover:bg-white transition-colors"
                      {...scaleOnHover}
                    >
                      <Mail size={18} />
                    </motion.a>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <motion.h3
                    className="text-xl dark:text-white mb-2"
                    {...microSlide}
                  >
                    {member.name}
                  </motion.h3>

                  <motion.p
                    className="text-[#8B2131] dark:text-[#B91C1C] font-semibold mb-4"
                    {...microSlide}
                  >
                    {member.position}
                  </motion.p>

                  <motion.p
                    className=" text-sm leading-relaxed mb-6"
                    {...quickFade}
                  >
                    {member.bio}
                  </motion.p>

                  {/* Experience & Specialties */}
                  <motion.div
                    className="space-y-4 mb-6"
                    variants={staggerContainer}
                  >
                    <motion.div
                      className="flex items-center gap-4 text-sm"
                      {...microSlide}
                    >
                      <Calendar
                        size={16}
                        className="text-[#8B2131] dark:text-[#B90C0C]"
                      />
                      <span className="dark:text-white -mr-0.5">
                        {member.experience} Experience
                      </span>
                      <motion.div
                        className="space-y-2 gap-4"
                        variants={staggerContainer}
                      >
                        <motion.div
                          className="flex items-center gap-2 text-sm"
                          {...microSlide}
                        >
                          <Phone
                            size={14}
                            className="text-[#8B2131] dark:text-[#B90C0C]"
                          />
                          <span>{member.phone}</span>
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    <motion.div {...microSlide}>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, idx) => (
                          <motion.span
                            key={specialty}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05, duration: 0.2 }}
                          >
                            {specialty}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Contact Info */}
                  {/* <motion.div 
                    className="space-y-2"
                    variants={staggerContainer}
                  >
                    <motion.div 
                      className="flex items-center gap-2 text-sm text-gray-500"
                      {...microSlide}
                    >
                      <Mail size={14} className="text-[#8B2131] dark:text-[#B90C0C]" />
                      <span className="truncate">{member.email}</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-2 text-sm"
                      {...microSlide}
                    >
                      <Phone size={14} className="text-[#8B2131] dark:text-[#B90C0C]" />
                      <span>{member.phone}</span>
                    </motion.div>
                  </motion.div> */}

                  {/* Achievements */}
                  {/* {member.achievements.length > 0 && (
                    <motion.div 
                      className="mt-4 pt-4 border-t border-gray-100"
                      {...fadeInUp}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Award size={16} className="text-[#8B2131]" />
                        <span className="text-sm font-medium text-gray-700">Recent Achievements</span>
                      </div>
                      <div className="space-y-1">
                        {member.achievements.map((achievement, idx) => (
                          <motion.p
                            key={achievement}
                            className="text-xs text-gray-500"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.3 }}
                          >
                            • {achievement}
                          </motion.p>
                        ))}
                      </div>
                    </motion.div>
                  )} */}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div className="text-center mt-16" {...slideInFromBottom}>
          <motion.div
            className="bg-gradient-to-r from-[#8B2131] to-[#B91C1C] rounded-2xl p-8 text-white"
            {...cardHover}
          >
            <motion.h3
              className="text-2xl md:text-3xl font-bold mb-4"
              {...fadeInUp}
            >
              Ready to Work with Our Team?
            </motion.h3>

            <motion.p
              className="text-white/90 mb-6 max-w-2xl mx-auto"
              {...fadeInUp}
            >
              Get in touch with our experts today and let us help you find your
              perfect property or achieve your real estate investment goals.
            </motion.p>

            <motion.button
              className="bg-white text-[#8B2131] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
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
