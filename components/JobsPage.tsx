
import React, { useState, useMemo } from 'react';
import { mockJobs } from '../constants';
import { Job } from '../types';
import JobCard from './JobCard';
import SearchBar from './SearchBar';

interface JobsPageProps {
  onViewJob: (job: Job) => void;
}

const JobsPage: React.FC<JobsPageProps> = ({ onViewJob }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const locations = useMemo(() => Array.from(new Set(mockJobs.map(j => j.location))), []);
  const types = useMemo(() => Array.from(new Set(mockJobs.map(j => j.type))), []);

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const matchesQuery = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = locationFilter ? job.location === locationFilter : true;
      const matchesType = typeFilter ? job.type === typeFilter : true;
      return matchesQuery && matchesLocation && matchesType;
    });
  }, [searchQuery, locationFilter, typeFilter]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-900">ابحث عن فرصتك التالية</h1>
          <p className="mt-2 text-gray-600">تصفح مئات الوظائف في مجال سلامة وصحة الغذاء.</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <SearchBar placeholder="المسمى الوظيفي, شركة..." onSearchChange={setSearchQuery} />
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">كل المواقع</option>
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">كل أنواع الوظائف</option>
              {types.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
        </header>

        <main>
          <div className="space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => <JobCard key={job.id} job={job} onViewJob={onViewJob} />)
            ) : (
              <div className="text-center py-10 bg-white rounded-lg shadow-md">
                <p className="text-gray-600">لا توجد وظائف تطابق بحثك. حاول تعديل الفلاتر.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobsPage;