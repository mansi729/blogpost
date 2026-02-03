import React, { createContext, useState, useContext, useEffect } from 'react';


const ThemeContext = createContext(null);


export const useTheme = () => useContext(ThemeContext);


export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); 

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  
  useEffect(() => {
    const savedTheme = localStorage.getItem('appTheme') || 'light';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  const value = { theme, toggleTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
