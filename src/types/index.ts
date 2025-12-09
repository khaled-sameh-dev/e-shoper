import { Decimal } from "@prisma/client/runtime/client";

export interface PineconeMatch {
  id: string;
  score: number;
  metadata: Record<string, any>;
}

export interface PineconeQueryResponse {
  matches: PineconeMatch[];
  nextPageToken?: string;
}

export interface SearchResponse {
  success: boolean;
  query: string;
  page: number;
  pageSize: number;
  totalMatches: number;
  totalPages: number;
  hasMore: boolean;
  products: Product[];
  filters?: any;
}

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
// BASE MODELS (Prisma Database Types - with Decimal)
// ============================================================================

export interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string | null;
  image: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  userId: string;
  clerkId: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  postalCode: string;
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
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Database Product type (with Prisma Decimal)
export interface ProductDB {
  id: string;
  name: string;
  slug: string;
  description: string;
  mainImage: string;
  images: string[];
  price: Decimal;
  comparePrice: Decimal | null;
  cost: Decimal | null;
  sku: string | null;
  barcode: string | null;
  stock: number;
  lowStockAlert: number;
  isActive: boolean;
  isFeatured: boolean;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Frontend Product type (with number for prices)
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  mainImage: string;
  images: string[];
  price: number;
  comparePrice: number | null;
  cost: number | null;
  sku: string | null;
  barcode: string | null;
  stock: number;
  lowStockAlert: number;
  isActive: boolean;
  isFeatured: boolean;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Database ProductVariant type (with Prisma Decimal)
export interface ProductVariantDB {
  id: string;
  productId: string;
  size: string | null;
  color: string | null;
  sku: string | null;
  stock: number;
  price: Decimal | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Frontend ProductVariant type (with number)
export interface ProductVariant {
  id: string;
  productId: string;
  size: string | null;
  color: string | null;
  sku: string | null;
  stock: number;
  price: number | null;
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

// Database Sale type (with Prisma Decimal)
export interface SaleDB {
  id: string;
  name: string;
  description: string | null;
  discountType: DiscountType;
  discountValue: Decimal;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  code: string | null;
  minPurchase: Decimal | null;
  maxDiscount: Decimal | null;
  usageLimit: number | null;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Frontend Sale type (with number)
export interface Sale {
  id: string;
  name: string;
  description: string | null;
  discountType: DiscountType;
  discountValue: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  code: string | null;
  minPurchase: number | null;
  maxDiscount: number | null;
  usageLimit: number | null;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Database Order type (with Prisma Decimal)
export interface OrderDB {
  id: string;
  orderNumber: string;
  userId: string;
  clerkId: string;
  addressId: string | null;
  status: OrderStatus;
  stripeSessionId: string | null;
  stripePaymentIntentId: string | null;
  subtotal: Decimal;
  discount: Decimal;
  shippingCost: Decimal;
  tax: Decimal;
  total: Decimal;
  currency: string;
  saleId: string | null;
  couponCode: string | null;
  shippingMethod: string | null;
  trackingNumber: string | null;
  customerNote: string | null;
  adminNote: string | null;
  createdAt: Date;
  updatedAt: Date;
  paidAt: Date | null;
  shippedAt: Date | null;
  deliveredAt: Date | null;
  cancelledAt: Date | null;
}

// Frontend Order type (with number)
export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  clerkId: string;
  addressId: string | null;
  status: OrderStatus;
  stripeSessionId: string | null;
  stripePaymentIntentId: string | null;
  subtotal: number;
  discount: number;
  shippingCost: number;
  tax: number;
  total: number;
  currency: string;
  saleId: string | null;
  couponCode: string | null;
  shippingMethod: string | null;
  trackingNumber: string | null;
  customerNote: string | null;
  adminNote: string | null;
  createdAt: Date;
  updatedAt: Date;
  paidAt: Date | null;
  shippedAt: Date | null;
  deliveredAt: Date | null;
  cancelledAt: Date | null;
}

// Database OrderItem type (with Prisma Decimal)
export interface OrderItemDB {
  id: string;
  orderId: string;
  productId: string;
  variantId: string | null;
  quantity: number;
  price: Decimal;
  total: Decimal;
}

// Frontend OrderItem type (with number)
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
  clerkId: string;
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
  clerkId: string;
  productId: string;
  createdAt: Date;
}

export interface CartItem {
  id: string;
  userId: string;
  clerkId: string;
  productId: string;
  variantId: string | null;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
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

export interface CategoryWithChildren extends Category {
  children: Category[];
}

export interface CategoryWithProducts extends Category {
  products: Product[];
}

export interface OrderWithRelations extends Order {
  user: User;
  address: Address | null;
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

export interface ProductWithExtras extends Product {
  variants: ProductVariant[];
  tags: string[];
  colors: string[];
  sizes: string[];
  category?: Category;
}

// ============================================================================
// CONVERSION UTILITIES - Convert Prisma Decimal to number
// ============================================================================

/**
 * Converts a Prisma product (with Decimal) to frontend Product type (with number)
 */
export function convertProduct(dbProduct: ProductDB): Product {
  return {
    ...dbProduct,
    price: Number(dbProduct.price),
    comparePrice: dbProduct.comparePrice
      ? Number(dbProduct.comparePrice)
      : null,
    cost: dbProduct.cost ? Number(dbProduct.cost) : null,
  };
}

/**
 * Converts a Prisma product variant (with Decimal) to frontend type (with number)
 */
export function convertProductVariant(
  dbVariant: ProductVariantDB
): ProductVariant {
  return {
    ...dbVariant,
    price: dbVariant.price ? Number(dbVariant.price) : null,
  };
}

/**
 * Converts a Prisma sale (with Decimal) to frontend type (with number)
 */
export function convertSale(dbSale: SaleDB): Sale {
  return {
    ...dbSale,
    discountValue: Number(dbSale.discountValue),
    minPurchase: dbSale.minPurchase ? Number(dbSale.minPurchase) : null,
    maxDiscount: dbSale.maxDiscount ? Number(dbSale.maxDiscount) : null,
  };
}

/**
 * Converts a Prisma order (with Decimal) to frontend type (with number)
 */
export function convertOrder(dbOrder: OrderDB): Order {
  return {
    ...dbOrder,
    subtotal: Number(dbOrder.subtotal),
    discount: Number(dbOrder.discount),
    shippingCost: Number(dbOrder.shippingCost),
    tax: Number(dbOrder.tax),
    total: Number(dbOrder.total),
  };
}

/**
 * Converts a Prisma order item (with Decimal) to frontend type (with number)
 */
export function convertOrderItem(dbItem: OrderItemDB): OrderItem {
  return {
    ...dbItem,
    price: Number(dbItem.price),
    total: Number(dbItem.total),
  };
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

// Search Types
export interface SearchFilters {
  categorySlug?: string;
  categoryName?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  sizes?: string[];
  colors?: string[];
  isFeatured?: boolean;
  isActive?: boolean;
}

export interface SearchRequest {
  query: string;
  page?: number;
  pageSize?: number;
  filters?: SearchFilters;
}

export interface SearchResult {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  mainImage: string;
  categoryName: string;
  categorySlug: string;
  tags: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  isFeatured: boolean;
  score: number;
  similarity: number;
}

// Product Types
export interface ProductListItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  mainImage: string;
  category: string;
  isFeatured: boolean;
  stock: number;
  rating?: number;
  reviewCount?: number;
}

export interface ProductDetail extends ProductListItem {
  description: string;
  images: string[];
  sku?: string;
  tags: string[];
  variants: ProductVariant[];
  reviews: ReviewWithUser[];
}

// Cart Types
export interface CartItemData {
  productId: string;
  variantId?: string;
  quantity: number;
}

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
  shipping: number;
  discount: number;
  total: number;
  itemCount: number;
}

// Order Types
export interface CreateOrderRequest {
  addressId: string;
  items: {
    productId: string;
    variantId?: string;
    quantity: number;
  }[];
  couponCode?: string;
  shippingMethod?: string;
  customerNote?: string;
}

export interface OrderSummary {
  orderNumber: string;
  status: OrderStatus;
  total: number;
  createdAt: Date;
  itemCount: number;
}

// Checkout Types
export interface CheckoutSession {
  sessionId: string;
  orderId: string;
  amount: number;
  currency: string;
}

// Review Types
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

// Address Types
export interface CreateAddressRequest {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

// Admin Types
export interface CreateProductRequest {
  name: string;
  slug: string;
  description: string;
  mainImage: string;
  images?: string[];
  price: number;
  comparePrice?: number;
  cost?: number;
  sku?: string;
  barcode?: string;
  stock: number;
  categoryId: string;
  isActive?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  variants?: {
    size?: string;
    color?: string;
    sku?: string;
    stock: number;
    price?: number;
    image?: string;
  }[];
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  revenueChange: number;
  ordersChange: number;
  customersChange: number;
  productsChange: number;
  recentOrders: OrderSummary[];
  topProducts: ProductListItem[];
  lowStockProducts: ProductListItem[];
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

// ============================================================================
// FORM TYPES
// ============================================================================

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  name: string;
}

export interface CheckoutFormData {
  email: string;
  shippingAddress: CreateAddressRequest;
  billingAddress?: CreateAddressRequest;
  useSameAddress: boolean;
  shippingMethod: string;
  paymentMethod: string;
}

export interface ProductFilterFormData {
  categories?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  sizes?: string[];
  colors?: string[];
  tags?: string[];
  inStock?: boolean;
  onSale?: boolean;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface ToastNotification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
}

export interface ModalState {
  isOpen: boolean;
  type?: "cart" | "wishlist" | "quickView" | "auth";
  data?: any;
}
