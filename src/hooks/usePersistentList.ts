import { useEffect, useState } from 'react';

export function usePersistentList(key: string) {
  const [items, setItems] = useState<string[]>(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(key) || '[]');
      return Array.isArray(stored) ? stored.filter((item): item is string => typeof item === 'string') : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(items));
    } catch {
      // Private browsing and storage limits should not prevent in-session use.
    }
  }, [items, key]);

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key !== key && event.key !== null) return;
      try {
        const next: unknown = JSON.parse(event.newValue || '[]');
        setItems(Array.isArray(next) ? next.filter((item): item is string => typeof item === 'string') : []);
      } catch {
        setItems([]);
      }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, [key]);

  return [items, setItems] as const;
}