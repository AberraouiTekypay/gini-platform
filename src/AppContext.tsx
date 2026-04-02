import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AppContextType {
  data: any; // TODO: Type this properly when the data structure is fully understood
  updateData: (newData: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [data, setData] = useState<any>({});

  const updateData = (newData: any) => {
    setData(newData);
  };

  return (
    <AppContext.Provider value={{ data, updateData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppProvider;
