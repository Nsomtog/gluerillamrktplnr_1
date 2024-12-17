import { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Import Firebase config from separate file
import { firebaseConfig } from '../firebase.config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

export enum Role {
  ADMINPM = 'admin',
  CONTRACTOR = 'user',
}

export enum ServiceType {
  PHOTOGRAPHY = 'photography',
  VIDEOGRAPHY = 'videography',
  EDITING = 'editing',
  DESIGN = 'design'
}

interface ContractorRestrictions {
  startDate: Date;
  allowedFileTypes: string[];
  maxUploadsPerDay: number;
}

interface ContractorPermissions {
  serviceTypes: ServiceType[];
  restrictions: ContractorRestrictions;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  role: Role | null;
  contractorPermissions: ContractorPermissions | null;
}

interface AuthContextType {
  authState: AuthState;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
    role: null,
    contractorPermissions: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Example of setting contractor permissions - in real app, fetch from Firestore
        const isContractor = user.email !== 'admin@example.com';
        setAuthState(prev => ({
          ...prev,
          user,
          loading: false,
          role: isContractor ? Role.CONTRACTOR : Role.ADMINPM,
          contractorPermissions: isContractor ? {
            serviceTypes: [ServiceType.PHOTOGRAPHY],
            restrictions: {
              startDate: new Date(),
              allowedFileTypes: ['jpg', 'png', 'heic'],
              maxUploadsPerDay: 50
            }
          } : null
        }));
      } else {
        setAuthState(prev => ({
          ...prev,
          user: null,
          loading: false,
          role: null,
          contractorPermissions: null
        }));
      }
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: (error as Error).message,
        loading: false
      }));
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: (error as Error).message,
        loading: false
      }));
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      await signOut(auth);
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: (error as Error).message,
        loading: false
      }));
      throw error;
    }
  };

  const value = {
    authState,
    signUp,
    signIn,
    signOut: handleSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};