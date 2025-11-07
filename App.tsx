import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import JobsPage from './components/JobsPage';
import BlogPage from './components/BlogPage';
import ProfilePage from './components/ProfilePage';
import AdminPage from './components/AdminPage';
import JobDetailPage from './components/JobDetailPage';
import Notification from './components/Notification';
import CreateArticleModal from './components/CreateArticleModal';
import SubscribersPage from './components/SubscribersPage';
import { User, Job, View, Article } from './types';
import { mockUsers, mockArticles } from './constants';
import { XIcon } from './components/icons';

// FIX: Removed local View type definition.

interface AuthModalProps {
    initialView: 'login' | 'register';
    onClose: () => void;
    onLoginSuccess: (user: User) => void;
    onRegisterSuccess: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ initialView, onClose, onLoginSuccess, onRegisterSuccess }) => {
    const [view, setView] = useState(initialView);

    // Login state
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Register state
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPhone, setRegPhone] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regError, setRegError] = useState('');
    
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        const user = mockUsers.find(u => u.email === loginEmail && u.password === loginPassword);
        if (user) {
            onLoginSuccess(user);
        } else {
            setLoginError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
        }
    };
    
    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setRegError('');
        if (!regName || !regEmail || !regPhone || !regPassword) {
            setRegError('الرجاء تعبئة جميع الحقول.');
            return;
        }
        if (mockUsers.some(u => u.email === regEmail)) {
            setRegError('هذا البريد الإلكتروني مسجل بالفعل.');
            return;
        }

        // Simulate creating a new user
        const newUser: User = {
            id: Date.now(),
            name: regName,
            email: regEmail,
            phone: regPhone,
            password: regPassword,
            role: 'user',
            avatarUrl: `https://picsum.photos/seed/${regName.replace(/\s/g, '')}/200`,
            headline: 'مستخدم جديد',
            location: 'غير محدد',
            about: '',
            experience: [],
            education: [],
            skills: [],
            certifications: [],
            stats: { profileViews: 0, jobApplications: 0, articleEngagement: 0 },
        };
        onRegisterSuccess(newUser);
    };

    const renderLogin = () => (
        <form onSubmit={handleLogin} className="space-y-6">
            <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 text-right">البريد الإلكتروني</label>
                <div className="mt-1">
                    <input id="login-email" name="email" type="email" autoComplete="email" required value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
            </div>
            <div>
                <label htmlFor="login-password"  className="block text-sm font-medium text-gray-700 text-right">كلمة المرور</label>
                <div className="mt-1">
                    <input id="login-password" name="password" type="password" autoComplete="current-password" required value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
            </div>
            {loginError && <p className="text-sm text-red-600 text-center">{loginError}</p>}
            <div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    تسجيل الدخول
                </button>
            </div>
             <p className="mt-4 text-center text-sm text-gray-600">
                ليس لديك حساب؟{' '}
                <button type="button" onClick={() => setView('register')} className="font-medium text-blue-600 hover:text-blue-500">
                    أنشئ حساباً جديداً
                </button>
            </p>
        </form>
    );

    const renderRegister = () => (
         <form onSubmit={handleRegister} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 text-right">الاسم الكامل</label>
                <input type="text" required value={regName} onChange={e => setRegName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 text-right">البريد الإلكتروني</label>
                <input type="email" required value={regEmail} onChange={e => setRegEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 text-right">رقم الجوال</label>
                <input type="tel" required value={regPhone} onChange={e => setRegPhone(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 text-right">كلمة المرور</label>
                <input type="password" required value={regPassword} onChange={e => setRegPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            {regError && <p className="text-sm text-red-600 text-center">{regError}</p>}
            <div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    إنشاء حساب
                </button>
            </div>
            <p className="mt-4 text-center text-sm text-gray-600">
                لديك حساب بالفعل؟{' '}
                <button type="button" onClick={() => setView('login')} className="font-medium text-blue-600 hover:text-blue-500">
                    سجل الدخول
                </button>
            </p>
        </form>
    );

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="relative bg-white rounded-lg shadow-xl p-8 m-4 max-w-md w-full">
                <div className="absolute top-0 left-0 pt-4 ps-4">
                    <button onClick={onClose} type="button" className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <span className="sr-only">Close</span>
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
                <h2 id="modal-title" className="text-2xl font-bold text-center text-gray-900 mb-6">
                    {view === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
                </h2>
                
                {view === 'login' ? renderLogin() : renderRegister()}
            </div>
        </div>
    );
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('home');
  const [previousView, setPreviousView] = useState<View>('home');
  const [selectedProfile, setSelectedProfile] = useState<User | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [showCreateArticleModal, setShowCreateArticleModal] = useState(false);
  
  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
        setNotification(null);
    }, 4000);
  };

  const handleLoginSuccess = (user: User) => {
      setCurrentUser(user);
      setAuthModal(null);
  };

  const handleRegisterSuccess = (newUser: User) => {
      mockUsers.push(newUser); 
      setCurrentUser(newUser);
      setAuthModal(null);
      showNotification('تم التسجيل بنجاح! مرحباً بك في منصة سلامة الغذاء.');
  };

  const handleLogout = () => {
      if (currentUser?.role === 'admin' && activeView === 'admin') {
          setActiveView('home');
      }
      setCurrentUser(null);
       if (activeView === 'jobDetail') {
          setActiveView('home');
          setSelectedJob(null);
      }
  };

  const handleNavigate = (view: View) => {
    if (view === 'admin' && currentUser?.role !== 'admin') {
      alert('الوصول مرفوض. هذه الصفحة مخصصة للمسؤولين فقط.');
      return;
    }
    setActiveView(view);
    setSelectedJob(null);
    window.scrollTo(0, 0);
  };
  
  const handleViewProfile = (user: User) => {
    setSelectedProfile(user);
    setActiveView('profile');
    window.scrollTo(0, 0);
  };

  const handleViewJobDetail = (job: Job) => {
    setPreviousView(activeView);
    setSelectedJob(job);
    setActiveView('jobDetail');
    window.scrollTo(0, 0);
  };

  const handleReturnToList = () => {
    setSelectedJob(null);
    setActiveView(previousView);
  };

  const handleApplyForJob = (job: Job) => {
    if (!currentUser) {
        setAuthModal('login');
        return;
    }
    
    showNotification(`تم إرسال طلبك بنجاح لوظيفة "${job.title}"!`);

    const updatedUser = {
        ...currentUser,
        stats: {
            ...currentUser.stats,
            jobApplications: currentUser.stats.jobApplications + 1,
        }
    };
    setCurrentUser(updatedUser);
    
    const userIndex = mockUsers.findIndex(u => u.id === currentUser.id);
    if (userIndex > -1) {
        mockUsers[userIndex] = updatedUser;
    }
  };
  
  const handleRequestContactInfo = (targetUser: User) => {
    if (!currentUser) {
        setAuthModal('login');
        return;
    }
    showNotification(`تم إرسال طلبك للحصول على معلومات الاتصال الخاصة بـ ${targetUser.name}.`, 'info');
  };

  const handleCreateArticle = (newArticleData: Omit<Article, 'id' | 'author' | 'comments' | 'likes' | 'publishedDate'>) => {
    if (!currentUser) return;

    const newArticle: Article = {
        id: Date.now(),
        ...newArticleData,
        author: currentUser,
        comments: [],
        likes: 0,
        publishedDate: new Intl.DateTimeFormat('ar-SA-u-nu-latn', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date()),
    };

    setArticles([newArticle, ...articles]);
    setShowCreateArticleModal(false);
    showNotification('تم نشر مقالك بنجاح!', 'success');
  };

  const renderContent = () => {
    if (activeView === 'jobDetail' && selectedJob) {
        return <JobDetailPage job={selectedJob} onReturn={handleReturnToList} onApply={handleApplyForJob} />;
    }

    switch (activeView) {
      case 'jobs':
        return <JobsPage onViewJob={handleViewJobDetail} />;
      case 'subscribers':
        return <SubscribersPage users={mockUsers} onViewProfile={handleViewProfile} />;
      case 'blog':
        return (
          <BlogPage 
            articles={articles}
            onViewProfile={handleViewProfile}
            currentUser={currentUser}
            onShowCreateArticle={() => {
              if (!currentUser) {
                setAuthModal('login');
              } else {
                setShowCreateArticleModal(true);
              }
            }}
          />
        );
      case 'profile':
        const profileToShow = selectedProfile || currentUser;
        if (!profileToShow) {
            return <HomePage articles={articles} onViewProfile={handleViewProfile} onViewJob={handleViewJobDetail} onNavigate={handleNavigate} />;
        }
        const isOwnProfile = !!(currentUser && currentUser.id === profileToShow.id);
        return <ProfilePage user={profileToShow} isOwnProfile={isOwnProfile} onRequestContactInfo={handleRequestContactInfo} />;
      case 'admin':
        return currentUser?.role === 'admin' ? <AdminPage currentUser={currentUser} /> : <HomePage articles={articles} onViewProfile={handleViewProfile} onViewJob={handleViewJobDetail} onNavigate={handleNavigate} />;
      case 'home':
      default:
        return <HomePage articles={articles} onViewProfile={handleViewProfile} onViewJob={handleViewJobDetail} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <Navbar 
        activeView={activeView} 
        onNavigate={handleNavigate} 
        onViewProfile={handleViewProfile}
        currentUser={currentUser}
        onLogout={handleLogout}
        onShowLogin={() => setAuthModal('login')}
        onShowRegister={() => setAuthModal('register')}
      />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
      {authModal && (
        <AuthModal
          initialView={authModal}
          onClose={() => setAuthModal(null)}
          onLoginSuccess={handleLoginSuccess}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}
       {notification && (
          <Notification 
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification(null)}
          />
      )}
      {showCreateArticleModal && currentUser && (
        <CreateArticleModal
          onClose={() => setShowCreateArticleModal(false)}
          onCreate={handleCreateArticle}
        />
      )}
    </div>
  );
};

export default App;