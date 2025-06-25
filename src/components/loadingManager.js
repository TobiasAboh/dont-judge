// components/LoadingManager.js
'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import LoadingScreen from './loadingScreen';

export default function LoadingManager({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleEnd = () => setLoading(false);

    router.events?.on('routeChangeStart', handleStart);
    router.events?.on('routeChangeComplete', handleEnd);
    router.events?.on('routeChangeError', handleEnd);

    return () => {
      router.events?.off('routeChangeStart', handleStart);
      router.events?.off('routeChangeComplete', handleEnd);
      router.events?.off('routeChangeError', handleEnd);
    };
  }, [pathname]);

  return (
    <>
      {loading && <LoadingScreen />}
      {children}
    </>
  );
}
