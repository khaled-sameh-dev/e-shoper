import { ProductVariant } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const convertProductVariant = (variant: any): ProductVariant => ({
  ...variant,
  stock: variant.stock || 0,
});

export const getSearchTerm = (searchParams: { [key: string]: string | string[] | undefined }) =>{
  const searchTerm = searchParams?.query;

  if (typeof searchTerm !== 'string') return '';

  return searchTerm.trim()
}