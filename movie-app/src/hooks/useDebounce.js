import { useState, useEffect } from 'react';

/**
 * A custom hook to debounce a value.
 * @param {any} value The value to debounce (e.g., a search term).
 * @param {number} delay The debounce delay in milliseconds.
 * @returns {any} The debounced value.
 */
export const useDebounce = (value, delay) => {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Set up a timer that will update the debounced value after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // This is the cleanup function that React runs before re-running the effect.
      // If the `value` or `delay` changes, the previous timer will be cleared,
      // and a new one will be set. This is the core of the debounce logic.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-run the effect if the value or delay changes
  );

  return debouncedValue;
};
