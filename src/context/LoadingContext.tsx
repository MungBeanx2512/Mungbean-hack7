import React, { createContext, useEffect, useState } from 'react';


interface LoadingProviderProps {
  children?: React.ReactNode;
}

export const LoadingContext = createContext<{
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  loading: false,
  setLoading: () => {}
});

const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;