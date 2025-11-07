// FIX: Centralize the View type to be used across components.
export type View = 'home' | 'jobs' | 'blog' | 'profile' | 'admin' | 'jobDetail' | 'subscribers';

export interface Skill {
  id?: number | string;
  name: string;
}

export interface Certification {
  id?: number | string;
  name: string;
  issuingBody: string;
  date: string;
}

export interface Experience {
  id?: number | string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface Education {
  id?: number | string;
  degree: string;
  school: string;
  duration: string;
}

export interface UserStats {
  profileViews: number;
  jobApplications: number;
  articleEngagement: number;
}

export type Permission = 'manage_users' | 'manage_jobs' | 'manage_articles';

export interface User {
  id: number;
  name: string;
  avatarUrl: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  password?: string;
  role: 'admin' | 'user';
  permissions?: Permission[];
  about: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  stats: UserStats;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'دوام كامل' | 'دوام جزئي' | 'عقد';
  description: string;
  postedDate: string;
  logoUrl: string;
  contactEmail?: string;
}

export interface CommentUser {
  id: number;
  name: string;
  avatarUrl: string;
}

export interface Comment {
  id: number;
  user: CommentUser;
  text: string;
  timestamp: string;
}

export interface Article {
  id: number;
  title: string;
  author: User;
  category: string;
  excerpt: string;
  content: string;
  publishedDate: string;
  imageUrl: string;
  comments: Comment[];
  likes: number;
}