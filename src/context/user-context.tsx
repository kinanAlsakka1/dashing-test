// UserContext.tsx
import React, { createContext, useContext, ReactNode , useState  } from 'react';

// Define the user type
type User = {
  username: string;
  role : 'Editor' | 'Viewer';
  name: string;
};

// Create the UserContext
const UserContext = createContext<{
  user: User;
  updateUser: (newUser: User) => void;
  isAuth: boolean;
  updateIsAuth : (value: boolean) => void;
} | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};


export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    username: '',
    name: '',
    role : 'Viewer'
  });
  // Define the updateUser function
  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  const [isAuth , setIsAuth] = useState<boolean>(false);
  // Define the updateIsAuth function
  const updateIsAuth = (value: boolean) => {
    setIsAuth(value);
  };

    

  return (
    <UserContext.Provider value={{ user , updateUser , isAuth , updateIsAuth}}>
      {children}
    </UserContext.Provider>
  )
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
