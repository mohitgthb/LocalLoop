import React from 'react';
import { useNotifications } from '../context/NotificationContext';
import { Bell } from 'lucide-react';

export default function Header() {
  const { notifications } = useNotifications();

  return (
    <header className="flex justify-end p-4">
      <div className="relative">
        <Bell className="w-6 h-6 text-gray-600" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {notifications.length}
          </span>
        )}
      </div>
    </header>
  );
}
