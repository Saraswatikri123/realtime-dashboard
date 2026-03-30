import { useState, useEffect, useCallback, useRef } from 'react';

const SYNC_INTERVAL = 60; // seconds

export function useDataSync() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(SYNC_INTERVAL);
  const [syncCount, setSyncCount] = useState(0);
  const [lastSynced, setLastSynced] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const countdownRef = useRef(null);
  const fetchTimerRef = useRef(null);

  const fetchData = useCallback(async () => {
    setIsSyncing(true);
    setError(null);
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=12'
      );
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      setPosts(data);
      setLastSynced(new Date());
      setSyncCount((c) => c + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsSyncing(false);
      setCountdown(SYNC_INTERVAL);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refetch every 60 seconds
  useEffect(() => {
    fetchTimerRef.current = setInterval(() => {
      fetchData();
    }, SYNC_INTERVAL * 1000);

    return () => clearInterval(fetchTimerRef.current);
  }, [fetchData]);

  // Countdown ticker
  useEffect(() => {
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) return SYNC_INTERVAL;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownRef.current);
  }, []);

  const manualRefresh = useCallback(() => {
    // Reset the auto-fetch timer so it doesn't double-fire
    clearInterval(fetchTimerRef.current);
    fetchData();
    fetchTimerRef.current = setInterval(() => {
      fetchData();
    }, SYNC_INTERVAL * 1000);
  }, [fetchData]);

  return {
    posts,
    loading,
    error,
    countdown,
    syncCount,
    lastSynced,
    isSyncing,
    manualRefresh,
    syncInterval: SYNC_INTERVAL,
  };
}
