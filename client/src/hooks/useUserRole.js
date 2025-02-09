import { useState, useEffect } from 'react';

// Simulate fetching user role from a server or local storage
const getUserRole = () => {
    // Example: Returning 'admin', 'teacher', or 'student' based on some condition
    // You can modify this logic to fit your needs, like fetching from an API or local storage
    return localStorage.getItem('userRole') || 'student'; // Default to 'student' if not set
};

export const useUserRole = () => {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const userRole = getUserRole();
        setRole(userRole);
    }, []);

    return { role };
};