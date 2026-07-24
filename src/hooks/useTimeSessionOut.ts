import { useEffect, useRef, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { logout, getUser } from '../redux/slices/authSlice';

const IDLE_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds
const LAST_ACTIVE_KEY = 'lastActive';
const ACTIVITY_DEBOUNCE = 10 * 1000; // Throttles AsyncStorage writes (10s)

export const useSessionTimeout = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const isAuthenticated = !!user;

  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const appState = useRef(AppState.currentState);
  const isCheckingSession = useRef(false);
  const lastStorageWrite = useRef<number>(0);

  const handleSessionExpired = useCallback(async () => {
    if (idleTimer.current) {
      clearTimeout(idleTimer.current);
      idleTimer.current = null;
    }
    try {
      await AsyncStorage.removeItem(LAST_ACTIVE_KEY);
    } catch { }
    dispatch(logout());
  }, [dispatch]);

  const saveLastActive = useCallback(async () => {
    try {
      await AsyncStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString());
    } catch { }
  }, []);

  const resetIdleTimer = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(handleSessionExpired, IDLE_TIMEOUT);
  }, [handleSessionExpired]);

  // Single entry point for user activity (touch/swipe/press)
  const handleUserActivity = useCallback(() => {
    if (!isAuthenticated) return;
    resetIdleTimer();
    const now = Date.now();
    if (now - lastStorageWrite.current > ACTIVITY_DEBOUNCE) {
      lastStorageWrite.current = now;
      saveLastActive();
    }
  }, [isAuthenticated, resetIdleTimer, saveLastActive]);

  const checkSessionExpiry = useCallback(async (): Promise<boolean> => {
    if (isCheckingSession.current) return false;
    try {
      isCheckingSession.current = true;
      const lastActive = await AsyncStorage.getItem(LAST_ACTIVE_KEY);
      if (!lastActive) return false;
      const parsedTime = parseInt(lastActive, 10);
      if (isNaN(parsedTime)) return false;
      return Date.now() - parsedTime >= IDLE_TIMEOUT;
    } catch {
      return false;
    } finally {
      isCheckingSession.current = false;
    }
  }, []);

  const handleAppStateChange = useCallback(
    async (nextAppState: AppStateStatus) => {
      const prevState = appState.current;
      appState.current = nextAppState;

      if (!isAuthenticated) return;

      // App returning to foreground
      if (prevState.match(/inactive|background/) && nextAppState === 'active') {
        const expired = await checkSessionExpiry();
        if (expired) {
          await handleSessionExpired();
        } else {
          await saveLastActive();
          resetIdleTimer();
        }
        return;
      }

      // App going to background or inactive
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        if (idleTimer.current) {
          clearTimeout(idleTimer.current);
          idleTimer.current = null;
        }
        // Save background timestamp for cold-start or return checks
        await saveLastActive();
      }
    },
    [isAuthenticated, checkSessionExpiry, handleSessionExpired, resetIdleTimer, saveLastActive],
  );

  useEffect(() => {
    if (!isAuthenticated) {
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
        idleTimer.current = null;
      }
      return;
    }

    // Check if session expired while process was killed or in background before app mount
    const initSession = async () => {
      const expired = await checkSessionExpiry();
      if (expired) {
        await handleSessionExpired();
      } else {
        await saveLastActive();
        resetIdleTimer();
      }
    };

    initSession();

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      subscription.remove();
    };
  }, [isAuthenticated, checkSessionExpiry, handleSessionExpired, resetIdleTimer, saveLastActive, handleAppStateChange]);

  return { handleUserActivity };
};
