
import { motion } from 'framer-motion';
import { LoginForm } from '@/components/auth/LoginForm';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

const Login = () => {

  const { isAuthenticated, isInitialized, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!isInitialized) {
    return <div>Loading...</div>
  }

  if (isAuthenticated) {
    console.log("user is already authenticated hence redirecting to login");
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg p-4">
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern" />
      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-sm mb-4">
            <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
              <span className="text-primary font-bold text-xl">T</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">TodoFlow</h1>
          <p className="text-white/80">Manage your tasks with ease</p>
        </motion.div>
        
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
