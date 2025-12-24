// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { CartItem } from "@/types";
// import { RootState } from "@/store/store";

// interface CartState {
//   items: CartItem[];
//   isLoading: boolean;
//   error: string | null;
// }

// const CART_STORAGE_KEY = "ecommerce_cart";

// // Load cart from localStorage
// const loadCartFromStorage = (): CartItem[] => {
//   if (typeof window === "undefined") return [];

//   try {
//     const savedCart = localStorage.getItem(CART_STORAGE_KEY);
//     return savedCart ? JSON.parse(savedCart) : [];
//   } catch (error) {
//     console.error("Error loading cart from localStorage:", error);
//     return [];
//   }
// };

// // Save cart to localStorage
// const saveCartToStorage = (items: CartItem[]) => {
//   if (typeof window === "undefined") return;

//   try {
//     localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
//   } catch (error) {
//     console.error("Error saving cart to localStorage:", error);
//   }
// };

// const initialState: CartState = {
//   items: loadCartFromStorage(),
//   isLoading: false,
//   error: null,
// };

// const slice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<CartItem>) => {
//       state.isLoading = true;

//       if (action.payload.quantity < 1) {
//         state.error = "Quantity must be more than 0";
//         state.isLoading = false;
//         return;
//       }

//       const cartItemId = `${action.payload.productId}:${action.payload.variantId}`;
//       const existingItem = state.items.find((item) => item.id === cartItemId);

//       if (existingItem) {
//         existingItem.quantity += action.payload.quantity;
//       } else {
//         const newCartItem: CartItem = {
//           ...action.payload,
//           id: cartItemId,
//         };
//         state.items.push(newCartItem);
//       }

//       saveCartToStorage(state.items);
//       state.error = null;
//       state.isLoading = false;
//     },

//     updateCartItemQuantity: (
//       state,
//       action: PayloadAction<{ id: string; quantity: number }>
//     ) => {
//       const item = state.items.find((item) => item.id === action.payload.id);

//       if (item) {
//         if (action.payload.quantity <= 0) {
//           state.items = state.items.filter((item) => item.id !== action.payload.id);
//         } else {
//           item.quantity = action.payload.quantity;
//         }
//         saveCartToStorage(state.items);
//       }
//     },

//     incrementCartItem: (state, action: PayloadAction<string>) => {
//       const item = state.items.find((item) => item.id === action.payload);

//       if (item) {
//         item.quantity += 1;
//         saveCartToStorage(state.items);
//       }
//     },

//     decrementCartItem: (state, action: PayloadAction<string>) => {
//       const item = state.items.find((item) => item.id === action.payload);

//       if (item) {
//         if (item.quantity <= 1) {
//           state.items = state.items.filter((item) => item.id !== action.payload);
//         } else {
//           item.quantity -= 1;
//         }
//         saveCartToStorage(state.items);
//       }
//     },

//     removeFromCart: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter((item) => item.id !== action.payload);
//       saveCartToStorage(state.items);
//     },

//     clearCart: (state) => {
//       state.items = [];
//       saveCartToStorage([]);
//     },

//     setError: (state, action: PayloadAction<string | null>) => {
//       state.error = action.payload;
//     },
//   },
// });

// // Selectors
// export const selectCartItems = (state: RootState) => state.cart.items;

// export const selectCartItemsCount = (state: RootState) =>
//   state.cart.items.reduce((total, item) => total + item.quantity, 0);

// export const selectCartTotal = (state: RootState) =>
//   state.cart.items.reduce((total, item) => {
//     // You'll need to calculate price based on product data
//     // This is a placeholder - adjust based on your product structure
//     return total + item.quantity;
//   }, 0);

// export const selectCartItemById = (id: string) => (state: RootState) =>
//   state.cart.items.find((item) => item.id === id);

// export const selectIsCartEmpty = (state: RootState) =>
//   state.cart.items.length === 0;

// export const selectCartError = (state: RootState) => state.cart.error;

// export const selectCartLoading = (state: RootState) => state.cart.isLoading;

// // Helper selector to check if a specific product variant is in cart
// export const selectIsInCart = (productId: string, variantId: string | null) =>
//   (state: RootState) => {
//     const cartItemId = `${productId}:${variantId}`;
//     return state.cart.items.some((item) => item.id === cartItemId);
//   };

// // Get quantity of specific product variant in cart
// export const selectCartItemQuantity = (productId: string, variantId: string | null) =>
//   (state: RootState) => {
//     const cartItemId = `${productId}:${variantId}`;
//     const item = state.cart.items.find((item) => item.id === cartItemId);
//     return item?.quantity || 0;
//   };

// export const {
//   addToCart,
//   updateCartItemQuantity,
//   incrementCartItem,
//   decrementCartItem,
//   removeFromCart,
//   clearCart,
//   setError,
// } = slice.actions;

// export default slice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product, ProductVariant } from "@/types";
import { RootState } from "@/store/store";
import { Item } from "@radix-ui/react-dropdown-menu";

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

const CART_STORAGE_KEY = "ecommerce_cart";

const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const initialState: CartState = {
  items: loadCartFromStorage(),
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.isLoading = true;

      if (action.payload.quantity < 1) {
        state.error = "Quantity must be more than 0";
        state.isLoading = false;
        return;
      }

      const cartItemId = `${action.payload.productId}:${action.payload.variantId}`;
      const existingItem = state.items.find((item) => item.id === cartItemId);

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        const newCartItem: CartItem = {
          ...action.payload,
          id: cartItemId,
        };
        state.items.push(newCartItem);
      }

      saveCartToStorage(state.items);
      state.error = null;
      state.isLoading = false;
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          item.quantity = action.payload.quantity;
        }
        saveCartToStorage(state.items);
      }
    },

    incrementCartItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (item) {
        item.quantity += 1;
        saveCartToStorage(state.items);
      }
    },

    decrementCartItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (item) {
        if (item.quantity <= 1) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        } else {
          item.quantity -= 1;
        }
        saveCartToStorage(state.items);
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveCartToStorage([]);
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemsCount = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state: RootState) =>
  state.cart.items.reduce((total, item) => {
    // Price calculation will be done in the component with product data
    return total;
  }, 0);

export const selectCartDiscount = (state: RootState) => 0;

export const selectCartTotal = (state: RootState) =>
  selectCartSubtotal(state) - selectCartDiscount(state);

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id);

export const selectIsCartEmpty = (state: RootState) =>
  state.cart.items.length === 0;

export const selectCartError = (state: RootState) => state.cart.error;

export const selectCartLoading = (state: RootState) => state.cart.isLoading;

export const selectIsInCart =
  (productId: string, variantId: string | null) => (state: RootState) => {
    const cartItemId = `${productId}:${variantId}`;
    return state.cart.items.some((item) => item.id === cartItemId);
  };

export const selectCartItemQuantity =
  (productId: string, variantId: string | null) => (state: RootState) => {
    const cartItemId = `${productId}:${variantId}`;
    const item = state.cart.items.find((item) => item.id === cartItemId);
    return item?.quantity || 0;
  };

export const selectCartItemAllQuantity =
  (productId: string) => (state: RootState) => {
    return state.cart.items
      .filter((item) => item.productId === productId)
      .reduce((sum, item) => sum + item.quantity, 0);
  };


export const {
  addToCart,
  updateCartItemQuantity,
  incrementCartItem,
  decrementCartItem,
  removeFromCart,
  clearCart,
  setError,
} = slice.actions;

export default slice.reducer;
