import React from 'react';
import { BriefcaseIcon, ShieldCheckIcon, XIcon } from './icons';

interface NotificationProps {
  message: string;
  type: 'success' | 'info' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const baseClasses = 'fixed bottom-5 left-1/2 flex items-center p-4 rounded-lg text-white shadow-lg z-50 animate-fade-in-up';

  const typeClasses = {
    success: 'bg-green-500',
    info: 'bg-blue-500',
    error: 'bg-red-500',
  };

  const icons = {
    success: <ShieldCheckIcon className="w-6 h-6" />,
    info: <BriefcaseIcon className="w-6 h-6" />,
    error: <XIcon className="w-6 h-6" />,
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`} role="alert">
      <div className="me-3">{icons[type]}</div>
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ms-auto -mx-1.5 -my-1.5 p-1.5 rounded-full inline-flex hover:bg-white/20" aria-label="إغلاق">
        <XIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Notification;
