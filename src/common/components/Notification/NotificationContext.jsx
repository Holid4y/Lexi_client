import React, { createContext, useContext, useState, useEffect } from "react";
import Notification from "./Notification";

const NotificationContext = createContext();

export const useNotification = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [visibleNotifications, setVisibleNotifications] = useState([]);

    useEffect(() => {
        if (notifications.length > 0 && visibleNotifications.length < 3) {
            const newNotification = notifications[0];
            setVisibleNotifications((prev) => [
                ...prev,
                { ...newNotification, position: prev.length }
            ]);
            setNotifications((prev) => prev.slice(1));
        }
    }, [notifications, visibleNotifications]);

    useEffect(() => {
        visibleNotifications.forEach(notification => {
            const timer = setTimeout(() => {
                setVisibleNotifications((prev) => {
                    const updated = prev.filter(n => n.id !== notification.id);
                    return updated.map((notif, index) => ({ ...notif, position: index }));
                });
            }, notification.timeout);

            return () => clearTimeout(timer);
        });
    }, [visibleNotifications]);

    const addNotification = (message, timeout = 4000) => {
        const id = Date.now();
        setNotifications((prev) => [
            ...prev,
            { id, message, timeout }
        ]);
    };

    const removeNotification = (id) => {
        setVisibleNotifications((prev) => {
            const updated = prev.filter(notification => notification.id !== id);
            return updated.map((notif, index) => ({ ...notif, position: index }));
        });
    };

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}
            {visibleNotifications.map((notification) => (
                <Notification
                    key={notification.id}
                    message={notification.message}
                    timeout={notification.timeout}
                    onClose={() => removeNotification(notification.id)}
                    position={notification.position}
                />
            ))}
        </NotificationContext.Provider>
    );
};
