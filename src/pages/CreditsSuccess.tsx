import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MainLayout } from '../components/layouts/MainLayout';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useSupabase } from '../hooks/useSupabase';

export function CreditsSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { supabase } = useSupabase();
  const sessionId = searchParams.get('session_id');
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId || !supabase) {
      navigate('/credits');
      return;
    }

    // Check payment status
    const checkPaymentStatus = async () => {
      try {
        const { data: payment } = await supabase
          .from('payments')
          .select('status')
          .eq('stripe_session_id', sessionId)
          .single();

        if (payment?.status === 'succeeded') {
          setIsVerifying(false);
        } else {
          // Keep checking every 2 seconds
          setTimeout(checkPaymentStatus, 2000);
        }
      } catch (err) {
        console.error('Failed to check payment status:', err);
        setError('결제 상태를 확인할 수 없습니다');
        setIsVerifying(false);
      }
    };

    checkPaymentStatus();

    // Cleanup timeout on unmount
    return () => {
      setIsVerifying(false);
    };
  }, [sessionId, navigate, supabase]);

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#25262b] rounded-xl p-6 text-center">
          <div className="flex justify-center mb-4">
            {isVerifying ? (
              <div className="h-16 w-16 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : error ? (
              <div className="h-16 w-16 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center">
                <CheckCircle className="h-8 w-8" />
              </div>
            ) : (
              <div className="h-16 w-16 rounded-full bg-green-600/20 text-green-400 flex items-center justify-center">
                <CheckCircle className="h-8 w-8" />
              </div>
            )}
          </div>
          
          {isVerifying ? (
            <>
              <h1 className="text-2xl font-bold text-white mb-2">
                결제 확인 중
              </h1>
              <p className="text-gray-400 mb-6">
                결제가 처리되고 있습니다. 잠시만 기다려주세요...
              </p>
            </>
          ) : error ? (
            <>
              <h1 className="text-2xl font-bold text-white mb-2">
                오류가 발생했습니다
              </h1>
              <p className="text-red-400 mb-6">{error}</p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-white mb-2">
                결제가 완료되었습니다
              </h1>
              <p className="text-gray-400 mb-6">
                크레딧이 계정에 추가되었습니다
              </p>
            </>
          )}

          <button
            onClick={() => navigate('/my-credits')}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 
              text-white font-medium rounded-lg transition-colors"
          >
            내 크레딧 확인하기
          </button>
        </div>
      </div>
    </MainLayout>
  );
}