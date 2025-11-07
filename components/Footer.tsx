
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold">منصة سلامة الغذاء</h3>
            <p className="mt-2 text-sm text-gray-400">
              المجتمع الأول لمحترفي صحة وسلامة الغذاء في الشرق الأوسط.
            </p>
          </div>
          <div>
            <h3 className="text-md font-semibold">روابط سريعة</h3>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white">عنا</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white">الوظائف</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white">المدونة</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white">تواصل معنا</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold">تابعنا</h3>
            <div className="flex space-x-4 space-x-reverse mt-2">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Add other social icons here */}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          <p>&copy; 2024 منصة سلامة الغذاء. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
