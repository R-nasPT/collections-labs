'use client';

import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks';
import { useSession } from 'next-auth/react';
import { useSignOut } from './hooks/useSingOut';
import TokenExpiryToast from './toast/TokenExpiryToast';
import CountdownToast from './toast/CountdownToast';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  const [lastToastMinute, setLastToastMinute] = useState(-1);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const isCountdownActive = useRef(false);
  const isSigningOutRef = useRef(false);

  const { toast } = useToast();
  const signOutHandler = useSignOut();

  const userAuth = {
    user: session?.user,
    expires: session?.expires ? new Date(session.expires).getTime() : 0,
    issuedAt: session?.issuedAt ? new Date(session.issuedAt).getTime() : 0,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    authMethod: session?.user?.authMethod,
  };

  const handleSignOut = useCallback(async () => {
    if (isSigningOut || isSigningOutRef.current) return;

    isSigningOutRef.current = true;
    setIsSigningOut(true);

    toast({
      content: ({ onClose }) => (
        <CountdownToast onClose={onClose} isSigningOut={true} />
      ),
      animationDuration: 500,
      duration: 10000,
    });

    try {
      await signOutHandler('inactivity_timeout');
    } catch (error) {
      console.error('Sign out error:', error);
      setIsSigningOut(false);
    }
  }, [isSigningOut, signOutHandler, toast]);

  const startCountdown = useCallback(() => {
    if (showCountdown || isSigningOut || isCountdownActive.current) return;
  
    isCountdownActive.current = true;
    setShowCountdown(true);

    toast({
      content: ({ onClose }) => (
        <CountdownToast
          onClose={() => {
            onClose();
            setShowCountdown(false);
            isCountdownActive.current = false;
          }}
          isSigningOut={isSigningOut}
        />
      ),
      animationDuration: 500,
      duration: 10000,
    });

    countdownRef.current = setTimeout(() => {
      handleSignOut();
    }, 10000);
  }, [handleSignOut, isSigningOut, showCountdown, toast]);

  useEffect(() => {
    if (!userAuth.isAuthenticated || !userAuth.expires || isSigningOut) return;

    const checkTokenExpiry = () => {
      const now = new Date();
      const currentTime = now.getTime();
      const timeUntilExpiry = userAuth.expires - currentTime;
      const minutesLeft = Math.floor(timeUntilExpiry / 60000);
      const currentMinute = now.getMinutes();

      if (userAuth.authMethod === 'keycloak') {
        return;
      }

      if (timeUntilExpiry <= 0) {
        handleSignOut();
        return;
      }

      if (timeUntilExpiry <= 10000 && timeUntilExpiry > 0 && !showCountdown) {
        startCountdown();
        return;
      }

      if (timeUntilExpiry < 300000 && minutesLeft >= 1 && currentMinute !== lastToastMinute) {
        console.warn(
          `Token ใกล้หมดอายุ เหลือเวลาอีก ${minutesLeft} นาที (${new Date().toLocaleTimeString()})`
        );
        setLastToastMinute(currentMinute);

        toast({
          content: ({ onClose }) => (
            <TokenExpiryToast onClose={onClose} minutes={minutesLeft} />
          ),
          animationDuration: 500,
          duration: 5000,
        });
      }
    };

    checkTokenExpiry();

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const now = new Date();
    const timeUntilExpiry = userAuth.expires - now.getTime();

    if (timeUntilExpiry <= 60000) {
      timerRef.current = setInterval(checkTokenExpiry, 1000);
    } else {
      const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

      const timeoutId = setTimeout(() => {
        checkTokenExpiry();
        timerRef.current = setInterval(checkTokenExpiry, 60000);
      }, delay);

      return () => clearTimeout(timeoutId);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [userAuth.isAuthenticated, userAuth.expires, toast, lastToastMinute, isSigningOut, showCountdown, startCountdown, handleSignOut, userAuth.authMethod]);

  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearTimeout(countdownRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (session?.error !== 'RefreshTokenError') return;
    signOutHandler('token_refresh_failed');
  }, [session?.error, signOutHandler]);

  return children;
}
