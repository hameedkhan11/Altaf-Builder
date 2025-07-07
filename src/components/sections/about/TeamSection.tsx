"use client";
import { TeamMemberCard } from "@/components/cards/TeamMemberCard";
import { TeamMember } from "@/lib/about-us/types";
import React from "react";

interface TeamSectionProps {
  team: TeamMember[];
}

export const TeamSection: React.FC<TeamSectionProps> = ({ team }) => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-16">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6">
            Meet Our Leaders
          </h2>
          <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Our experienced leadership team brings decades of combined
            expertise in luxury real estate development, operations, and
            client relations.
          </p>
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-[rgb(140,46,71)] to-[rgb(180,86,111)] mx-auto rounded-full" />
        </div>

        <div className="space-y-12 sm:space-y-16 lg:space-y-20 mx-auto max-w-7xl">
          {team.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              reversed={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};