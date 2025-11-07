import React, { useState } from 'react';
import { mockUsers, mockJobs, mockArticles } from '../constants';
import { User, Job, Article, Permission } from '../types';
import { ChartBarIcon, UsersIcon, BriefcaseIcon, PencilIcon, TrashIcon, CogIcon, CheckIcon, XIcon, DownloadIcon, PlusIcon } from './icons';
import SearchBar from './SearchBar';

type AdminTab = 'dashboard' | 'users' | 'jobs' | 'articles';

type NewUser = Omit<User, 'id' | 'stats' | 'experience' | 'education' | 'skills' | 'certifications' | 'about'>;
type NewJob = Omit<Job, 'id'>;
type NewArticle = Omit<Article, 'id' | 'author' | 'comments' | 'likes'>;

interface AdminPageProps {
  currentUser: User;
}

const PERMISSIONS_MAP: Record<Permission, string> = {
  manage_users: 'إدارة المستخدمين',
  manage_jobs: 'إدارة الوظائف',
  manage_articles: 'إدارة المقالات',
};

const AdminPage: React.FC<AdminPageProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  
  // Data state
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [articles, setArticles] = useState<Article[]>(mockArticles);

  // User management state
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<User> | null>(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState<NewUser>({ name: '', email: '', phone: '', role: 'user', permissions: [], avatarUrl: 'https://picsum.photos/seed/newuser/200', headline: '', location: '' });
  const [newUserErrors, setNewUserErrors] = useState({ name: '', headline: '', location: '', email: '', phone: '' });


  // Job management state
  const [editingJobId, setEditingJobId] = useState<number | null>(null);
  const [editedJob, setEditedJob] = useState<Job | null>(null);
  const [showAddJobForm, setShowAddJobForm] = useState(false);
  const [newJob, setNewJob] = useState<NewJob>({ title: '', company: '', location: '', type: 'دوام كامل', description: '', postedDate: new Date().toISOString().split('T')[0], logoUrl: 'https://picsum.photos/seed/newjob/100' });
  
  // Article management state
  const [editingArticleId, setEditingArticleId] = useState<number | null>(null);
  const [editedArticle, setEditedArticle] = useState<Partial<Article> | null>(null);
  const [showAddArticleForm, setShowAddArticleForm] = useState(false);
  const [newArticle, setNewArticle] = useState<NewArticle>({ title: '', category: '', excerpt: '', content: '', publishedDate: new Date().toISOString().split('T')[0], imageUrl: 'https://picsum.photos/seed/newarticle/400/250' });
  const [newArticleAuthorId, setNewArticleAuthorId] = useState<number>(users[0]?.id || 0);
  const [articleSearchQuery, setArticleSearchQuery] = useState('');

  // Confirmation Modal State
  const [confirmation, setConfirmation] = useState<{
    message: string;
    onConfirm: () => void;
  } | null>(null);
  
  const hasPermission = (permission: Permission) => {
    return currentUser.permissions?.includes(permission) ?? false;
  };

  const requestDeleteConfirmation = (message: string, onConfirm: () => void) => {
    setConfirmation({ message, onConfirm });
  };


  // --- User Handlers ---
  const handleEditUser = (user: User) => {
    setEditingUserId(user.id);
    setEditedUser({ ...user });
  };
  const handleCancelUserEdit = () => {
    setEditingUserId(null);
    setEditedUser(null);
  };
  const handleSaveUser = () => {
    if (!editedUser) return;
    setUsers(users.map(user => user.id === editedUser.id ? { ...user, ...editedUser } : user));
    handleCancelUserEdit();
  };
  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof User) => {
    if (!editedUser) return;
    const value = e.target.value;
    if (field === 'role') {
        const newRole = value as 'admin' | 'user';
        const permissions = newRole === 'user' ? [] : (editedUser.permissions || []);
        setEditedUser({ ...editedUser, role: newRole, permissions });
    } else {
        setEditedUser({ ...editedUser, [field]: value });
    }
  };
  const handlePermissionChange = (permission: Permission, isChecked: boolean) => {
    if (!editedUser) return;
    const currentPermissions = editedUser.permissions || [];
    const newPermissions = isChecked
        ? [...currentPermissions, permission]
        : currentPermissions.filter(p => p !== permission);
    setEditedUser({ ...editedUser, permissions: newPermissions });
  };
  
  const validateNewUser = (): boolean => {
    const errors = { name: '', headline: '', location: '', email: '', phone: '' };
    let isValid = true;
    if (!newUser.name.trim()) {
        errors.name = 'الاسم مطلوب.';
        isValid = false;
    }
    if (!newUser.email.trim()) {
        errors.email = 'البريد الإلكتروني مطلوب.';
        isValid = false;
    }
    if (!newUser.phone.trim()) {
        errors.phone = 'رقم الجوال مطلوب.';
        isValid = false;
    }
    if (!newUser.headline.trim()) {
        errors.headline = 'العنوان الوظيفي مطلوب.';
        isValid = false;
    }
    if (!newUser.location.trim()) {
        errors.location = 'الموقع مطلوب.';
        isValid = false;
    }
    setNewUserErrors(errors);
    return isValid;
  };

  const handleNewUserInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof NewUser) => {
     const value = e.target.value;
    if (field === 'role') {
        const newRole = value as 'admin' | 'user';
        const permissions = newRole === 'user' ? [] : newUser.permissions;
        setNewUser({ ...newUser, role: newRole, permissions });
    } else {
        setNewUser({ ...newUser, [field]: value as any });
    }

    if (newUserErrors[field as keyof typeof newUserErrors]) {
        setNewUserErrors({ ...newUserErrors, [field]: '' });
    }
  };

   const handleNewUserPermissionChange = (permission: Permission, isChecked: boolean) => {
    const currentPermissions = newUser.permissions || [];
    const newPermissions = isChecked
      ? [...currentPermissions, permission]
      : currentPermissions.filter(p => p !== permission);
    setNewUser({ ...newUser, permissions: newPermissions });
  };


  const handleSaveNewUser = () => {
    if (!validateNewUser()) {
        return;
    }
    const newUserWithDetails: User = {
        id: Date.now(),
        ...newUser,
        about: 'مستخدم جديد في المنصة.',
        experience: [], education: [], skills: [], certifications: [],
        stats: { profileViews: 0, jobApplications: 0, articleEngagement: 0 },
    };
    setUsers([newUserWithDetails, ...users]);
    setShowAddUserForm(false);
    setNewUser({ name: '', email: '', phone: '', role: 'user', permissions:[], avatarUrl: 'https://picsum.photos/seed/newuser/200', headline: '', location: '' });
    setNewUserErrors({ name: '', headline: '', location: '', email: '', phone: '' });
  };


  // --- Job Handlers ---
  const handleEditJob = (job: Job) => {
    setEditingJobId(job.id);
    setEditedJob({ ...job });
  };
  const handleCancelEdit = () => {
    setEditingJobId(null);
    setEditedJob(null);
  };
  const handleSaveJob = () => {
    if (!editedJob) return;
    setJobs(jobs.map(job => job.id === editedJob.id ? editedJob : job));
    handleCancelEdit();
  };
  const handleJobInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: keyof Job) => {
    if (!editedJob) return;
    setEditedJob({ ...editedJob, [field]: e.target.value });
  };
  const handleSaveNewJob = () => {
    setJobs([{ id: Date.now(), ...newJob }, ...jobs]);
    setShowAddJobForm(false);
    setNewJob({ title: '', company: '', location: '', type: 'دوام كامل', description: '', postedDate: new Date().toISOString().split('T')[0], logoUrl: 'https://picsum.photos/seed/newjob/100' });
  };


  // --- Article Handlers ---
   const handleEditArticle = (article: Article) => {
    setEditingArticleId(article.id);
    setEditedArticle({ ...article });
  };
  const handleCancelArticleEdit = () => {
    setEditingArticleId(null);
    setEditedArticle(null);
  };
  const handleSaveArticle = () => {
    if (!editedArticle) return;
    setArticles(articles.map(article => article.id === editedArticle.id ? { ...article, ...editedArticle } as Article : article));
    handleCancelArticleEdit();
  };
  const handleArticleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Article) => {
    if (!editedArticle) return;
    setEditedArticle({ ...editedArticle, [field]: e.target.value });
  };
  const handleSaveNewArticle = () => {
    const author = users.find(u => u.id === newArticleAuthorId);
    if (!author) return;
    const newArticleWithId: Article = {
      id: Date.now(),
      ...newArticle,
      author,
      comments: [],
      likes: 0
    };
    setArticles([newArticleWithId, ...articles]);
    setShowAddUserForm(false);
    setNewArticle({ title: '', category: '', excerpt: '', content: '', publishedDate: new Date().toISOString().split('T')[0], imageUrl: 'https://picsum.photos/seed/newarticle/400/250' });
  };


  // --- Other Handlers ---
  const handleExportUsers = () => {
    const headers = ['ID', 'الاسم', 'العنوان الوظيفي', 'الموقع'];
    const escapeCSV = (field: string) => `"${String(field).replace(/"/g, '""')}"`;
    const csvRows = users.map(user => [user.id, escapeCSV(user.name), escapeCSV(user.headline), escapeCSV(user.location)].join(','));
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'users_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const StatCard = ({ title, value, icon }: { title: string, value: number, icon: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 space-x-reverse">
      <div className="bg-blue-100 text-blue-600 p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
  
  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        if (!hasPermission('manage_users')) return <p>ليس لديك صلاحية لعرض هذه الصفحة.</p>;
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">إدارة المستخدمين</h2>
              <div className="flex gap-2">
                <button onClick={() => setShowAddUserForm(!showAddUserForm)} className="flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"><PlusIcon className="w-5 h-5 me-2" /><span>إضافة مستخدم</span></button>
                <button onClick={handleExportUsers} className="flex items-center bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors shadow-sm"><DownloadIcon className="w-5 h-5 me-2" /><span>تصدير CSV</span></button>
              </div>
            </div>
            
            {showAddUserForm && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4 border space-y-3">
                <h3 className="font-bold">إضافة مستخدم جديد</h3>
                {/* ... (input fields for new user) */}
                 <div>
                    <input type="text" placeholder="الاسم" value={newUser.name} onChange={(e) => handleNewUserInputChange(e, 'name')} className={`w-full p-2 border rounded ${newUserErrors.name ? 'border-red-500' : 'border-gray-300'}`} />
                    {newUserErrors.name && <p className="text-red-500 text-xs mt-1">{newUserErrors.name}</p>}
                </div>
                <div>
                    <input type="email" placeholder="البريد الإلكتروني" value={newUser.email} onChange={(e) => handleNewUserInputChange(e, 'email')} className={`w-full p-2 border rounded ${newUserErrors.email ? 'border-red-500' : 'border-gray-300'}`} />
                    {newUserErrors.email && <p className="text-red-500 text-xs mt-1">{newUserErrors.email}</p>}
                </div>
                <div>
                    <input type="tel" placeholder="رقم الجوال" value={newUser.phone} onChange={(e) => handleNewUserInputChange(e, 'phone')} className={`w-full p-2 border rounded ${newUserErrors.phone ? 'border-red-500' : 'border-gray-300'}`} />
                    {newUserErrors.phone && <p className="text-red-500 text-xs mt-1">{newUserErrors.phone}</p>}
                </div>
                <div>
                    <input type="text" placeholder="العنوان الوظيفي" value={newUser.headline} onChange={(e) => handleNewUserInputChange(e, 'headline')} className={`w-full p-2 border rounded ${newUserErrors.headline ? 'border-red-500' : 'border-gray-300'}`} />
                    {newUserErrors.headline && <p className="text-red-500 text-xs mt-1">{newUserErrors.headline}</p>}
                </div>
                <div>
                    <input type="text" placeholder="الموقع" value={newUser.location} onChange={(e) => handleNewUserInputChange(e, 'location')} className={`w-full p-2 border rounded ${newUserErrors.location ? 'border-red-500' : 'border-gray-300'}`} />
                    {newUserErrors.location && <p className="text-red-500 text-xs mt-1">{newUserErrors.location}</p>}
                </div>
                <div>
                    <select value={newUser.role} onChange={(e) => handleNewUserInputChange(e, 'role')} className="w-full p-2 border rounded bg-white border-gray-300">
                        <option value="user">مستخدم</option>
                        <option value="admin">مسؤول</option>
                    </select>
                </div>
                {newUser.role === 'admin' && (
                  <div className="p-3 border rounded-md bg-white">
                      <label className="font-semibold text-sm text-gray-700">صلاحيات المسؤول:</label>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {(Object.keys(PERMISSIONS_MAP) as Permission[]).map(p => (
                              <label key={p} className="flex items-center text-sm">
                                  <input type="checkbox"
                                      checked={newUser.permissions?.includes(p)}
                                      onChange={e => handleNewUserPermissionChange(p, e.target.checked)}
                                      className="me-2 rounded"
                                  />
                                  {PERMISSIONS_MAP[p]}
                              </label>
                          ))}
                      </div>
                  </div>
                )}
                <div className="flex gap-2 justify-end">
                    <button onClick={() => { setShowAddUserForm(false); setNewUserErrors({ name: '', headline: '', location: '', email: '', phone: '' }); }} className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400">إلغاء</button>
                    <button onClick={handleSaveNewUser} className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">حفظ</button>
                </div>
              </div>
            )}
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الاسم</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الدور</th>
                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الصلاحيات</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map(user => (
                    <tr key={user.id}>
                      {editingUserId === user.id ? (
                        <>
                          <td className="px-6 py-4"><input type="text" value={editedUser?.name || ''} onChange={(e) => handleUserInputChange(e, 'name')} className="w-full p-2 border rounded"/></td>
                          <td className="px-6 py-4">
                            <select value={editedUser?.role} onChange={(e) => handleUserInputChange(e, 'role')} className="w-full p-2 border rounded bg-white">
                                <option value="user">مستخدم</option>
                                <option value="admin">مسؤول</option>
                            </select>
                          </td>
                           <td className="px-6 py-4">
                             {editedUser?.role === 'admin' && (
                                <div className="flex flex-col gap-1">
                                    {(Object.keys(PERMISSIONS_MAP) as Permission[]).map(p => (
                                      <label key={p} className="flex items-center text-xs">
                                        <input type="checkbox"
                                          checked={editedUser.permissions?.includes(p)}
                                          onChange={(e) => handlePermissionChange(p, e.target.checked)}
                                          disabled={currentUser.id === editedUser.id}
                                          className="me-1 rounded disabled:opacity-50"
                                        />
                                        {PERMISSIONS_MAP[p]}
                                      </label>
                                    ))}
                                </div>
                             )}
                          </td>
                          <td className="px-6 py-4 flex gap-2">
                            <button onClick={handleSaveUser} className="text-green-600 hover:text-green-900"><CheckIcon className="w-5 h-5"/></button>
                            <button onClick={handleCancelUserEdit} className="text-gray-600 hover:text-gray-900"><XIcon className="w-5 h-5"/></button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap flex items-center"><img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full me-3"/>{user.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                              {user.role === 'admin' ? 'مسؤول' : 'مستخدم'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                             {user.permissions?.map(p => PERMISSIONS_MAP[p]).join(', ') || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => handleEditUser(user)} className="text-indigo-600 hover:text-indigo-900 me-4"><PencilIcon className="w-5 h-5"/></button>
                            <button onClick={() => requestDeleteConfirmation(
                                'هل أنت متأكد من أنك تريد حذف هذا المستخدم؟',
                                () => setUsers(prev => prev.filter(u => u.id !== user.id))
                            )} className="text-red-600 hover:text-red-900" disabled={currentUser.id === user.id}><TrashIcon className="w-5 h-5"/></button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'jobs':
         if (!hasPermission('manage_jobs')) return <p>ليس لديك صلاحية لعرض هذه الصفحة.</p>;
         return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">إدارة الوظائف</h2>
              <button onClick={() => setShowAddJobForm(!showAddJobForm)} className="flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"><PlusIcon className="w-5 h-5 me-2" /><span>إضافة وظيفة</span></button>
            </div>

            {showAddJobForm && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4 border space-y-3">
                <h3 className="font-bold">إضافة وظيفة جديدة</h3>
                <input type="text" placeholder="المسمى الوظيفي" value={newJob.title} onChange={(e) => setNewJob({...newJob, title: e.target.value})} className="w-full p-2 border rounded" />
                <input type="text" placeholder="الشركة" value={newJob.company} onChange={(e) => setNewJob({...newJob, company: e.target.value})} className="w-full p-2 border rounded" />
                <textarea placeholder="الوصف" value={newJob.description} onChange={(e) => setNewJob({...newJob, description: e.target.value})} className="w-full p-2 border rounded" />
                <div className="flex gap-2 justify-end">
                    <button onClick={() => setShowAddJobForm(false)} className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400">إلغاء</button>
                    <button onClick={handleSaveNewJob} className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">حفظ</button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                 <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المسمى الوظيفي</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الشركة</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ النشر</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobs.map(job => (
                    <tr key={job.id}>
                       {editingJobId === job.id && editedJob ? (
                        <>
                          <td className="px-6 py-4"><input type="text" value={editedJob.title} onChange={(e) => handleJobInputChange(e, 'title')} className="w-full p-2 border rounded"/></td>
                          <td className="px-6 py-4"><input type="text" value={editedJob.company} onChange={(e) => handleJobInputChange(e, 'company')} className="w-full p-2 border rounded"/></td>
                          <td className="px-6 py-4"><input type="date" value={editedJob.postedDate} onChange={(e) => handleJobInputChange(e, 'postedDate')} className="w-full p-2 border rounded"/></td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onClick={handleSaveJob} className="text-green-600 hover:text-green-900 me-4"><CheckIcon className="w-5 h-5"/></button>
                            <button onClick={handleCancelEdit} className="text-gray-600 hover:text-gray-900"><XIcon className="w-5 h-5"/></button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap">{job.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{job.company}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{job.postedDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => handleEditJob(job)} className="text-indigo-600 hover:text-indigo-900 me-4"><PencilIcon className="w-5 h-5"/></button>
                            <button onClick={() => requestDeleteConfirmation(
                                'هل أنت متأكد من أنك تريد حذف هذه الوظيفة؟',
                                () => setJobs(prev => prev.filter(j => j.id !== job.id))
                            )} className="text-red-600 hover:text-red-900"><TrashIcon className="w-5 h-5"/></button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'articles':
        if (!hasPermission('manage_articles')) return <p>ليس لديك صلاحية لعرض هذه الصفحة.</p>;
        const filteredArticles = articles.filter(article =>
            article.title.toLowerCase().includes(articleSearchQuery.toLowerCase()) ||
            article.author.name.toLowerCase().includes(articleSearchQuery.toLowerCase())
        );

         return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">إدارة المقالات</h2>
              <button onClick={() => setShowAddArticleForm(!showAddArticleForm)} className="flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"><PlusIcon className="w-5 h-5 me-2" /><span>إضافة مقال</span></button>
            </div>
            
             {showAddArticleForm && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4 border space-y-3">
                <h3 className="font-bold">إضافة مقال جديد</h3>
                <input type="text" placeholder="عنوان المقال" value={newArticle.title} onChange={(e) => setNewArticle({...newArticle, title: e.target.value})} className="w-full p-2 border rounded" />
                <select value={newArticleAuthorId} onChange={(e) => setNewArticleAuthorId(Number(e.target.value))} className="w-full p-2 border rounded bg-white"><option value="">اختر الكاتب</option>{users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}</select>
                <textarea placeholder="مقتطف" value={newArticle.excerpt} onChange={(e) => setNewArticle({...newArticle, excerpt: e.target.value})} className="w-full p-2 border rounded" />
                <div className="flex gap-2 justify-end">
                    <button onClick={() => setShowAddArticleForm(false)} className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400">إلغاء</button>
                    <button onClick={handleSaveNewArticle} className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">حفظ</button>
                </div>
              </div>
            )}
            
            <div className="mb-4"><SearchBar placeholder="ابحث بالعنوان أو اسم الكاتب..." onSearchChange={setArticleSearchQuery}/></div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العنوان</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الكاتب</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الفئة</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredArticles.map(article => (
                    <React.Fragment key={article.id}>
                       {editingArticleId === article.id ? (
                        <tr>
                            <td colSpan={4} className="p-4 bg-gray-50 transition-all duration-300">
                                <h4 className="font-bold mb-2">تعديل المقال: <span className="font-normal">{article.title}</span></h4>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">العنوان</label>
                                        <input type="text" value={editedArticle?.title || ''} onChange={(e) => handleArticleInputChange(e, 'title')} className="w-full p-2 border rounded mt-1"/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">الفئة</label>
                                        <input type="text" value={editedArticle?.category || ''} onChange={(e) => handleArticleInputChange(e, 'category')} className="w-full p-2 border rounded mt-1"/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">رابط الصورة</label>
                                        <input type="text" value={editedArticle?.imageUrl || ''} onChange={(e) => handleArticleInputChange(e, 'imageUrl')} className="w-full p-2 border rounded mt-1"/>
                                    </div>
                                    <div className="flex justify-end items-center gap-2 pt-2">
                                        <button onClick={handleCancelArticleEdit} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center"><XIcon className="w-5 h-5 me-2"/>إلغاء</button>
                                        <button onClick={handleSaveArticle} className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center"><CheckIcon className="w-5 h-5 me-2"/>حفظ التعديلات</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                      ) : (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap max-w-sm">
                            <div className="flex items-center">
                                <img src={article.imageUrl} alt="" className="w-10 h-10 rounded-md me-3 object-cover flex-shrink-0" />
                                <div className="truncate font-medium text-gray-900" title={article.title}>{article.title}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{article.author.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{article.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-4">
                                <button onClick={() => handleEditArticle(article)} className="text-indigo-600 hover:text-indigo-900"><PencilIcon className="w-5 h-5"/></button>
                                <button onClick={() => requestDeleteConfirmation(
                                    'هل أنت متأكد من أنك تريد حذف هذا المقال؟',
                                    () => setArticles(prev => prev.filter(a => a.id !== article.id))
                                )} className="text-red-600 hover:text-red-900"><TrashIcon className="w-5 h-5"/></button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'dashboard':
      default:
        return (
           <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">لوحة المعلومات الرئيسية</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="إجمالي المستخدمين" value={users.length} icon={<UsersIcon className="w-8 h-8"/>} />
                <StatCard title="إجمالي الوظائف" value={jobs.length} icon={<BriefcaseIcon className="w-8 h-8"/>} />
                <StatCard title="إجمالي المقالات" value={articles.length} icon={<PencilIcon className="w-8 h-8"/>} />
            </div>
           </div>
        );
    }
  };
  
  const SideNavLink = ({ tab, label, icon }: { tab: AdminTab, label: string, icon: React.ReactNode }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center w-full px-4 py-3 text-right rounded-lg transition-colors ${
        activeTab === tab 
        ? 'bg-blue-600 text-white' 
        : 'text-gray-700 hover:bg-gray-200'
      }`}
    >
      {icon}
      <span className="ms-3">{label}</span>
    </button>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
            <CogIcon className="w-10 h-10 me-3 text-blue-600"/>
            لوحة تحكم المسؤول
          </h1>
          <p className="mt-2 text-lg text-gray-600">إدارة محتوى وبيانات المنصة من مكان واحد.</p>
        </header>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4 lg:w-1/5 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
              <SideNavLink tab="dashboard" label="الرئيسية" icon={<ChartBarIcon className="w-6 h-6"/>} />
              {hasPermission('manage_users') && <SideNavLink tab="users" label="إدارة المستخدمين" icon={<UsersIcon className="w-6 h-6"/>} />}
              {hasPermission('manage_jobs') && <SideNavLink tab="jobs" label="إدارة الوظائف" icon={<BriefcaseIcon className="w-6 h-6"/>} />}
              {hasPermission('manage_articles') && <SideNavLink tab="articles" label="إدارة المقالات" icon={<PencilIcon className="w-6 h-6"/>} />}
            </div>
          </aside>
          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>
      {confirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50" aria-modal="true" role="dialog">
            <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full text-right transform transition-all" >
                <h3 className="text-lg font-bold text-gray-900">تأكيد الحذف</h3>
                <p className="mt-2 text-sm text-gray-600">{confirmation.message}</p>
                <div className="mt-6 flex justify-start space-x-2 space-x-reverse">
                    <button
                        onClick={() => {
                            confirmation.onConfirm();
                            setConfirmation(null);
                        }}
                        className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        نعم, قم بالحذف
                    </button>
                    <button
                        onClick={() => setConfirmation(null)}
                        className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                    >
                        إلغاء
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;