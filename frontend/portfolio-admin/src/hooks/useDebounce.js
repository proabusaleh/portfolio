import { useState, useEffect } from 'react';

/**
 * Debounces a value.
 * Useful for search inputs to avoid API calls on every keystroke.
 *
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 500);
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}