// components/products/ProductBreadcrumb.tsx
import Link from "next/link";

interface ProductBreadcrumbProps {
  categoryName: string;
  categorySlug: string;
  productName: string;
}

export default function ProductBreadcrumb({
  categoryName,
  categorySlug,
  productName,
}: ProductBreadcrumbProps) {
  return (
    <nav
      className="flex items-center space-x-2 text-sm text-gray-600 mb-6"
      aria-label="Breadcrumb"
    >
      <Link
        href="/"
        className="hover:text-gray-900 transition-colors"
      >
        Home
      </Link>
      <span>/</span>
      <Link
        href="/products"
        className="hover:text-gray-900 transition-colors"
      >
        Products
      </Link>
      <span>/</span>
      <Link
        href={`/products?category=${categorySlug}`}
        className="hover:text-gray-900 transition-colors"
      >
        {categoryName}
      </Link>
      <span>/</span>
      <span className="text-gray-900 font-medium">{productName}</span>
    </nav>
  );
}