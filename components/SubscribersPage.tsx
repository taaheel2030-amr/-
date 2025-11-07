import React, { useState, useMemo } from 'react';
import { User } from '../types';
import SubscriberCard from './SubscriberCard';
import SearchBar from './SearchBar';

interface SubscribersPageProps {
  users: User[];
  onViewProfile: (user: User) => void;
}

const SubscribersPage: React.FC<SubscribersPageProps> = ({ users, onViewProfile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const subscribers = useMemo(() => users.filter(u => u.role === 'user'), [users]);
  const locations = useMemo(() => Array.from(new Set(subscribers.map(s => s.location))), [subscribers]);

  const filteredSubscribers = useMemo(() => {
    return subscribers.filter(user => {
      const searchLower = searchQuery.toLowerCase();
      const matchesQuery = user.name.toLowerCase().includes(searchLower) ||
                           user.headline.toLowerCase().includes(searchLower) ||
                           user.skills.some(skill => skill.name.toLowerCase().includes(searchLower));
      
      const matchesLocation = locationFilter ? user.location === locationFilter : true;
      
      return matchesQuery && matchesLocation;
    });
  }, [searchQuery, locationFilter, subscribers]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-900">اكتشف الكفاءات</h1>
          <p className="mt-2 text-gray-600">تصفح ملفات المشتركين، وتواصل مع الخبراء في مجال سلامة الغذاء.</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchBar placeholder="ابحث بالاسم, المسمى الوظيفي, المهارات..." onSearchChange={setSearchQuery} />
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">كل المواقع</option>
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
        </header>

        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubscribers.length > 0 ? (
              filteredSubscribers.map(user => <SubscriberCard key={user.id} user={user} onViewProfile={onViewProfile} />)
            ) : (
              <div className="col-span-full text-center py-10 bg-white rounded-lg shadow-md">
                <p className="text-gray-600">لا يوجد مشتركين يطابقون بحثك. حاول تعديل الفلاتر.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SubscribersPage;