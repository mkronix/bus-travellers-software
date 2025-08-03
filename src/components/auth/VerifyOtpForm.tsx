
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const VerifyOtpForm = () => {
  const [otp, setOtp] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const location = useLocation();
  const navigate = useNavigate();
  
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/signup');
    }
  }, [email, navigate]);

  useEffect(() => {
    const timer = countdown > 0 ? setTimeout(() => setCountdown(countdown - 1), 1000) : null;
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown]);

  const handleResendOtp = async () => {
    setIsResending(true);
    // In a real app, you would call your resend OTP API here
    setTimeout(() => {
      setIsResending(false);
      setCountdown(60);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would verify the OTP here
    // For now, we'll just redirect to login
    navigate('/login');
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <Mail className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Verify your email
        </h2>
        <p className="mt-2 text-muted-foreground">
          We've sent a verification code to{' '}
          <span className="font-medium">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="otp">Verification Code</Label>
          <Input
            id="otp"
            type="text"
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            className="mt-1 text-center text-lg tracking-widest"
          />
        </div>

        <Button type="submit" className="w-full" disabled={otp.length !== 6}>
          Verify Email
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Didn't receive the code?
          </p>
          {countdown > 0 ? (
            <p className="text-sm text-muted-foreground">
              Resend code in {countdown}s
            </p>
          ) : (
            <Button
              type="button"
              variant="ghost"
              onClick={handleResendOtp}
              disabled={isResending}
              className="text-sm"
            >
              {isResending ? (
                <>
                  <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                  Sending...
                </>
              ) : (
                'Resend code'
              )}
            </Button>
          )}
        </div>

        <div className="text-center">
          <Link
            to="/signup"
            className="inline-flex items-center text-sm text-primary hover:text-primary/80"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtpForm;
