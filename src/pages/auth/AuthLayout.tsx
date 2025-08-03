
import { Outlet } from 'react-router-dom';
import FeatureSlider from '@/components/auth/FeatureSlider';
import AuthGuard from '@/components/auth/AuthGuard';

const AuthLayout = () => {
  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen bg-background">
        <div className="flex min-h-screen">
          {/* Left side - Auth forms */}
          <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <Outlet />
            </div>
          </div>

          {/* Right side - Feature slider */}
          <div className="relative hidden lg:block lg:w-1/2">
            <FeatureSlider />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default AuthLayout;
