// types/index.ts
export interface TeamMember {
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

export interface MissionVision {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface CompanyStats {
  value: string;
  label: string;
  description: string;
}

export interface AboutPageData {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  missionVision: MissionVision[];
  team: TeamMember[];
  stats: CompanyStats[];
  company: {
    foundedYear: string;
    description: string;
    values: string[];
  };
}