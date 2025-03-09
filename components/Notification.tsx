//components\Notification.tsx
"use client";

import React, { useState, useEffect } from "react";

interface Notification {
  id: number;
  message: string;
  date: string;
  imageUrl: string; // URL-ja e imazhit
  read?: boolean; // Tregon nëse njoftimi është lexuar
}

const Notification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Ruaj URL-në e imazhit të zgjedhur

  useEffect(() => {
    // Ngarko njoftimet nga localStorage kur komponenti mountohet
    const savedNotifications = JSON.parse(localStorage.getItem("notifications") || "[]");
    setNotifications(savedNotifications);
  }, []);

  const clearNotifications = () => {
    setNotifications([]);
    localStorage.setItem("notifications", JSON.stringify([]));
  };

  const markAsRead = (id: number) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const handleNotificationClick = (imageUrl: string, id: number) => {
    // Shëno njoftimin si të lexuar
    markAsRead(id);
    // Shfaq imazhin në modal
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    // Mbyll modal-in
    setSelectedImage(null);
  };

  const unreadNotificationsCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-400 hover:text-white focus:outline-none relative"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {/* Badge për numrin e notifikimeve të palexuara */}
        {unreadNotificationsCount > 0 && (
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
            {unreadNotificationsCount}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Notifications</h3>
              <button
                onClick={clearNotifications}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Clear All
              </button>
            </div>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`mb-2 ${!notification.read ? 'font-bold' : ''}`}
                  onClick={() => handleNotificationClick(notification.imageUrl, notification.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.date}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No notifications</p>
            )}
          </div>
        </div>
      )}

      {/* Modal për të shfaqur imazhin */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg relative">
            <img src={selectedImage} alt="Uploaded" className="max-w-full max-h-[80vh]" />
            <button
              onClick={closeImageModal}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;