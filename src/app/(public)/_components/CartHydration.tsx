"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { hydrateCart } from '@/store/cartSlice';

export default function CartHydration() {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(hydrateCart());
  }, [dispatch]);

  return null;
}