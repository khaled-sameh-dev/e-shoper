// ============================================================================
// ENUMS
// ============================================================================

export enum UserRole {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
}

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

export enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
  FIXED = "FIXED",
}

// ============================================================================
// BASE MODELS (Matches Prisma Schema)
// ============================================================================

export interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string | null;
  image: string | null;
  phone: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string | null;
  postalCode: string | null;
  country: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  mainImage: string;
  images: string[];
  price: number;
  discountAmount: number | null;
  isActive: boolean;
  isFeatured: boolean;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariant {
  id: string;
  productId: string;
  size: string | null;
  color: string | null;
  stock: number;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
}

export interface ProductTag {
  productId: string;
  tagId: string;
  createdAt: Date;
}

export interface Sale {
  id: string;
  discountType: DiscountType;
  discountValue: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  addressId: string;
  status: OrderStatus;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  stripeSessionId: string | null;
  stripePaymentIntentId: string | null;
  saleId: string | null;
  createdAt: Date;
  updatedAt: Date;
  paidAt: Date | null;
  shippedAt: Date | null;
  deliveredAt: Date | null;
  cancelledAt: Date | null;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string | null;
  quantity: number;
  price: number;
  total: number;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title: string | null;
  comment: string;
  images: string[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  variantId: string | null;
  createdAt: Date;
}

export interface CartItem {
  id?: string;
  userId?: string;
  productId: string;
  variantId: string | null;
  quantity: number;
  attributes?: {
    color: string | null;
    size: string | null;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

// ============================================================================
// EXTENDED TYPES WITH RELATIONS
// ============================================================================

export interface ProductWithRelations extends Product {
  category: Category;
  tags: (ProductTag & { tag: Tag })[];
  variants: ProductVariant[];
  reviews: Review[];
}

export interface ProductWithCategory extends Product {
  category: Category;
}

export interface ProductWithVariants extends Product {
  variants: ProductVariant[];
}

export interface OrderWithRelations extends Order {
  user: User;
  address: Address;
  items: (OrderItem & {
    product: Product;
    variant: ProductVariant | null;
  })[];
  sale: Sale | null;
}

export interface CartItemWithRelations extends CartItem {
  product: Product;
  variant: ProductVariant | null;
}

export interface WishlistItemWithProduct extends WishlistItem {
  product: Product;
}

export interface ReviewWithUser extends Review {
  user: Pick<User, "name" | "image">;
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

export interface AddToCartRequest {
  productId: string;
  variantId?: string;
  quantity?: number;
}

export interface UpdateCartRequest {
  cartItemId: string;
  quantity: number;
}

export interface CartSummary {
  items: CartItemWithRelations[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  itemCount: number;
}

export interface CreateOrderRequest {
  addressId: string;
  items: {
    productId: string;
    variantId?: string;
    quantity: number;
  }[];
  saleId?: string;
}

export interface CreateReviewRequest {
  productId: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export interface CreateAddressRequest {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  isDefault?: boolean;
}

export interface CreateProductRequest {
  name: string;
  slug: string;
  description: string;
  mainImage: string;
  images?: string[];
  price: number;
  discountAmount?: number;
  categoryId: string;
  isActive?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  variants?: {
    size?: string;
    color?: string;
    stock: number;
    image?: string;
  }[];
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    hasMore: boolean;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  message?: string;
  details?: any;
}

export interface Filters {
  categories?: string[];
  tags?: string[];
  sizes?: string[];
  colors?: string[];
  priceRange?: [number, number];
}

export interface CheckoutFormData {
  email: string;
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  billingAddress?: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  useSameAddress: boolean;
  shippingMethod: "standard" | "express" | "overnight";
}

export interface CheckoutSession {
  id: string;
  url: string;
  customer_email: string;
  amount_total: number;
  currency: string;
}
