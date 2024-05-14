import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //const [user, setUser] = useState(null);
  const [user, setUser] = useState({ isLoggedIn: false, userId: null });


  const login = (userId) => {
    // Perform login logic here
    // Set user object with userId
    setUser({ isLoggedIn: true, userId });
  };

  const logout = () => {
    // Perform logout logic here
    // Set user object to null
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



// import React, { createContext, useState } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
  
//   const login = () => {
//     // Perform login logic here
//     // Set isLoggedIn to true
//     setIsLoggedIn(true);
    
//   };

//   const logout = () => {
//     // Perform logout logic here
//     // Set isLoggedIn to false
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };