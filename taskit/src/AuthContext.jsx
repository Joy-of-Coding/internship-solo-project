// import React, { createContext, useState } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   //const [user, setUser] = useState(null);
//   const [user, setUser] = useState({ isLoggedIn: false, userId: null });

//   const login = (userId) => {
//     // Perform login logic here
//     // Set user object with userId
//     setUser({ isLoggedIn: true, userId });
//   };

//   const logout = () => {
//     // Perform logout logic here
//     // Set user object to null
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


