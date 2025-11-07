import React, { useState, useEffect } from 'react';
import { mockJobs } from '../constants';
import { User, Job, Article, View } from '../types';
import JobCard from './JobCard';
import ArticleCard from './ArticleCard';
import SearchBar from './SearchBar';

interface HomePageProps {
  articles: Article[];
  onViewProfile: (user: User) => void;
  onViewJob: (job: Job) => void;
  onNavigate: (view: View) => void;
}

const foodSafetyImages = [
  'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1935&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1627822592312-b51f2882eb76?q=80&w=2070&auto=format&fit=crop'
];

const HomePage: React.FC<HomePageProps> = ({ articles, onViewProfile, onViewJob, onNavigate }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % foodSafetyImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-96 transition-all duration-1000 ease-in-out" 
        style={{ backgroundImage: `url('${foodSafetyImages[currentImageIndex]}')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-5xl font-bold">مجتمعك المهني في عالم سلامة الغذاء</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            انضم إلى أكبر شبكة من الخبراء والمتخصصين، واكتشف فرص عمل جديدة، وشارك معرفتك.
          </p>
          <div className="mt-8 w-full max-w-md">
            <SearchBar placeholder="ابحث عن وظائف، مهارات، أو شركات..." onSearchChange={() => {}} />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Latest Jobs Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">أحدث الوظائف</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockJobs.slice(0, 3).map(job => (
              <JobCard key={job.id} job={job} onViewJob={onViewJob} />
            ))}
          </div>
           <div className="text-center mt-8">
            <button 
              onClick={() => onNavigate('jobs')}
              className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              عرض كل الوظائف
            </button>
          </div>
        </section>

        {/* Latest Articles Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">أحدث المقالات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(0, 3).map(article => (
              <ArticleCard key={article.id} article={article} onViewProfile={onViewProfile} />
            ))}
          </div>
          <div className="text-center mt-8">
            <button 
              onClick={() => onNavigate('blog')}
              className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors">
              اكتشف المزيد في المدونة
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;