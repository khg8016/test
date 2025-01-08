// Environment variable validation
export const requiredEnvVars = {
  VITE_STRIPE_SECRET_KEY: process.env.VITE_STRIPE_SECRET_KEY,
  VITE_STRIPE_WEBHOOK_SECRET: process.env.VITE_STRIPE_WEBHOOK_SECRET,
  VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY
} as const;

export function validateEnvVars() {
  Object.entries(requiredEnvVars).forEach(([key, value]) => {
    if (!value) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });
}