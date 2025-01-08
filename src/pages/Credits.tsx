import { useState } from 'react';
import { MainLayout } from '../components/layouts/MainLayout';
import { Coins, CreditCard, Info, MessageCircle, Zap, Shield } from 'lucide-react';
import { redirectToCheckout } from '../lib/stripe/checkout';
import { CreditPackage } from '../components/credits/CreditPackage';
import { STRIPE } from '../lib/stripe/constants';
import { useSupabase } from '../hooks/useSupabase';

export function Credits() {
  const { supabase } = useSupabase();
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handlePurchase = async () => {
    try {
      setIsLoading(true);
      
      // Get current user ID
      const { data: { user } } = await supabase?.auth.getUser() || {};
      if (!user) {
        throw new Error('User not found');
      }

      await redirectToCheckout({
        quantity,
        successUrl: `${window.location.origin}/credits/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/credits`,
        clientReferenceId: user.id // Pass user ID to checkout
      });
    } catch (err: any) {
      console.error('Purchase error:', err);
      alert('결제 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-[#25262b] rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Coins className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">크레딧 구매</h1>
              <p className="text-gray-400">
                크레딧을 구매하여 AI 캐릭터와 대화하세요
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#2c2d32] rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-white">실시간 대화</h3>
              </div>
              <p className="text-sm text-gray-400">
                AI 캐릭터와 자연스러운 실시간 대화를 나눠보세요
              </p>
            </div>
            
            <div className="bg-[#2c2d32] rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-yellow-600/20 text-yellow-400">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-white">즉시 적용</h3>
              </div>
              <p className="text-sm text-gray-400">
                구매 즉시 크레딧이 계정에 추가됩니다
              </p>
            </div>
            
            <div className="bg-[#2c2d32] rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-green-600/20 text-green-400">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-white">안전한 결제</h3>
              </div>
              <p className="text-sm text-gray-400">
                Stripe의 안전한 결제 시스템을 사용합니다
              </p>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-[#2c2d32] rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-yellow-400 mb-2">
              <Info className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm font-medium">1 메시지 = 1 크레딧</span>
            </div>
            <p className="text-sm text-gray-400">
              구매한 크레딧은 환불이 불가능하며, 구매 후 즉시 계정에 적용됩니다.
              크레딧은 AI 캐릭터와의 대화에 사용됩니다.
            </p>
          </div>

          {/* Credit Package Selection */}
          <CreditPackage
            credits={STRIPE.PACKAGE_SIZE}
            price={STRIPE.PRICE_PER_PACKAGE}
            quantity={quantity}
            onQuantityChange={setQuantity}
          />

          {/* Purchase Button */}
          <button
            onClick={handlePurchase}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 mt-6
              bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50
              text-white font-medium rounded-lg transition-colors"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <>
                <CreditCard className="h-5 w-5" />
                {(STRIPE.PACKAGE_SIZE * quantity).toLocaleString()} 크레딧 구매하기
              </>
            )}
          </button>
        </div>
      </div>
    </MainLayout>
  );
}