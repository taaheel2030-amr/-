
import React from 'react';

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ title, children, action }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        {action && <div>{action}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ProfileSection;