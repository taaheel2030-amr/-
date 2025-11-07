import React, { useState } from 'react';
import { mockUsers } from '../constants';
// FIX: Import the centralized View type to resolve type conflict.
import { User, View } from '../types';

// FIX: Removed local View type definition.

interface NavbarProps {
  activeView: View;
  onNavigate: (view: View) => void;
  onViewProfile: (user: User) => void;
  currentUser: User | null;
  onLogout: () => void;
  onShowLogin: () => void;
  onShowRegister: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, onNavigate, onViewProfile, currentUser, onLogout, onShowLogin, onShowRegister }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const NavLink = ({ view, text }: { view: View; text: string }) => (
    <button
      onClick={() => onNavigate(view)}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        activeView === view
          ? 'text-white bg-blue-700'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {text}
    </button>
  );

  return (
    <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
               <h1 onClick={() => onNavigate('home')} className="text-white font-bold text-xl cursor-pointer">سلامة الغذاء</h1>
            </div>
            <div className="hidden md:block">
              <div className="ms-10 flex items-baseline space-x-4 space-x-reverse">
                <NavLink view="home" text="الرئيسية" />
                <NavLink view="jobs" text="الوظائف" />
                <NavLink view="subscribers" text="المشتركين" />
                <NavLink view="blog" text="المدونة" />
                {currentUser?.role === 'admin' && <NavLink view="admin" text="لوحة التحكم" />}
              </div>
            </div>
          </div>
          <div className="flex-1 mx-4 md:mx-8">
             <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" className="block w-full p-2 ps-10 text-sm text-white border border-gray-600 rounded-lg bg-gray-700 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" placeholder="بحث..."/>
             </div>
          </div>
          <div className="hidden md:block">
            <div className="ms-4 flex items-center md:ms-6">
                {currentUser ? (
                    <div className="ms-3 relative">
                        <div>
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">Open user menu</span>
                                <img className="h-8 w-8 rounded-full" src={currentUser.avatarUrl} alt={currentUser.name} />
                            </button>
                        </div>
                        {isMenuOpen && (
                            <div className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                                <a onClick={() => { onViewProfile(currentUser); setIsMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer text-right">ملفي الشخصي</a>
                                {currentUser.role === 'admin' && (
                                    <a onClick={() => { onNavigate('admin'); setIsMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer text-right">لوحة التحكم</a>
                                )}
                                <a onClick={() => { onLogout(); setIsMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer text-right">تسجيل الخروج</a>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center space-x-2 space-x-reverse">
                         <button onClick={onShowLogin} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            تسجيل الدخول
                         </button>
                         <button onClick={onShowRegister} className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                            تسجيل جديد
                         </button>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;