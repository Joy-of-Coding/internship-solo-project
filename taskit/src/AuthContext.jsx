// // AuthContext.js
// import React, { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const storedUserId = localStorage.getItem('userId');
//     if (storedUserId) {
//       setIsLoggedIn(true);
//       setUserId(storedUserId);
//     } else {
//       setIsLoggedIn(false);
//       setUserId(null);
//     }
//   }, []);

//   // Add useEffect to listen for changes in localStorage
//   useEffect(() => {
//     const handleStorageChange = () => {
//       const storedUserId = localStorage.getItem('userId');
//       if (storedUserId) {
//         setIsLoggedIn(true);
//         setUserId(storedUserId);
//       } else {
//         setIsLoggedIn(false);
//         setUserId(null);
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   const login = (userId) => {
//     localStorage.setItem('userId', userId);
//     setIsLoggedIn(true);
//     setUserId(userId);
//   };

//   const logout = () => {
//     localStorage.removeItem('userId');
//     setIsLoggedIn(false);
//     setUserId(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
