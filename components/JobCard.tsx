
import React from 'react';
import { Job } from '../types';
import { LocationIcon } from './icons';

interface JobCardProps {
  job: Job;
  onViewJob: (job: Job) => void;
}

const formatDatePosted = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    // Reset time part to compare dates only
    now.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays === 0) return 'اليوم';
    if (diffDays === 1) return 'منذ يوم واحد';
    if (diffDays === 2) return 'منذ يومين';
    if (diffDays > 2 && diffDays <= 10) return `منذ ${diffDays} أيام`;
    
    // For older dates, show the actual date
    return new Intl.DateTimeFormat('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateString));
};

const JobCard: React.FC<JobCardProps> = ({ job, onViewJob }) => {
  return (
    <div 
      onClick={() => onViewJob(job)}
      className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-300 flex items-start space-x-4 space-x-reverse cursor-pointer"
    >
      <img src={job.logoUrl} alt={`${job.company} logo`} className="w-16 h-16 rounded-md object-cover" />
      <div className="flex-1">
        <h3 className="text-lg font-bold text-blue-800">{job.title}</h3>
        <p className="text-md font-semibold text-gray-700">{job.company}</p>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <LocationIcon className="w-4 h-4 me-1" />
          <span>{job.location}</span>
          <span className="mx-2">|</span>
          <span>{job.type}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{job.description}</p>
        <p className="text-xs text-gray-400 mt-2">{formatDatePosted(job.postedDate)}</p>
      </div>
    </div>
  );
};

export default JobCard;