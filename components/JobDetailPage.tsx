
import React from 'react';
import { Job } from '../types';
import { LocationIcon, BriefcaseIcon } from './icons';

interface JobDetailPageProps {
  job: Job;
  onReturn: () => void;
  onApply: (job: Job) => void;
}

const JobDetailPage: React.FC<JobDetailPageProps> = ({ job, onReturn, onApply }) => {

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(dateString));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between flex-wrap">
              <div className="flex items-start space-x-4 space-x-reverse">
                <img src={job.logoUrl} alt={`${job.company} logo`} className="w-20 h-20 rounded-lg object-cover border" />
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900">{job.title}</h1>
                  <p className="text-xl font-semibold text-blue-700 mt-1">{job.company}</p>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 text-right">
                <button 
                  onClick={() => onApply(job)}
                  className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-md text-lg"
                >
                  تقديم الآن
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center flex-wrap gap-x-6 gap-y-2 text-gray-600 border-t border-b py-4">
              <div className="flex items-center">
                <LocationIcon className="w-5 h-5 me-2 text-gray-400" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <BriefcaseIcon className="w-5 h-5 me-2 text-gray-400" />
                <span>{job.type}</span>
              </div>
              <p className="text-sm text-gray-500">تاريخ النشر: {formatDate(job.postedDate)}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">وصف الوظيفة</h2>
              <div className="prose prose-lg text-gray-700 max-w-none whitespace-pre-wrap">
                {job.description}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-6 text-center">
             <button
                onClick={onReturn}
                className="text-blue-600 font-semibold hover:underline"
              >
                &larr; العودة إلى قائمة الوظائف
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;