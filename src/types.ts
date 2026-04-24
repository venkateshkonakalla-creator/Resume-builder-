export interface Education {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
  gpa?: string; // GPA or Percentage
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  name: string;
  description: string;
  link?: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string; // LinkedIn profile
    title: string;
    summary: string;
  };
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  skills: string[];
  languages: string[];
}

export type TemplateId = 'modern' | 'sidebar' | 'creative';
