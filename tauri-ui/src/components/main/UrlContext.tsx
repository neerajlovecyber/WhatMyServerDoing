import { createContext, useContext, useState, ReactNode } from 'react';

interface UrlContextProps {
  children: ReactNode;
}

const UrlContext = createContext({
  url: 'http://localhost:8080/',
  setUrl: {} as React.Dispatch<React.SetStateAction<string>>,
});

export const UrlProvider: React.FC<UrlContextProps> = ({ children }) => {
  const [url, setUrl] = useState('http://localhost:8080/'); // Default URL

  return (
    <UrlContext.Provider value={{ url, setUrl }}>
      {children}
    </UrlContext.Provider>
  );
};

export const useUrl = () => useContext(UrlContext);
