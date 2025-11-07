
import React, { useState, Fragment } from 'react';
import { User, Experience, Education, Skill, Certification } from '../types';
import { BriefcaseIcon, LocationIcon, AcademicCapIcon, CertificateIcon, SparklesIcon, EyeIcon, PaperAirplaneIcon, HeartIcon, ShieldCheckIcon, ClipboardListIcon, LightBulbIcon, DocumentTextIcon, ScaleIcon, MailIcon, PhoneIcon, PlusIcon, PencilIcon, TrashIcon, CheckIcon, XIcon } from './icons';
import ProfileSection from './ProfileSection';
import { enhanceProfileSummary } from '../services/geminiService';


interface ProfilePageProps {
  user: User;
  isOwnProfile: boolean;
  onRequestContactInfo: (user: User) => void;
}

const StatCard = ({ title, value, icon }: { title: string, value: number, icon: React.ReactNode }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center space-x-3 space-x-reverse shadow-sm">
      <div className="bg-gray-100 text-blue-600 p-3 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm font-medium text-gray-500">{title}</p>
      </div>
    </div>
  );


const ProfilePage: React.FC<ProfilePageProps> = ({ user, isOwnProfile, onRequestContactInfo }) => {
    const [summary, setSummary] = useState(user.about);
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [profileData, setProfileData] = useState<User>(user);
    
    // Editing State
    const [editState, setEditState] = useState<{ [key: string]: (string | number | null) }>({
        experience: null,
        education: null,
        skill: null,
        certification: null,
    });
    
    const [formState, setFormState] = useState<any>({});

    // Confirmation Modal State
    const [confirmation, setConfirmation] = useState<{ message: string; onConfirm: () => void; } | null>(null);
    const requestDeleteConfirmation = (message: string, onConfirm: () => void) => {
        setConfirmation({ message, onConfirm });
    };

    const handleEnhanceSummary = async () => {
        setIsEnhancing(true);
        setError(null);
        try {
            const enhancedText = await enhanceProfileSummary(summary);
            setSummary(enhancedText);
        } catch (e) {
            setError("فشل تحسين الملخص. الرجاء المحاولة مرة أخرى.");
        } finally {
            setIsEnhancing(false);
        }
    };

    const handleEdit = (section: string, item: any) => {
        setEditState({ ...editState, [section]: item.id });
        setFormState(item);
    };

    const handleCancel = (section: string) => {
        setEditState({ ...editState, [section]: null });
        setFormState({});
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };
    
    const handleSave = (section: keyof User) => {
        const sectionData = profileData[section] as any[];
        const updatedData = sectionData.map(item => item.id === formState.id ? formState : item);
        setProfileData({ ...profileData, [section]: updatedData });
        handleCancel(section as string);
    };

    const handleAdd = (section: keyof User) => {
        const sectionData = profileData[section] as any[];
        const newItem = { ...formState, id: Date.now() };
        setProfileData({ ...profileData, [section]: [newItem, ...sectionData] });
        handleCancel(section as string);
    };

    const handleDelete = (section: keyof User, id: number | string) => {
        requestDeleteConfirmation('هل أنت متأكد من حذف هذا العنصر؟', () => {
            const sectionData = profileData[section] as any[];
            const updatedData = sectionData.filter(item => item.id !== id);
            setProfileData({ ...profileData, [section]: updatedData });
        });
    };

    const getSkillInfo = (skillName: string): { icon: React.ReactNode; className: string } => {
        const lowerCaseSkill = skillName.toLowerCase();
        if (lowerCaseSkill.includes('haccp') || lowerCaseSkill.includes('iso') || lowerCaseSkill.includes('brc')) {
          return { 
              icon: <ShieldCheckIcon className="w-5 h-5 me-2" />,
              className: 'bg-green-100 text-green-800'
          };
        }
        if (lowerCaseSkill.includes('audit') || lowerCaseSkill.includes('تدقيق')) {
          return {
              icon: <ClipboardListIcon className="w-5 h-5 me-2" />,
              className: 'bg-blue-100 text-blue-800'
          };
        }
        if (lowerCaseSkill.includes('تشريعات') || lowerCaseSkill.includes('codex') || lowerCaseSkill.includes('علامات')) {
           return {
               icon: <DocumentTextIcon className="w-5 h-5 me-2" />,
               className: 'bg-indigo-100 text-indigo-800'
           }
        }
         if (lowerCaseSkill.includes('تقييم') || lowerCaseSkill.includes('risk')) {
           return {
               icon: <ScaleIcon className="w-5 h-5 me-2" />,
               className: 'bg-red-100 text-red-800'
           }
        }
        return {
            icon: <LightBulbIcon className="w-5 h-5 me-2" />,
            className: 'bg-yellow-100 text-yellow-800'
        };
      };

    const renderActionButtons = (section: string, item: any) => (
        <div className="flex-shrink-0 flex items-center space-x-2 space-x-reverse">
            <button onClick={() => handleEdit(section, item)} className="text-blue-600 hover:text-blue-800"><PencilIcon className="w-5 h-5"/></button>
            <button onClick={() => handleDelete(section as keyof User, item.id)} className="text-red-600 hover:text-red-800"><TrashIcon className="w-5 h-5"/></button>
        </div>
    );
    
    const renderAddButton = (section: string, emptyState: any) => (
        <button onClick={() => handleEdit(section, {id: 'new', ...emptyState})} className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800">
            <PlusIcon className="w-5 h-5 me-1"/> إضافة جديد
        </button>
    );

    const renderFormButtons = (onSave: () => void, onCancel: () => void) => (
        <div className="flex gap-2 justify-end mt-4">
            <button onClick={onCancel} className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400 text-sm font-semibold">إلغاء</button>
            <button onClick={onSave} className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 text-sm font-semibold">حفظ</button>
        </div>
    );


  return (
    <div className="bg-gray-100">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="h-48 bg-blue-600"></div>
          <div className="p-6 relative">
            <img 
              src={profileData.avatarUrl} 
              alt={profileData.name} 
              className="h-32 w-32 rounded-full border-4 border-white absolute -top-16"
            />
            <div className="pt-20">
              <h2 className="text-3xl font-bold text-gray-900">{profileData.name}</h2>
              <p className="text-md text-gray-600 mt-1">{profileData.headline}</p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 mt-2">
                <div className="flex items-center">
                    <LocationIcon className="w-4 h-4 me-2 flex-shrink-0" />
                    <span>{profileData.location}</span>
                </div>
                {isOwnProfile ? (
                  <>
                    <div className="flex items-center">
                        <MailIcon className="w-4 h-4 me-2 flex-shrink-0" />
                        <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center">
                        <PhoneIcon className="w-4 h-4 me-2 flex-shrink-0" />
                        <span>{profileData.phone}</span>
                    </div>
                  </>
                ) : (
                   <div className="flex items-center">
                      <button 
                        onClick={() => onRequestContactInfo(user)} 
                        className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full hover:bg-green-200 transition-colors"
                      >
                          طلب معلومات الاتصال
                      </button>
                   </div>
                )}
              </div>

              <div className="mt-4 flex space-x-2 space-x-reverse">
                <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  اتصال
                </button>
                <button className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                  إرسال رسالة
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Body */}
        <div>
           <ProfileSection title="إحصائياتي">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard title="مشاهدة للملف الشخصي" value={profileData.stats.profileViews} icon={<EyeIcon className="w-6 h-6"/>} />
                    <StatCard title="طلب توظيف مقدم" value={profileData.stats.jobApplications} icon={<PaperAirplaneIcon className="w-6 h-6"/>} />
                    <StatCard title="تفاعل على المقالات" value={profileData.stats.articleEngagement} icon={<HeartIcon className="w-6 h-6"/>} />
                </div>
           </ProfileSection>

          <ProfileSection title="نبذة عني">
            <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
            <div className="mt-4">
                <button 
                    onClick={handleEnhanceSummary}
                    disabled={isEnhancing}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isEnhancing ? 'جاري التحسين...' : <><SparklesIcon className="w-5 h-5 me-2" />تحسين بالذكاء الاصطناعي</>}
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          </ProfileSection>

          {/* Experience Section */}
          <ProfileSection title="الخبرة العملية" action={isOwnProfile && editState.experience === null && renderAddButton('experience', {title: '', company: '', duration: '', description: ''})}>
            {editState.experience === 'new' && (
                <div className="bg-gray-50 p-4 rounded-lg border space-y-3 mb-4">
                    <input name="title" onChange={handleFormChange} placeholder="المسمى الوظيفي" className="w-full p-2 border rounded"/>
                    <input name="company" onChange={handleFormChange} placeholder="الشركة" className="w-full p-2 border rounded"/>
                    <input name="duration" onChange={handleFormChange} placeholder="المدة (مثال: 2020 - الآن)" className="w-full p-2 border rounded"/>
                    <textarea name="description" onChange={handleFormChange} placeholder="الوصف" className="w-full p-2 border rounded"/>
                    {renderFormButtons(() => handleAdd('experience'), () => handleCancel('experience'))}
                </div>
            )}
            {profileData.experience.map((exp) => (
              <Fragment key={exp.id}>
                {editState.experience === exp.id ? (
                    <div className="bg-gray-50 p-4 rounded-lg border space-y-3 mb-4">
                         <input name="title" value={formState.title} onChange={handleFormChange} placeholder="المسمى الوظيفي" className="w-full p-2 border rounded"/>
                         <input name="company" value={formState.company} onChange={handleFormChange} placeholder="الشركة" className="w-full p-2 border rounded"/>
                         <input name="duration" value={formState.duration} onChange={handleFormChange} placeholder="المدة" className="w-full p-2 border rounded"/>
                         <textarea name="description" value={formState.description} onChange={handleFormChange} placeholder="الوصف" className="w-full p-2 border rounded"/>
                        {renderFormButtons(() => handleSave('experience'), () => handleCancel('experience'))}
                    </div>
                ) : (
                    <div className="flex space-x-4 space-x-reverse mb-6 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0">
                        <BriefcaseIcon className="w-10 h-10 text-blue-500 mt-1 flex-shrink-0" />
                        <div className="flex-grow">
                            <h4 className="text-lg font-semibold">{exp.title}</h4>
                            <p className="text-md">{exp.company}</p>
                            <p className="text-sm text-gray-500">{exp.duration}</p>
                            <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
                        </div>
                        {isOwnProfile && renderActionButtons('experience', exp)}
                    </div>
                )}
              </Fragment>
            ))}
          </ProfileSection>
          
          {/* Education Section */}
          <ProfileSection title="التعليم" action={isOwnProfile && editState.education === null && renderAddButton('education', {degree: '', school: '', duration: ''})}>
             {editState.education === 'new' && (
                <div className="bg-gray-50 p-4 rounded-lg border space-y-3 mb-4">
                    <input name="degree" onChange={handleFormChange} placeholder="الشهادة" className="w-full p-2 border rounded"/>
                    <input name="school" onChange={handleFormChange} placeholder="المؤسسة التعليمية" className="w-full p-2 border rounded"/>
                    <input name="duration" onChange={handleFormChange} placeholder="المدة" className="w-full p-2 border rounded"/>
                    {renderFormButtons(() => handleAdd('education'), () => handleCancel('education'))}
                </div>
            )}
            {profileData.education.map((edu) => (
                 <Fragment key={edu.id}>
                    {editState.education === edu.id ? (
                         <div className="bg-gray-50 p-4 rounded-lg border space-y-3 mb-4">
                            <input name="degree" value={formState.degree} onChange={handleFormChange} placeholder="الشهادة" className="w-full p-2 border rounded"/>
                            <input name="school" value={formState.school} onChange={handleFormChange} placeholder="المؤسسة التعليمية" className="w-full p-2 border rounded"/>
                            <input name="duration" value={formState.duration} onChange={handleFormChange} placeholder="المدة" className="w-full p-2 border rounded"/>
                            {renderFormButtons(() => handleSave('education'), () => handleCancel('education'))}
                        </div>
                    ) : (
                        <div className="flex space-x-4 space-x-reverse mb-4 pb-4 border-b last:border-b-0 last:pb-0">
                            <AcademicCapIcon className="w-10 h-10 text-green-500 mt-1 flex-shrink-0"/>
                            <div className="flex-grow">
                                <h4 className="text-lg font-semibold">{edu.degree}</h4>
                                <p className="text-md">{edu.school}</p>
                                <p className="text-sm text-gray-500">{edu.duration}</p>
                            </div>
                            {isOwnProfile && renderActionButtons('education', edu)}
                        </div>
                    )}
                 </Fragment>
            ))}
          </ProfileSection>

          {/* Skills Section */}
          <ProfileSection title="المهارات" action={isOwnProfile && editState.skill === null && renderAddButton('skill', {name: ''})}>
            {editState.skill === 'new' && (
                <div className="bg-gray-50 p-4 rounded-lg border flex items-center gap-4 mb-4">
                    <input name="name" onChange={handleFormChange} placeholder="اسم المهارة" className="flex-grow p-2 border rounded"/>
                    {renderFormButtons(() => handleAdd('skills'), () => handleCancel('skill'))}
                </div>
            )}
             <div className="flex flex-wrap gap-3">
                {profileData.skills.map((skill) => {
                    const { icon, className } = getSkillInfo(skill.name);
                    return (
                        <Fragment key={skill.id}>
                            {editState.skill === skill.id ? (
                                 <div className="bg-gray-50 p-2 rounded-full border flex items-center gap-2">
                                    <input name="name" value={formState.name} onChange={handleFormChange} className="p-1 border rounded-full text-sm" />
                                    <button onClick={() => handleSave('skills')} className="text-green-600"><CheckIcon className="w-5 h-5"/></button>
                                    <button onClick={() => handleCancel('skill')} className="text-gray-600"><XIcon className="w-5 h-5"/></button>
                                </div>
                            ) : (
                                <div className={`flex items-center text-sm font-medium px-3 py-1.5 rounded-full transition-colors group relative ${className}`}>
                                    {icon}
                                    <span>{skill.name}</span>
                                    {isOwnProfile && <div className="absolute -top-2 -left-2 flex opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEdit('skill', skill)} className="p-1 bg-white rounded-full shadow text-blue-600 hover:bg-blue-100"><PencilIcon className="w-3 h-3"/></button>
                                        <button onClick={() => handleDelete('skills', skill.id!)} className="p-1 bg-white rounded-full shadow text-red-600 hover:bg-red-100 ms-1"><TrashIcon className="w-3 h-3"/></button>
                                    </div>}
                                </div>
                            )}
                        </Fragment>
                    );
                })}
             </div>
          </ProfileSection>
          
          {/* Certifications Section */}
          <ProfileSection title="الشهادات" action={isOwnProfile && editState.certification === null && renderAddButton('certification', {name: '', issuingBody: '', date: ''})}>
            {editState.certification === 'new' && (
                <div className="bg-gray-50 p-4 rounded-lg border space-y-3 mb-4">
                    <input name="name" onChange={handleFormChange} placeholder="اسم الشهادة" className="w-full p-2 border rounded"/>
                    <input name="issuingBody" onChange={handleFormChange} placeholder="الجهة المانحة" className="w-full p-2 border rounded"/>
                    <input name="date" onChange={handleFormChange} placeholder="تاريخ الإصدار" className="w-full p-2 border rounded" type="text"/>
                    {renderFormButtons(() => handleAdd('certifications'), () => handleCancel('certification'))}
                </div>
            )}
            {profileData.certifications.map((cert) => (
                <Fragment key={cert.id}>
                    {editState.certification === cert.id ? (
                        <div className="bg-gray-50 p-4 rounded-lg border space-y-3 mb-4">
                           <input name="name" value={formState.name} onChange={handleFormChange} placeholder="اسم الشهادة" className="w-full p-2 border rounded"/>
                           <input name="issuingBody" value={formState.issuingBody} onChange={handleFormChange} placeholder="الجهة المانحة" className="w-full p-2 border rounded"/>
                           <input name="date" value={formState.date} onChange={handleFormChange} placeholder="تاريخ الإصدار" className="w-full p-2 border rounded" type="text"/>
                           {renderFormButtons(() => handleSave('certifications'), () => handleCancel('certification'))}
                       </div>
                    ) : (
                        <div className="flex space-x-4 space-x-reverse mb-4 pb-4 border-b last:border-b-0 last:pb-0">
                            <CertificateIcon className="w-10 h-10 text-yellow-500 mt-1 flex-shrink-0"/>
                            <div className="flex-grow">
                                <h4 className="text-lg font-semibold">{cert.name}</h4>
                                <p className="text-md">{cert.issuingBody}</p>
                                <p className="text-sm text-gray-500">تاريخ الإصدار: {cert.date}</p>
                            </div>
                            {isOwnProfile && renderActionButtons('certification', cert)}
                        </div>
                    )}
                </Fragment>
            ))}
          </ProfileSection>
        </div>
      </main>

      {confirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full text-right">
                <h3 className="text-lg font-bold text-gray-900">تأكيد الحذف</h3>
                <p className="mt-2 text-sm text-gray-600">{confirmation.message}</p>
                <div className="mt-6 flex justify-start space-x-2 space-x-reverse">
                    <button onClick={() => { confirmation.onConfirm(); setConfirmation(null); }} className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700">نعم, قم بالحذف</button>
                    <button onClick={() => setConfirmation(null)} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300">إلغاء</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;