import { ClerkProvider } from '@clerk/clerk-react';

const ClerkProviderContext = ({ children }: { children: React.ReactNode }) => {
  // Import your Publishable Key
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key');
  }
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>{children}</ClerkProvider>
  );
};
export default ClerkProviderContext;
