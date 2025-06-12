
import { create } from 'zustand';
import { AuthState, LoginRequest, RegisterRequest } from '@/types';
import { authService } from '@/services/auth';
import { toast } from '@/hooks/use-toast';

interface AuthStore extends AuthState {
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  isInitialized: boolean;
}

export const useAuth = create<AuthStore>((set, get) => ({  
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  isInitialized: false,

  checkAuth: () => {
    const token = authService.getToken();
    const user = authService.getCurrentUser();
    
    console.log("consoling token and user: ", token, user);

    if (token && user) {
      set({
        token,
        user,
        isAuthenticated: true,
        isInitialized: true,
      });
    } else {
      set({
        isAuthenticated: false,
        isInitialized: true, 
      });
    }
  },

  login: async (data: LoginRequest) => {
    set({ isLoading: true });
    try {
      const { token, user } = await authService.login(data);
      set({
        token,
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      toast({
        title: 'Welcome back!',
        description: 'Successfully logged in.',
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (data: RegisterRequest) => {
    set({ isLoading: true });
    try {
      await authService.register(data);
      set({ isLoading: false });
      toast({
        title: 'Account created!',
        description: 'Please log in with your credentials.',
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    toast({
      title: 'Logged out',
      description: 'See you next time!',
    });
  },
}));
