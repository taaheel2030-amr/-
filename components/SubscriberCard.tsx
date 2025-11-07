import React from 'react';
import { User } from '../types';
import { LocationIcon } from './icons';

interface SubscriberCardProps {
  user: User;
  onViewProfile: (user: User) => void;
}

const SubscriberCard: React.FC<SubscriberCardProps> = ({ user, onViewProfile }) => {

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between text-right">
        <div>
          <h2 
            className="text-2xl font-bold cursor-pointer hover:text-blue-600" 
            onClick={() => onViewProfile(user)}
            style={{ color: '#2C335B' }}
          >
            {user.name}
          </h2>
          <p className="text-md text-gray-700 mt-1">{user.headline}</p>
          <div className="flex items-center justify-end text-sm text-gray-500 mt-3">
            <span>{user.location}</span>
            <LocationIcon className="w-5 h-5 ms-2" />
          </div>
        </div>

      <div className="mt-6 flex items-center space-x-2 space-x-reverse">
        <a 
          href={`mailto:${user.email}`}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 text-center bg-gray-100 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors border-2 border-gray-800"
          aria-label={`Send message to ${user.name}`}
        >
          إرسال رسالة
        </a>
        <a 
          href={`tel:${user.phone}`}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 text-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          aria-label={`Call ${user.name}`}
        >
          اتصال
        </a>
      </div>
    </div>
  );
};

export default SubscriberCard;