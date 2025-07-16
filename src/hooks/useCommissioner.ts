import { useState, useEffect } from 'react';
import { Commissioner } from '@/types/commissioner';

export function useCommissioner() {
  const [commissioner, setCommissioner] = useState<Commissioner | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCommissioner() {
      try {
        setLoading(true);
        const response = await fetch('/api/commissioner/me');
        
        if (!response.ok) {
          throw new Error('Failed to fetch commissioner');
        }
        
        const data: Commissioner = await response.json();
        setCommissioner(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchCommissioner();
  }, []);

  const updateCommissioner = async (updates: Partial<Commissioner>): Promise<void> => {
    try {
      const response = await fetch('/api/commissioner/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update commissioner');
      }

      const updatedCommissioner: Commissioner = await response.json();
      setCommissioner(updatedCommissioner);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return {
    commissioner,
    loading,
    error,
    updateCommissioner,
  };
}
