'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Product } from './demo-data';

type CartLine = { product: Product; quantity: number };
type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered';
type Order = {
  id: string;
  items: CartLine[];
  total: number;
  status: OrderStatus;
  createdAt: string;
};

type DemoContextValue = {
  cart: CartLine[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  couponAvailable: boolean;
  couponApplied: boolean;
  applyCoupon: () => boolean;
  clearCoupon: () => void;
  getDiscount: () => number;
  getFinalPrice: () => number;
  orders: Order[];
  placeOrder: () => Order | null;
  petFeedCount: number;
  petAvailableFeeds: number;
  feedPet: () => void;
  addFeedChance: () => void;
  petCouponClaimed: boolean;
  claimPetCoupon: () => void;
  lacquerPoints: number;
  workshopLevel: number;
  materials: number;
  tools: number;
  addWorkshopTask: (type: 'quiz' | 'share' | 'signin' | 'invite') => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

const LS = {
  CART: 'demo_cart',
  COUPON_AVAILABLE: 'demo_coupon_available',
  COUPON_APPLIED: 'demo_coupon_applied',
  ORDERS: 'demo_orders',
  PET_FEED: 'demo_pet_feed',
  PET_AVAILABLE: 'demo_pet_available',
  PET_COUPON: 'demo_pet_coupon',
  LACQUER_POINTS: 'demo_lacquer_points',
  MATERIALS: 'demo_materials',
  TOOLS: 'demo_tools',
};

const safeParse = <T,>(raw: string | null, fallback: T): T => {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [couponAvailable, setCouponAvailable] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const [petFeedCount, setPetFeedCount] = useState(0);
  const [petAvailableFeeds, setPetAvailableFeeds] = useState(1);
  const [petCouponClaimed, setPetCouponClaimed] = useState(false);

  const [lacquerPoints, setLacquerPoints] = useState(0);
  const [materials, setMaterials] = useState(0);
  const [tools, setTools] = useState(0);

  const workshopLevel = useMemo(() => {
    if (lacquerPoints >= 300) return 4;
    if (lacquerPoints >= 150) return 3;
    if (lacquerPoints >= 50) return 2;
    return 1;
  }, [lacquerPoints]);

  useEffect(() => {
    setCart(safeParse(localStorage.getItem(LS.CART), []));
    setCouponAvailable(localStorage.getItem(LS.COUPON_AVAILABLE) === '1');
    setCouponApplied(localStorage.getItem(LS.COUPON_APPLIED) === '1');
    setOrders(safeParse(localStorage.getItem(LS.ORDERS), []));
    setPetFeedCount(parseInt(localStorage.getItem(LS.PET_FEED) || '0', 10));
    setPetAvailableFeeds(parseInt(localStorage.getItem(LS.PET_AVAILABLE) || '1', 10));
    setPetCouponClaimed(localStorage.getItem(LS.PET_COUPON) === '1');
    setLacquerPoints(parseInt(localStorage.getItem(LS.LACQUER_POINTS) || '0', 10));
    setMaterials(parseInt(localStorage.getItem(LS.MATERIALS) || '0', 10));
    setTools(parseInt(localStorage.getItem(LS.TOOLS) || '0', 10));
  }, []);

  useEffect(() => {
    localStorage.setItem(LS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(LS.COUPON_AVAILABLE, couponAvailable ? '1' : '0');
  }, [couponAvailable]);

  useEffect(() => {
    localStorage.setItem(LS.COUPON_APPLIED, couponApplied ? '1' : '0');
  }, [couponApplied]);

  useEffect(() => {
    localStorage.setItem(LS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(LS.PET_FEED, String(petFeedCount));
  }, [petFeedCount]);

  useEffect(() => {
    localStorage.setItem(LS.PET_AVAILABLE, String(petAvailableFeeds));
  }, [petAvailableFeeds]);

  useEffect(() => {
    localStorage.setItem(LS.PET_COUPON, petCouponClaimed ? '1' : '0');
  }, [petCouponClaimed]);

  useEffect(() => {
    localStorage.setItem(LS.LACQUER_POINTS, String(lacquerPoints));
  }, [lacquerPoints]);

  useEffect(() => {
    localStorage.setItem(LS.MATERIALS, String(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem(LS.TOOLS, String(tools));
  }, [tools]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((l) => l.product.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((l) => l.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prev) => prev.map((l) => (l.product.id === productId ? { ...l, quantity } : l)));
  };

  const clearCart = () => setCart([]);

  const getTotalPrice = () => cart.reduce((sum, l) => sum + l.product.price * l.quantity, 0);

  const getDiscount = () => (couponApplied ? 50 : 0);

  const getFinalPrice = () => Math.max(0, getTotalPrice() - getDiscount());

  const applyCoupon = () => {
    if (!couponAvailable || couponApplied) return false;
    setCouponApplied(true);
    return true;
  };

  const clearCoupon = () => {
    setCouponApplied(false);
    setCouponAvailable(false);
    setPetCouponClaimed(false);
  };

  const placeOrder = () => {
    if (cart.length === 0) return null;
    const order: Order = {
      id: `order_${Date.now()}`,
      items: cart,
      total: getFinalPrice(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
    clearCart();
    if (couponApplied) clearCoupon();
    return order;
  };

  const feedPet = () => {
    if (petAvailableFeeds <= 0) return;
    const nextFeed = petFeedCount + 1;
    setPetFeedCount(nextFeed);
    setPetAvailableFeeds((n) => n - 1);
    if (nextFeed >= 20) setCouponAvailable(true);
  };

  const addFeedChance = () => setPetAvailableFeeds((n) => n + 1);

  const claimPetCoupon = () => {
    if (petFeedCount < 20) return;
    setPetCouponClaimed(true);
    setCouponAvailable(true);
  };

  const addWorkshopTask = (type: 'quiz' | 'share' | 'signin' | 'invite') => {
    let delta = 0;
    let mt = materials;
    let tl = tools;
    if (type === 'quiz') {
      delta = 20;
      mt += 1;
    } else if (type === 'share') {
      delta = 10;
    } else if (type === 'signin') {
      delta = 5;
    } else if (type === 'invite') {
      delta = 50;
      tl += 1;
    }
    setMaterials(mt);
    setTools(tl);
    setLacquerPoints((p) => p + delta);
  };

  const value: DemoContextValue = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    couponAvailable,
    couponApplied,
    applyCoupon,
    clearCoupon,
    getDiscount,
    getFinalPrice,
    orders,
    placeOrder,
    petFeedCount,
    petAvailableFeeds,
    feedPet,
    addFeedChance,
    petCouponClaimed,
    claimPetCoupon,
    lacquerPoints,
    workshopLevel,
    materials,
    tools,
    addWorkshopTask,
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) {
    throw new Error('useDemo must be used within DemoProvider');
  }
  return ctx;
}
