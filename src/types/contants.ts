import { OrderStatus } from ".";

export const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
export const MAIN_COLORS = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF", border: true },
  { name: "Beige", value: "#F5F5DC" },
  { name: "Gray", value: "#808080" },
  { name: "Blue", value: "#2A4DD0" },
  { name: "Brown", value: "#8B4513" },
];

export const PRODUCT_SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "rating", label: "Highest Rated" },
] as const;

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: "Pending",
  [OrderStatus.PROCESSING]: "Processing",
  [OrderStatus.SHIPPED]: "Shipped",
  [OrderStatus.DELIVERED]: "Delivered",
  [OrderStatus.CANCELLED]: "Cancelled",
  [OrderStatus.REFUNDED]: "Refunded",
};

export const SHIPPING_METHODS = [
  { id: "standard", name: "Standard Shipping", price: 5.99, days: "5-7" },
  { id: "express", name: "Express Shipping", price: 12.99, days: "2-3" },
  { id: "overnight", name: "Overnight Shipping", price: 24.99, days: "1" },
] as const;
