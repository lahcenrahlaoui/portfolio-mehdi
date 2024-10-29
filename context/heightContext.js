import { createContext, useContext, useState } from 'react';

// Create the context
export const MyContext = createContext();

// Export a hook for easy access
export const useMyContext = () => useContext(MyContext);
