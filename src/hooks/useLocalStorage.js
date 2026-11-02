import { useEffect, useState } from 'react';

function readValue(key, initialValue) {
  if (typeof window === 'undefined') return initialValue;
  try {
    const raw = window.localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : initialValue;
  } catch {
    return initialValue;
  }
}

/**
 * useState, що автоматично зберігається в localStorage
 * і синхронізується між вкладками браузера.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readValue(key, initialValue));

  // Зберігаємо при кожній зміні
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage недоступний (приватний режим, переповнення) — працюємо в пам'яті
    }
  }, [key, value]);

  // Синхронізація з іншими вкладками
  useEffect(() => {
    function handleStorage(event) {
      if (event.key !== key) return;
      try {
        setValue(event.newValue !== null ? JSON.parse(event.newValue) : initialValue);
      } catch {
        /* ігноруємо пошкоджені дані */
      }
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
    // initialValue навмисно не в залежностях — він потрібен лише як запасне значення
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, setValue];
}
