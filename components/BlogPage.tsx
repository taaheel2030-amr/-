import React, { useState, useMemo } from 'react';
import { User, Article } from '../types';
import ArticleCard from './ArticleCard';
import SearchBar from './SearchBar';
import { PencilIcon } from './icons';

interface BlogPageProps {
  articles: Article[];
  onViewProfile: (user: User) => void;
  currentUser: User | null;
  onShowCreateArticle: () => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ articles, onViewProfile, currentUser, onShowCreateArticle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const categories = useMemo(() => Array.from(new Set(articles.map(a => a.category))), [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesQuery = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter ? article.category === categoryFilter : true;
      return matchesQuery && matchesCategory;
    });
  }, [searchQuery, categoryFilter, articles]);
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">مدونة سلامة الغذاء</h1>
            <p className="mt-2 text-lg text-gray-600">مقالات ورؤى من خبراء الصناعة لمساعدتك على البقاء في الطليعة.</p>
          </div>
          {currentUser && (
            <button
              onClick={onShowCreateArticle}
              className="flex items-center bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <PencilIcon className="w-5 h-5 me-2" />
              <span>إنشاء مقال جديد</span>
            </button>
          )}
        </header>
        
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchBar placeholder="ابحث في المقالات..." onSearchChange={setSearchQuery} />
            <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">جميع الفئات</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
        </div>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.length > 0 ? (
                filteredArticles.map(article => <ArticleCard key={article.id} article={article} onViewProfile={onViewProfile} />)
            ) : (
                <p className="text-center col-span-full py-10 text-gray-600">لا توجد مقالات تطابق بحثك.</p>
            )}
        </main>
      </div>
    </div>
  );
};

export default BlogPage;