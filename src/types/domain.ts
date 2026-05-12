// Users/jaydenosafo/Phone_Screening_Platform/src/types/domain.ts

export type ResponseType = 'text' | 'audio';

export interface Question {
  id: string;
  text: string;
  responseType: ResponseType;
  isCustom: boolean;
}

export interface Screening {
  id: string;
  jobId: string;
  createdAt: string;
  questions: Question[];
}

export interface Job {
  id: string;
  title: string;
  location: string;
  employmentType: 'Full-time' | 'Part-time' | 'Internship' | 'NSS';
  description: string;
}
