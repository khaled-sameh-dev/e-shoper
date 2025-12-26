import { DiscountType, UserRole } from "@/generated/prisma/enums";
import { prisma } from "@/lib/db/prisma";

async function main() {
  console.log("Starting seed...");

  // Clear existing data
  await prisma.cartItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.productTag.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const admin = await prisma.user.create({
    data: {
      clerkId: "clerk_admin_123",
      email: "admin@fashionstore.com",
      name: "Admin User",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      phone: "+1234567890",
      role: UserRole.ADMIN,
    },
  });

  const customer1 = await prisma.user.create({
    data: {
      clerkId: "clerk_customer_456",
      email: "john.doe@example.com",
      name: "John Doe",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      phone: "+1234567891",
      role: UserRole.CUSTOMER,
    },
  });

  const customer2 = await prisma.user.create({
    data: {
      clerkId: "clerk_customer_789",
      email: "jane.smith@example.com",
      name: "Jane Smith",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      phone: "+1234567892",
      role: UserRole.CUSTOMER,
    },
  });

  // Create Categories
  const mensClothing = await prisma.category.create({
    data: {
      name: "Men's Clothing",
      slug: "mens-clothing",
      description: "Stylish and comfortable clothing for men",
      image:
        "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800",
    },
  });

  const womensClothing = await prisma.category.create({
    data: {
      name: "Women's Clothing",
      slug: "womens-clothing",
      description: "Trendy fashion for modern women",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
    },
  });

  const accessories = await prisma.category.create({
    data: {
      name: "Accessories",
      slug: "accessories",
      description: "Complete your look with our accessories",
      image:
        "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=800",
    },
  });

  const shoes = await prisma.category.create({
    data: {
      name: "Shoes",
      slug: "shoes",
      description: "Footwear for every occasion",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
    },
  });

  const activewear = await prisma.category.create({
    data: {
      name: "Activewear",
      slug: "activewear",
      description: "Performance clothing for your active lifestyle",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
    },
  });

  const outerwear = await prisma.category.create({
    data: {
      name: "Outerwear",
      slug: "outerwear",
      description: "Jackets, coats, and more to keep you warm",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
    },
  });

  // Create Tags
  const newTag = await prisma.tag.create({
    data: { name: "New Arrival", slug: "new-arrival" },
  });

  const saleTag = await prisma.tag.create({
    data: { name: "On Sale", slug: "on-sale" },
  });

  const bestsellerTag = await prisma.tag.create({
    data: { name: "Bestseller", slug: "bestseller" },
  });

  const premiumTag = await prisma.tag.create({
    data: { name: "Premium", slug: "premium" },
  });

  const sustainableTag = await prisma.tag.create({
    data: { name: "Sustainable", slug: "sustainable" },
  });

  // Create Sale
  const summerSale = await prisma.sale.create({
    data: {
      discountType: DiscountType.PERCENTAGE,
      discountValue: 20,
      startDate: new Date("2024-06-01"),
      endDate: new Date("2024-08-31"),
      isActive: true,
    },
  });

  // Men's Clothing Products (5 products)
  const mensShirt1 = await prisma.product.create({
    data: {
      name: "Classic Oxford Shirt",
      slug: "classic-oxford-shirt",
      description:
        "Timeless oxford shirt crafted from premium cotton. Features a button-down collar and long sleeves. Perfect for both casual and formal occasions.",
      mainImage:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800",
      images: [
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800",
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
      ],
      price: 79.99,
      discountAmount: 15.99,
      isActive: true,
      isFeatured: true,
      categoryId: mensClothing.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: mensShirt1.id, size: "S", color: "White", stock: 15 },
      { productId: mensShirt1.id, size: "M", color: "White", stock: 20 },
      { productId: mensShirt1.id, size: "L", color: "White", stock: 18 },
      { productId: mensShirt1.id, size: "XL", color: "White", stock: 12 },
      { productId: mensShirt1.id, size: "S", color: "Blue", stock: 10 },
      { productId: mensShirt1.id, size: "M", color: "Blue", stock: 15 },
      { productId: mensShirt1.id, size: "L", color: "Blue", stock: 14 },
      { productId: mensShirt1.id, size: "XL", color: "Blue", stock: 8 },
    ],
  });

  await prisma.productTag.createMany({
    data: [
      { productId: mensShirt1.id, tagId: bestsellerTag.id },
      { productId: mensShirt1.id, tagId: premiumTag.id },
    ],
  });

  const mensJeans = await prisma.product.create({
    data: {
      name: "Slim Fit Denim Jeans",
      slug: "slim-fit-denim-jeans",
      description:
        "Modern slim fit jeans with stretch comfort. Made from premium denim with a classic five-pocket design. Perfect everyday wear.",
      mainImage:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800",
      images: [
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800",
        "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800",
      ],
      price: 89.99,
      isActive: true,
      isFeatured: true,
      categoryId: mensClothing.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: mensJeans.id, size: "30", color: "Dark Blue", stock: 12 },
      { productId: mensJeans.id, size: "32", color: "Dark Blue", stock: 18 },
      { productId: mensJeans.id, size: "34", color: "Dark Blue", stock: 15 },
      { productId: mensJeans.id, size: "36", color: "Dark Blue", stock: 10 },
      { productId: mensJeans.id, size: "30", color: "Black", stock: 8 },
      { productId: mensJeans.id, size: "32", color: "Black", stock: 12 },
      { productId: mensJeans.id, size: "34", color: "Black", stock: 14 },
    ],
  });

  await prisma.productTag.create({
    data: { productId: mensJeans.id, tagId: bestsellerTag.id },
  });

  const mensTshirt = await prisma.product.create({
    data: {
      name: "Premium Cotton T-Shirt",
      slug: "premium-cotton-tshirt",
      description:
        "Soft and breathable 100% organic cotton t-shirt. Classic crew neck design with a comfortable regular fit. Available in multiple colors.",
      mainImage:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800",
      ],
      price: 29.99,
      discountAmount: 5.0,
      isActive: true,
      isFeatured: false,
      categoryId: mensClothing.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: mensTshirt.id, size: "S", color: "White", stock: 25 },
      { productId: mensTshirt.id, size: "M", color: "White", stock: 30 },
      { productId: mensTshirt.id, size: "L", color: "White", stock: 28 },
      { productId: mensTshirt.id, size: "XL", color: "White", stock: 20 },
      { productId: mensTshirt.id, size: "S", color: "Black", stock: 22 },
      { productId: mensTshirt.id, size: "M", color: "Black", stock: 28 },
      { productId: mensTshirt.id, size: "L", color: "Black", stock: 25 },
      { productId: mensTshirt.id, size: "XL", color: "Black", stock: 18 },
      { productId: mensTshirt.id, size: "M", color: "Navy", stock: 20 },
      { productId: mensTshirt.id, size: "L", color: "Navy", stock: 22 },
    ],
  });

  await prisma.productTag.createMany({
    data: [
      { productId: mensTshirt.id, tagId: sustainableTag.id },
      { productId: mensTshirt.id, tagId: saleTag.id },
    ],
  });

  const mensChinos = await prisma.product.create({
    data: {
      name: "Tailored Chino Pants",
      slug: "tailored-chino-pants",
      description:
        "Versatile chino pants with a tailored fit. Made from stretch cotton twill for comfort and style. Perfect for smart-casual occasions.",
      mainImage:
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800",
      images: [
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800",
      ],
      price: 69.99,
      isActive: true,
      isFeatured: false,
      categoryId: mensClothing.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: mensChinos.id, size: "30", color: "Khaki", stock: 15 },
      { productId: mensChinos.id, size: "32", color: "Khaki", stock: 20 },
      { productId: mensChinos.id, size: "34", color: "Khaki", stock: 18 },
      { productId: mensChinos.id, size: "36", color: "Khaki", stock: 12 },
      { productId: mensChinos.id, size: "32", color: "Navy", stock: 16 },
      { productId: mensChinos.id, size: "34", color: "Navy", stock: 14 },
    ],
  });

  const mensPolo = await prisma.product.create({
    data: {
      name: "Classic Polo Shirt",
      slug: "classic-polo-shirt",
      description:
        "Timeless polo shirt in pique cotton. Features a ribbed collar and cuffs with a two-button placket. Ideal for casual sophistication.",
      mainImage:
        "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800",
      images: [
        "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800",
      ],
      price: 49.99,
      isActive: true,
      isFeatured: false,
      categoryId: mensClothing.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: mensPolo.id, size: "S", color: "Navy", stock: 18 },
      { productId: mensPolo.id, size: "M", color: "Navy", stock: 22 },
      { productId: mensPolo.id, size: "L", color: "Navy", stock: 20 },
      { productId: mensPolo.id, size: "XL", color: "Navy", stock: 15 },
      { productId: mensPolo.id, size: "M", color: "White", stock: 18 },
      { productId: mensPolo.id, size: "L", color: "White", stock: 16 },
    ],
  });

  // Women's Clothing Products (5 products)
  const womensDress = await prisma.product.create({
    data: {
      name: "Floral Summer Dress",
      slug: "floral-summer-dress",
      description:
        "Beautiful flowy dress with floral print. Features a flattering A-line silhouette and adjustable straps. Perfect for summer events.",
      mainImage:
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
      images: [
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
      ],
      price: 89.99,
      discountAmount: 20.0,
      isActive: true,
      isFeatured: true,
      categoryId: womensClothing.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      {
        productId: womensDress.id,
        size: "XS",
        color: "Floral Blue",
        stock: 12,
      },
      { productId: womensDress.id, size: "S", color: "Floral Blue", stock: 18 },
      { productId: womensDress.id, size: "M", color: "Floral Blue", stock: 20 },
      { productId: womensDress.id, size: "L", color: "Floral Blue", stock: 15 },
      {
        productId: womensDress.id,
        size: "XL",
        color: "Floral Blue",
        stock: 10,
      },
    ],
  });

  await prisma.productTag.createMany({
    data: [
      { productId: womensDress.id, tagId: newTag.id },
      { productId: womensDress.id, tagId: saleTag.id },
    ],
  });

  const womensBlouse = await prisma.product.create({
    data: {
      name: "Silk Blend Blouse",
      slug: "silk-blend-blouse",
      description:
        "Elegant silk blend blouse with a relaxed fit. Features button-front closure and long sleeves. Perfect for office or evening wear.",
      mainImage:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800",
      images: [
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800",
      ],
      price: 79.99,
      isActive: true,
      isFeatured: true,
      categoryId: womensClothing.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: womensBlouse.id, size: "XS", color: "Cream", stock: 10 },
      { productId: womensBlouse.id, size: "S", color: "Cream", stock: 15 },
      { productId: womensBlouse.id, size: "M", color: "Cream", stock: 18 },
      { productId: womensBlouse.id, size: "L", color: "Cream", stock: 12 },
      { productId: womensBlouse.id, size: "S", color: "Black", stock: 14 },
      { productId: womensBlouse.id, size: "M", color: "Black", stock: 16 },
      { productId: womensBlouse.id, size: "L", color: "Black", stock: 10 },
    ],
  });

  await prisma.productTag.create({
    data: { productId: womensBlouse.id, tagId: premiumTag.id },
  });

  const womensJeans = await prisma.product.create({
    data: {
      name: "High-Waisted Skinny Jeans",
      slug: "high-waisted-skinny-jeans",
      description:
        "Flattering high-waisted jeans with a skinny fit. Made from stretch denim for ultimate comfort. A wardrobe essential.",
      mainImage:
        "https://images.unsplash.com/photo-1541840031508-326b77c9a17e?w=800",
      images: [
        "https://images.unsplash.com/photo-1541840031508-326b77c9a17e?w=800",
      ],
      price: 79.99,
      isActive: true,
      isFeatured: false,
      categoryId: womensClothing.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: womensJeans.id, size: "25", color: "Dark Wash", stock: 12 },
      { productId: womensJeans.id, size: "26", color: "Dark Wash", stock: 16 },
      { productId: womensJeans.id, size: "27", color: "Dark Wash", stock: 18 },
      { productId: womensJeans.id, size: "28", color: "Dark Wash", stock: 15 },
      { productId: womensJeans.id, size: "29", color: "Dark Wash", stock: 12 },
      { productId: womensJeans.id, size: "30", color: "Dark Wash", stock: 10 },
    ],
  });

  await prisma.productTag.create({
    data: { productId: womensJeans.id, tagId: bestsellerTag.id },
  });

  const womensCardigan = await prisma.product.create({
    data: {
      name: "Cozy Knit Cardigan",
      slug: "cozy-knit-cardigan",
      description:
        "Soft and comfortable knit cardigan. Features an open-front design with ribbed cuffs. Perfect layering piece for any season.",
      mainImage:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
      images: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
      ],
      price: 59.99,
      isActive: true,
      isFeatured: false,
      categoryId: womensClothing.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: womensCardigan.id, size: "S", color: "Beige", stock: 14 },
      { productId: womensCardigan.id, size: "M", color: "Beige", stock: 18 },
      { productId: womensCardigan.id, size: "L", color: "Beige", stock: 15 },
      { productId: womensCardigan.id, size: "S", color: "Gray", stock: 12 },
      { productId: womensCardigan.id, size: "M", color: "Gray", stock: 16 },
    ],
  });

  const womensSkirt = await prisma.product.create({
    data: {
      name: "Pleated Midi Skirt",
      slug: "pleated-midi-skirt",
      description:
        "Elegant pleated midi skirt with a flowy silhouette. Features an elastic waistband for comfort. Versatile and stylish.",
      mainImage:
        "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800",
      images: [
        "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800",
      ],
      price: 64.99,
      isActive: true,
      isFeatured: false,
      categoryId: womensClothing.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: womensSkirt.id, size: "XS", color: "Black", stock: 10 },
      { productId: womensSkirt.id, size: "S", color: "Black", stock: 15 },
      { productId: womensSkirt.id, size: "M", color: "Black", stock: 18 },
      { productId: womensSkirt.id, size: "L", color: "Black", stock: 12 },
      { productId: womensSkirt.id, size: "S", color: "Navy", stock: 12 },
      { productId: womensSkirt.id, size: "M", color: "Navy", stock: 14 },
    ],
  });

  // Accessories Products (5 products)
  const leatherBelt = await prisma.product.create({
    data: {
      name: "Genuine Leather Belt",
      slug: "genuine-leather-belt",
      description:
        "Premium full-grain leather belt with classic silver buckle. Durable and timeless accessory for any outfit.",
      mainImage:
        "https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=800",
      images: [
        "https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=800",
      ],
      price: 39.99,
      isActive: true,
      isFeatured: false,
      categoryId: accessories.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: leatherBelt.id, size: "S", color: "Brown", stock: 20 },
      { productId: leatherBelt.id, size: "M", color: "Brown", stock: 25 },
      { productId: leatherBelt.id, size: "L", color: "Brown", stock: 22 },
      { productId: leatherBelt.id, size: "XL", color: "Brown", stock: 18 },
      { productId: leatherBelt.id, size: "M", color: "Black", stock: 24 },
      { productId: leatherBelt.id, size: "L", color: "Black", stock: 20 },
    ],
  });

  const scarf = await prisma.product.create({
    data: {
      name: "Cashmere Blend Scarf",
      slug: "cashmere-blend-scarf",
      description:
        "Luxuriously soft cashmere blend scarf. Lightweight yet warm, perfect for layering. Available in classic colors.",
      mainImage:
        "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800",
      images: [
        "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800",
      ],
      price: 69.99,
      discountAmount: 10.0,
      isActive: true,
      isFeatured: true,
      categoryId: accessories.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: scarf.id, size: "One Size", color: "Gray", stock: 15 },
      { productId: scarf.id, size: "One Size", color: "Camel", stock: 18 },
      { productId: scarf.id, size: "One Size", color: "Navy", stock: 12 },
      { productId: scarf.id, size: "One Size", color: "Burgundy", stock: 10 },
    ],
  });

  await prisma.productTag.createMany({
    data: [
      { productId: scarf.id, tagId: premiumTag.id },
      { productId: scarf.id, tagId: saleTag.id },
    ],
  });

  const wallet = await prisma.product.create({
    data: {
      name: "Minimalist Leather Wallet",
      slug: "minimalist-leather-wallet",
      description:
        "Sleek minimalist wallet crafted from genuine leather. Features card slots and a bill compartment. Compact and functional.",
      mainImage:
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800",
      images: [
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800",
      ],
      price: 49.99,
      isActive: true,
      isFeatured: false,
      categoryId: accessories.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: wallet.id, size: "One Size", color: "Black", stock: 25 },
      { productId: wallet.id, size: "One Size", color: "Brown", stock: 22 },
      { productId: wallet.id, size: "One Size", color: "Tan", stock: 18 },
    ],
  });

  const sunglasses = await prisma.product.create({
    data: {
      name: "Classic Aviator Sunglasses",
      slug: "classic-aviator-sunglasses",
      description:
        "Iconic aviator sunglasses with UV protection. Metal frame with high-quality lenses. Timeless style that never goes out of fashion.",
      mainImage:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
      images: [
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
      ],
      price: 89.99,
      isActive: true,
      isFeatured: true,
      categoryId: accessories.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      {
        productId: sunglasses.id,
        size: "One Size",
        color: "Gold/Green",
        stock: 20,
      },
      {
        productId: sunglasses.id,
        size: "One Size",
        color: "Silver/Gray",
        stock: 18,
      },
      {
        productId: sunglasses.id,
        size: "One Size",
        color: "Black/Black",
        stock: 22,
      },
    ],
  });

  await prisma.productTag.create({
    data: { productId: sunglasses.id, tagId: bestsellerTag.id },
  });

  const handbag = await prisma.product.create({
    data: {
      name: "Structured Leather Handbag",
      slug: "structured-leather-handbag",
      description:
        "Elegant structured handbag in premium leather. Features multiple compartments and adjustable strap. Perfect for everyday use.",
      mainImage:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
      images: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
      ],
      price: 149.99,
      isActive: true,
      isFeatured: true,
      categoryId: accessories.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: handbag.id, size: "One Size", color: "Black", stock: 12 },
      { productId: handbag.id, size: "One Size", color: "Tan", stock: 10 },
      { productId: handbag.id, size: "One Size", color: "Burgundy", stock: 8 },
    ],
  });

  await prisma.productTag.create({
    data: { productId: handbag.id, tagId: premiumTag.id },
  });

  // Shoes Products (5 products)
  const sneakers = await prisma.product.create({
    data: {
      name: "Classic White Sneakers",
      slug: "classic-white-sneakers",
      description:
        "Versatile white leather sneakers with a minimalist design. Comfortable cushioned sole and premium materials. Essential wardrobe staple.",
      mainImage:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
      images: [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800",
      ],
      price: 99.99,
      isActive: true,
      isFeatured: true,
      categoryId: shoes.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: sneakers.id, size: "7", color: "White", stock: 15 },
      { productId: sneakers.id, size: "8", color: "White", stock: 20 },
      { productId: sneakers.id, size: "9", color: "White", stock: 22 },
      { productId: sneakers.id, size: "10", color: "White", stock: 18 },
      { productId: sneakers.id, size: "11", color: "White", stock: 14 },
      { productId: sneakers.id, size: "12", color: "White", stock: 10 },
    ],
  });

  await prisma.productTag.create({
    data: { productId: sneakers.id, tagId: bestsellerTag.id },
  });

  const boots = await prisma.product.create({
    data: {
      name: "Chelsea Leather Boots",
      slug: "chelsea-leather-boots",
      description:
        "Classic Chelsea boots in premium leather. Features elastic side panels and pull tabs. Timeless footwear for any season.",
      mainImage:
        "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800",
      images: [
        "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800",
      ],
      price: 159.99,
      discountAmount: 30.0,
      isActive: true,
      isFeatured: true,
      categoryId: shoes.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: boots.id, size: "7", color: "Brown", stock: 10 },
      { productId: boots.id, size: "8", color: "Brown", stock: 12 },
      { productId: boots.id, size: "9", color: "Brown", stock: 14 },
      { productId: boots.id, size: "10", color: "Brown", stock: 12 },
      { productId: boots.id, size: "11", color: "Brown", stock: 8 },
      { productId: boots.id, size: "8", color: "Black", stock: 10 },
      { productId: boots.id, size: "9", color: "Black", stock: 12 },
      { productId: boots.id, size: "10", color: "Black", stock: 10 },
    ],
  });

  await prisma.productTag.createMany({
    data: [
      { productId: boots.id, tagId: premiumTag.id },
      { productId: boots.id, tagId: saleTag.id },
    ],
  });

  const loafers = await prisma.product.create({
    data: {
      name: "Suede Penny Loafers",
      slug: "suede-penny-loafers",
      description:
        "Sophisticated penny loafers in soft suede. Features a classic silhouette with modern comfort. Perfect for smart-casual occasions.",
      mainImage:
        "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800",
      images: [
        "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800",
      ],
      price: 119.99,
      isActive: true,
      isFeatured: false,
      categoryId: shoes.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: loafers.id, size: "7", color: "Navy", stock: 12 },
      { productId: loafers.id, size: "8", color: "Navy", stock: 15 },
      { productId: loafers.id, size: "9", color: "Navy", stock: 14 },
      { productId: loafers.id, size: "10", color: "Navy", stock: 10 },
      { productId: loafers.id, size: "8", color: "Tan", stock: 12 },
      { productId: loafers.id, size: "9", color: "Tan", stock: 13 },
    ],
  });

  const heels = await prisma.product.create({
    data: {
      name: "Block Heel Pumps",
      slug: "block-heel-pumps",
      description:
        "Elegant block heel pumps with pointed toe. Comfortable heel height perfect for all-day wear. Versatile and sophisticated.",
      mainImage:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800",
      images: [
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800",
      ],
      price: 89.99,
      isActive: true,
      isFeatured: false,
      categoryId: shoes.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: heels.id, size: "6", color: "Black", stock: 12 },
      { productId: heels.id, size: "7", color: "Black", stock: 16 },
      { productId: heels.id, size: "8", color: "Black", stock: 18 },
      { productId: heels.id, size: "9", color: "Black", stock: 14 },
      { productId: heels.id, size: "10", color: "Black", stock: 10 },
      { productId: heels.id, size: "7", color: "Nude", stock: 14 },
      { productId: heels.id, size: "8", color: "Nude", stock: 15 },
    ],
  });

  const sandals = await prisma.product.create({
    data: {
      name: "Leather Slide Sandals",
      slug: "leather-slide-sandals",
      description:
        "Comfortable leather slide sandals with cushioned footbed. Perfect for warm weather casual wear. Available in multiple colors.",
      mainImage:
        "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800",
      images: [
        "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800",
      ],
      price: 54.99,
      isActive: true,
      isFeatured: false,
      categoryId: shoes.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: sandals.id, size: "6", color: "Tan", stock: 15 },
      { productId: sandals.id, size: "7", color: "Tan", stock: 18 },
      { productId: sandals.id, size: "8", color: "Tan", stock: 20 },
      { productId: sandals.id, size: "9", color: "Tan", stock: 16 },
      { productId: sandals.id, size: "10", color: "Tan", stock: 12 },
      { productId: sandals.id, size: "7", color: "Black", stock: 16 },
      { productId: sandals.id, size: "8", color: "Black", stock: 18 },
    ],
  });

  // Activewear Products (5 products)
  const yogaPants = await prisma.product.create({
    data: {
      name: "High-Rise Yoga Leggings",
      slug: "high-rise-yoga-leggings",
      description:
        "Performance yoga leggings with moisture-wicking fabric. Four-way stretch and high-rise waistband for support. Perfect for any workout.",
      mainImage:
        "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800",
      images: [
        "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800",
      ],
      price: 64.99,
      isActive: true,
      isFeatured: true,
      categoryId: activewear.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: yogaPants.id, size: "XS", color: "Black", stock: 15 },
      { productId: yogaPants.id, size: "S", color: "Black", stock: 20 },
      { productId: yogaPants.id, size: "M", color: "Black", stock: 22 },
      { productId: yogaPants.id, size: "L", color: "Black", stock: 18 },
      { productId: yogaPants.id, size: "XL", color: "Black", stock: 12 },
      { productId: yogaPants.id, size: "S", color: "Navy", stock: 16 },
      { productId: yogaPants.id, size: "M", color: "Navy", stock: 18 },
    ],
  });

  await prisma.productTag.create({
    data: { productId: yogaPants.id, tagId: bestsellerTag.id },
  });

  const sportsBra = await prisma.product.create({
    data: {
      name: "Performance Sports Bra",
      slug: "performance-sports-bra",
      description:
        "High-support sports bra with breathable mesh panels. Moisture-wicking fabric keeps you dry. Ideal for high-intensity workouts.",
      mainImage:
        "https://images.unsplash.com/photo-1575053029415-816914bbecd0?w=800",
      images: [
        "https://images.unsplash.com/photo-1575053029415-816914bbecd0?w=800",
      ],
      price: 44.99,
      isActive: true,
      isFeatured: false,
      categoryId: activewear.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: sportsBra.id, size: "XS", color: "Black", stock: 14 },
      { productId: sportsBra.id, size: "S", color: "Black", stock: 18 },
      { productId: sportsBra.id, size: "M", color: "Black", stock: 20 },
      { productId: sportsBra.id, size: "L", color: "Black", stock: 16 },
      { productId: sportsBra.id, size: "S", color: "Gray", stock: 15 },
      { productId: sportsBra.id, size: "M", color: "Gray", stock: 17 },
    ],
  });

  const runningShorts = await prisma.product.create({
    data: {
      name: "Lightweight Running Shorts",
      slug: "lightweight-running-shorts",
      description:
        "Breathable running shorts with built-in liner. Quick-dry fabric and reflective details. Perfect for outdoor runs.",
      mainImage:
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800",
      images: [
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800",
      ],
      price: 39.99,
      isActive: true,
      isFeatured: false,
      categoryId: activewear.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: runningShorts.id, size: "S", color: "Black", stock: 18 },
      { productId: runningShorts.id, size: "M", color: "Black", stock: 22 },
      { productId: runningShorts.id, size: "L", color: "Black", stock: 20 },
      { productId: runningShorts.id, size: "XL", color: "Black", stock: 15 },
      { productId: runningShorts.id, size: "M", color: "Navy", stock: 18 },
      { productId: runningShorts.id, size: "L", color: "Navy", stock: 16 },
    ],
  });

  const gymTank = await prisma.product.create({
    data: {
      name: "Muscle Fit Tank Top",
      slug: "muscle-fit-tank-top",
      description:
        "Fitted tank top for training. Moisture-wicking performance fabric with strategic ventilation. Designed for movement.",
      mainImage:
        "https://images.unsplash.com/photo-1622445272461-c6580cab8755?w=800",
      images: [
        "https://images.unsplash.com/photo-1622445272461-c6580cab8755?w=800",
      ],
      price: 29.99,
      isActive: true,
      isFeatured: false,
      categoryId: activewear.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: gymTank.id, size: "S", color: "Black", stock: 20 },
      { productId: gymTank.id, size: "M", color: "Black", stock: 25 },
      { productId: gymTank.id, size: "L", color: "Black", stock: 22 },
      { productId: gymTank.id, size: "XL", color: "Black", stock: 18 },
      { productId: gymTank.id, size: "M", color: "Gray", stock: 20 },
      { productId: gymTank.id, size: "L", color: "Gray", stock: 18 },
    ],
  });

  const trackJacket = await prisma.product.create({
    data: {
      name: "Zip-Up Track Jacket",
      slug: "zip-up-track-jacket",
      description:
        "Classic track jacket with full zip closure. Lightweight and breathable with side pockets. Great for warming up or cooling down.",
      mainImage:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800",
      images: [
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800",
      ],
      price: 74.99,
      isActive: true,
      isFeatured: false,
      categoryId: activewear.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: trackJacket.id, size: "S", color: "Navy", stock: 14 },
      { productId: trackJacket.id, size: "M", color: "Navy", stock: 18 },
      { productId: trackJacket.id, size: "L", color: "Navy", stock: 16 },
      { productId: trackJacket.id, size: "XL", color: "Navy", stock: 12 },
      { productId: trackJacket.id, size: "M", color: "Black", stock: 16 },
      { productId: trackJacket.id, size: "L", color: "Black", stock: 14 },
    ],
  });

  // Outerwear Products (5 products)
  const denimJacket = await prisma.product.create({
    data: {
      name: "Classic Denim Jacket",
      slug: "classic-denim-jacket",
      description:
        "Timeless denim jacket in medium wash. Features button closure and chest pockets. A versatile layering essential.",
      mainImage:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
      ],
      price: 89.99,
      isActive: true,
      isFeatured: true,
      categoryId: outerwear.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: denimJacket.id, size: "S", color: "Medium Wash", stock: 12 },
      { productId: denimJacket.id, size: "M", color: "Medium Wash", stock: 16 },
      { productId: denimJacket.id, size: "L", color: "Medium Wash", stock: 18 },
      {
        productId: denimJacket.id,
        size: "XL",
        color: "Medium Wash",
        stock: 14,
      },
      { productId: denimJacket.id, size: "M", color: "Dark Wash", stock: 14 },
      { productId: denimJacket.id, size: "L", color: "Dark Wash", stock: 15 },
    ],
  });

  await prisma.productTag.create({
    data: { productId: denimJacket.id, tagId: bestsellerTag.id },
  });

  const bomberJacket = await prisma.product.create({
    data: {
      name: "Lightweight Bomber Jacket",
      slug: "lightweight-bomber-jacket",
      description:
        "Modern bomber jacket with ribbed cuffs and hem. Water-resistant outer shell with comfortable lining. Perfect transitional piece.",
      mainImage:
        "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800",
      images: [
        "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800",
      ],
      price: 119.99,
      discountAmount: 20.0,
      isActive: true,
      isFeatured: true,
      categoryId: outerwear.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: bomberJacket.id, size: "S", color: "Olive", stock: 10 },
      { productId: bomberJacket.id, size: "M", color: "Olive", stock: 14 },
      { productId: bomberJacket.id, size: "L", color: "Olive", stock: 12 },
      { productId: bomberJacket.id, size: "XL", color: "Olive", stock: 8 },
      { productId: bomberJacket.id, size: "M", color: "Black", stock: 12 },
      { productId: bomberJacket.id, size: "L", color: "Black", stock: 10 },
    ],
  });

  await prisma.productTag.createMany({
    data: [
      { productId: bomberJacket.id, tagId: newTag.id },
      { productId: bomberJacket.id, tagId: saleTag.id },
    ],
  });

  const woolCoat = await prisma.product.create({
    data: {
      name: "Double-Breasted Wool Coat",
      slug: "double-breasted-wool-coat",
      description:
        "Elegant wool blend coat with double-breasted closure. Classic tailored fit with notched lapels. Sophisticated cold-weather essential.",
      mainImage:
        "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800",
      images: [
        "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800",
      ],
      price: 249.99,
      isActive: true,
      isFeatured: true,
      categoryId: outerwear.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: woolCoat.id, size: "S", color: "Camel", stock: 8 },
      { productId: woolCoat.id, size: "M", color: "Camel", stock: 10 },
      { productId: woolCoat.id, size: "L", color: "Camel", stock: 9 },
      { productId: woolCoat.id, size: "S", color: "Navy", stock: 7 },
      { productId: woolCoat.id, size: "M", color: "Navy", stock: 9 },
      { productId: woolCoat.id, size: "L", color: "Navy", stock: 8 },
    ],
  });

  await prisma.productTag.create({
    data: { productId: woolCoat.id, tagId: premiumTag.id },
  });

  const pufferJacket = await prisma.product.create({
    data: {
      name: "Quilted Puffer Jacket",
      slug: "quilted-puffer-jacket",
      description:
        "Warm quilted puffer jacket with synthetic insulation. Features a high collar and zip pockets. Lightweight yet incredibly warm.",
      mainImage:
        "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800",
      images: [
        "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800",
      ],
      price: 139.99,
      isActive: true,
      isFeatured: false,
      categoryId: outerwear.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: pufferJacket.id, size: "S", color: "Black", stock: 12 },
      { productId: pufferJacket.id, size: "M", color: "Black", stock: 15 },
      { productId: pufferJacket.id, size: "L", color: "Black", stock: 14 },
      { productId: pufferJacket.id, size: "XL", color: "Black", stock: 10 },
      { productId: pufferJacket.id, size: "M", color: "Navy", stock: 13 },
      { productId: pufferJacket.id, size: "L", color: "Navy", stock: 12 },
    ],
  });

  const trenchCoat = await prisma.product.create({
    data: {
      name: "Water-Resistant Trench Coat",
      slug: "water-resistant-trench-coat",
      description:
        "Classic trench coat with water-resistant finish. Features a belted waist and button closure. Timeless rainy-day staple.",
      mainImage:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
      images: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
      ],
      price: 179.99,
      isActive: true,
      isFeatured: false,
      categoryId: outerwear.id,
    },
  });

  await prisma.productVariant.createMany({
    data: [
      { productId: trenchCoat.id, size: "S", color: "Khaki", stock: 9 },
      { productId: trenchCoat.id, size: "M", color: "Khaki", stock: 12 },
      { productId: trenchCoat.id, size: "L", color: "Khaki", stock: 11 },
      { productId: trenchCoat.id, size: "S", color: "Black", stock: 8 },
      { productId: trenchCoat.id, size: "M", color: "Black", stock: 10 },
      { productId: trenchCoat.id, size: "L", color: "Black", stock: 9 },
    ],
  });

  // Create Addresses
  await prisma.address.create({
    data: {
      userId: customer1.id,
      fullName: "John Doe",
      addressLine1: "123 Main Street",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
      isDefault: true,
    },
  });

  await prisma.address.create({
    data: {
      userId: customer2.id,
      fullName: "Jane Smith",
      addressLine1: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      postalCode: "90001",
      country: "United States",
      isDefault: true,
    },
  });

  // Create Reviews
  await prisma.review.create({
    data: {
      userId: customer1.id,
      productId: mensShirt1.id,
      rating: 5,
      title: "Perfect fit and quality!",
      comment:
        "This Oxford shirt exceeded my expectations. The fabric is soft, breathable, and the fit is perfect. Highly recommend!",
      images: [],
      isVerified: true,
    },
  });

  await prisma.review.create({
    data: {
      userId: customer2.id,
      productId: womensDress.id,
      rating: 5,
      title: "Love this dress!",
      comment:
        "Beautiful floral print and very comfortable. Got so many compliments when I wore it to a wedding. Will buy in another color!",
      images: [],
      isVerified: true,
    },
  });

  await prisma.review.create({
    data: {
      userId: customer1.id,
      productId: sneakers.id,
      rating: 4,
      title: "Great everyday sneakers",
      comment:
        "Very comfortable and versatile. Go well with everything. Only giving 4 stars because they run slightly large.",
      images: [],
      isVerified: true,
    },
  });

  console.log("Seed completed successfully!");
  console.log("Created:");
  console.log("- 3 users");
  console.log("- 6 categories");
  console.log("- 30 products");
  console.log("- 5 tags");
  console.log("- Product variants for all products");
  console.log("- 2 addresses");
  console.log("- 3 reviews");
  console.log("- 1 active sale");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
