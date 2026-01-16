import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ExternalLink, Loader2 } from 'lucide-react';

export default function SuccessPage({ whatsappLink }) {
  const [countdown, setCountdown] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleRedirect();
    }
  }, [countdown]);

  const handleRedirect = () => {
    setIsRedirecting(true);
    window.location.href = whatsappLink;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 via-warm-white to-primary-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full shadow-2xl border-0 animate-fade-in">
        <CardHeader className="text-center bg-gradient-to-r from-mint to-primary text-white rounded-t-lg">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-3">
              <CheckCircle2 className="w-12 h-12 text-mint" />
            </div>
          </div>
          <CardTitle className="text-white text-2xl">Registration Successful!</CardTitle>
          <CardDescription className="text-white/90 text-base">
            Your application has been submitted successfully
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-2">
            <p className="text-navy font-medium">
              Thank you for registering with SmartDesignHub!
            </p>
            <p className="text-slate text-sm">
              A confirmation email has been sent to your registered email address with all the details.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-2">
            <p className="text-navy font-semibold text-sm">Next Step: Complete Your Payment</p>
            <p className="text-slate text-xs">
              You will be redirected to WhatsApp to complete your course payment in{' '}
              <span className="font-bold text-primary text-lg">{countdown}</span> seconds
            </p>
          </div>

          <Button
            onClick={handleRedirect}
            size="lg"
            className="w-full"
            disabled={isRedirecting}
          >
            {isRedirecting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Redirecting...
              </>
            ) : (
              <>
                <ExternalLink className="mr-2 h-5 w-5" />
                Proceed to Payment Now
              </>
            )}
          </Button>

          <div className="pt-4 border-t">
            <p className="text-xs text-slate">
              If you're not redirected automatically, please click the button above
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
