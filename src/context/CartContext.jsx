import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';
import { PRODUCTS_BY_ID, FREE_DELIVERY_FROM, DELIVERY_FEE } from '../data/products.js';

const STORAGE_KEY = 'bloom-blossom-cart';
const MAX_QTY = 99;

const CartContext = createContext(null);

/** Перевіряє дані з localStorage: залишає лише існуючі товари з коректною кількістю */
function sanitize(items) {
  if (!Array.isArray(items)) return [];
  return items
    .filter((item) => item && PRODUCTS_BY_ID[item.id] && Number.isInteger(item.quantity) && item.quantity > 0)
    .map((item) => ({ id: item.id, quantity: Math.min(item.quantity, MAX_QTY) }));
}

export function CartProvider({ children }) {
  const [storedItems, setStoredItems] = useLocalStorage(STORAGE_KEY, []);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const items = useMemo(() => sanitize(storedItems), [storedItems]);

  const showToast = useCallback((message) => {
    clearTimeout(toastTimer.current);
    setToast({ message, key: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const addToCart = useCallback(
    (productId, quantity = 1) => {
      const product = PRODUCTS_BY_ID[productId];
      if (!product) return;
      setStoredItems((prev) => {
        const current = sanitize(prev);
        const existing = current.find((item) => item.id === productId);
        if (existing) {
          return current.map((item) =>
            item.id === productId ? { ...item, quantity: Math.min(item.quantity + quantity, MAX_QTY) } : item
          );
        }
        return [...current, { id: productId, quantity: Math.min(quantity, MAX_QTY) }];
      });
      showToast(`«${product.name}» додано до кошика`);
    },
    [setStoredItems, showToast]
  );

  const removeFromCart = useCallback(
    (productId) => {
      setStoredItems((prev) => sanitize(prev).filter((item) => item.id !== productId));
    },
    [setStoredItems]
  );

  const updateQuantity = useCallback(
    (productId, quantity) => {
      const qty = Math.max(1, Math.min(Math.floor(quantity) || 1, MAX_QTY));
      setStoredItems((prev) =>
        sanitize(prev).map((item) => (item.id === productId ? { ...item, quantity: qty } : item))
      );
    },
    [setStoredItems]
  );

  const increaseQuantity = useCallback(
    (productId) => {
      setStoredItems((prev) =>
        sanitize(prev).map((item) =>
          item.id === productId ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QTY) } : item
        )
      );
    },
    [setStoredItems]
  );

  const decreaseQuantity = useCallback(
    (productId) => {
      setStoredItems((prev) =>
        sanitize(prev).map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
        )
      );
    },
    [setStoredItems]
  );

  const clearCart = useCallback(() => setStoredItems([]), [setStoredItems]);

  // Похідні значення рахуються в реальному часі
  const value = useMemo(() => {
    const detailedItems = items.map((item) => {
      const product = PRODUCTS_BY_ID[item.id];
      return { ...item, product, lineTotal: product.price * item.quantity };
    });
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = detailedItems.reduce((sum, item) => sum + item.lineTotal, 0);
    const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
    const grandTotal = subtotal + delivery;
    const quantities = Object.fromEntries(items.map((item) => [item.id, item.quantity]));

    return {
      items: detailedItems,
      quantities,
      totalItems,
      subtotal,
      delivery,
      grandTotal,
      maxQuantity: MAX_QTY,
      addToCart,
      removeFromCart,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      toast,
      showToast,
    };
  }, [items, addToCart, removeFromCart, updateQuantity, increaseQuantity, decreaseQuantity, clearCart, toast, showToast]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart потрібно використовувати всередині <CartProvider>');
  }
  return context;
}
