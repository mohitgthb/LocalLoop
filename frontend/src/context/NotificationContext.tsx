// src/contexts/NotificationContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthContext'; // ✅ import your auth hook

interface Notification {
  type: string;
  message: string;
  data?: any;
}

interface NotificationContextProps {
  notifications: Notification[];
}

const NotificationContext = createContext<NotificationContextProps>({
  notifications: [],
});

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  const { user } = useAuth(); // ✅ Get the logged in user

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      transports: ['websocket'], // Good practice
    });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('✅ Connected to Socket.io server');

      // ✅ Join the user's room!
      if (user?.id) {
        console.log(`Joining room for user: ${user.id}`);
        newSocket.emit('join', user.id);
      }
    });

    newSocket.on('newNotification', (data) => {
      console.log('✅ Received notification:', data);
      const newNotification = {
        type: data.type,
        message: data.message,
        data,
      };
      setNotifications((prev) => [newNotification, ...prev]);
      toast.info(newNotification.message);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user?.id]); // ✅ Only re-run when user.id changes

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
      <ToastContainer position="top-right" />
    </NotificationContext.Provider>
  );
};
