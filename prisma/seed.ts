// import { prisma } from "@/lib/prisma"

// async function main() {
//   console.log('🌱 Starting seed...')

//   // Clear existing data (optional - comment out if you want to keep existing data)
//   console.log('🗑️  Clearing existing data...')
//   await prisma.cartItem.deleteMany()
//   await prisma.wishlistItem.deleteMany()
//   await prisma.review.deleteMany()
//   await prisma.orderItem.deleteMany()
//   await prisma.order.deleteMany()
//   await prisma.address.deleteMany()
//   await prisma.productTag.deleteMany()
//   await prisma.productVariant.deleteMany()
//   await prisma.product.deleteMany()
//   await prisma.tag.deleteMany()
//   await prisma.category.deleteMany()
//   await prisma.sale.deleteMany()
//   await prisma.user.deleteMany()

//   // Create Users
//   console.log('👤 Creating users...')
//   const user1 = await prisma.user.create({
//     data: {
//       clerkId: 'user_seed_123456',
//       email: 'john@example.com',
//       name: 'John Doe',
//       image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
//       role: 'CUSTOMER',
//     },
//   })

//   const admin = await prisma.user.create({
//     data: {
//       clerkId: 'user_seed_admin',
//       email: 'admin@example.com',
//       name: 'Admin User',
//       image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
//       role: 'ADMIN',
//     },
//   })

//   console.log(`✅ Created ${2} users`)

//   // Create Addresses
//   console.log('📍 Creating addresses...')
//   const address1 = await prisma.address.create({
//     data: {
//       userId: user1.id,
//       clerkId: user1.clerkId,
//       fullName: 'John Doe',
//       phone: '+1234567890',
//       addressLine1: '123 Main Street',
//       addressLine2: 'Apt 4B',
//       city: 'New York',
//       state: 'NY',
//       postalCode: '10001',
//       country: 'USA',
//       isDefault: true,
//     },
//   })

//   console.log(`✅ Created ${1} address`)

//   // Create Categories
//   console.log('📂 Creating categories...')
//   const menCategory = await prisma.category.create({
//     data: {
//       name: "Men's Clothing",
//       slug: 'mens-clothing',
//       description: 'Stylish clothing for men',
//       image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891',
//     },
//   })

//   const womenCategory = await prisma.category.create({
//     data: {
//       name: "Women's Clothing",
//       slug: 'womens-clothing',
//       description: 'Fashion-forward clothing for women',
//       image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
//     },
//   })

//   const mensShirts = await prisma.category.create({
//     data: {
//       name: 'Shirts',
//       slug: 'mens-shirts',
//       description: 'Casual and formal shirts',
//       parentId: menCategory.id,
//     },
//   })

//   const mensPants = await prisma.category.create({
//     data: {
//       name: 'Pants',
//       slug: 'mens-pants',
//       description: 'Comfortable pants and jeans',
//       parentId: menCategory.id,
//     },
//   })

//   const womensDresses = await prisma.category.create({
//     data: {
//       name: 'Dresses',
//       slug: 'womens-dresses',
//       description: 'Beautiful dresses for every occasion',
//       parentId: womenCategory.id,
//     },
//   })

//   console.log(`✅ Created ${5} categories`)

//   // Create Tags
//   console.log('🏷️  Creating tags...')
//   const newArrivalTag = await prisma.tag.create({
//     data: { name: 'New Arrival', slug: 'new-arrival' },
//   })
//   const bestSellerTag = await prisma.tag.create({
//     data: { name: 'Best Seller', slug: 'best-seller' },
//   })
//   const saleTag = await prisma.tag.create({
//     data: { name: 'Sale', slug: 'sale' },
//   })
//   const ecoFriendlyTag = await prisma.tag.create({
//     data: { name: 'Eco-Friendly', slug: 'eco-friendly' },
//   })
//   const premiumTag = await prisma.tag.create({
//     data: { name: 'Premium', slug: 'premium' },
//   })

//   console.log(`✅ Created ${5} tags`)

//   // Create Products with variants and tags
//   console.log('👕 Creating products...')
//   const product1 = await prisma.product.create({
//     data: {
//       name: 'Classic Cotton T-Shirt',
//       slug: 'classic-cotton-tshirt',
//       description:
//         'Comfortable and breathable cotton t-shirt perfect for everyday wear. Made from 100% organic cotton.',
//       mainImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
//       images: [
//         'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
//         'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a',
//         'https://images.unsplash.com/photo-1622445275576-721325c6c3fc',
//       ],
//       price: 29.99,
//       comparePrice: 39.99,
//       cost: 15.0,
//       sku: 'TSHIRT-001',
//       stock: 280,
//       isActive: true,
//       isFeatured: true,
//       categoryId: mensShirts.id,
//       variants: {
//         create: [
//           { size: 'S', color: 'White', stock: 30, sku: 'TSHIRT-001-S-WHT' },
//           { size: 'M', color: 'White', stock: 50, sku: 'TSHIRT-001-M-WHT' },
//           { size: 'L', color: 'White', stock: 40, sku: 'TSHIRT-001-L-WHT' },
//           { size: 'XL', color: 'White', stock: 30, sku: 'TSHIRT-001-XL-WHT' },
//           { size: 'S', color: 'Black', stock: 25, sku: 'TSHIRT-001-S-BLK' },
//           { size: 'M', color: 'Black', stock: 45, sku: 'TSHIRT-001-M-BLK' },
//           { size: 'L', color: 'Black', stock: 35, sku: 'TSHIRT-001-L-BLK' },
//           { size: 'XL', color: 'Black', stock: 25, sku: 'TSHIRT-001-XL-BLK' },
//         ],
//       },
//       tags: {
//         create: [
//           { tagId: newArrivalTag.id },
//           { tagId: bestSellerTag.id },
//           { tagId: ecoFriendlyTag.id },
//         ],
//       },
//     },
//   })

//   const product2 = await prisma.product.create({
//     data: {
//       name: 'Slim Fit Denim Jeans',
//       slug: 'slim-fit-denim-jeans',
//       description:
//         'Modern slim fit jeans with stretch denim for all-day comfort. Features classic 5-pocket styling.',
//       mainImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
//       images: [
//         'https://images.unsplash.com/photo-1542272604-787c3835535d',
//         'https://images.unsplash.com/photo-1475178626620-a4d074967452',
//       ],
//       price: 79.99,
//       comparePrice: 99.99,
//       cost: 40.0,
//       sku: 'JEANS-001',
//       stock: 100,
//       isActive: true,
//       isFeatured: true,
//       categoryId: mensPants.id,
//       variants: {
//         create: [
//           { size: '30', color: 'Blue', stock: 20, sku: 'JEANS-001-30-BLU' },
//           { size: '32', color: 'Blue', stock: 25, sku: 'JEANS-001-32-BLU' },
//           { size: '34', color: 'Blue', stock: 30, sku: 'JEANS-001-34-BLU' },
//           { size: '36', color: 'Blue', stock: 25, sku: 'JEANS-001-36-BLU' },
//         ],
//       },
//       tags: {
//         create: [{ tagId: bestSellerTag.id }, { tagId: premiumTag.id }],
//       },
//     },
//   })

//   const product3 = await prisma.product.create({
//     data: {
//       name: 'Floral Summer Dress',
//       slug: 'floral-summer-dress',
//       description:
//         'Light and breezy summer dress with beautiful floral print. Perfect for warm weather.',
//       mainImage: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1',
//       images: [
//         'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1',
//         'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
//       ],
//       price: 59.99,
//       comparePrice: 79.99,
//       cost: 30.0,
//       sku: 'DRESS-001',
//       stock: 80,
//       isActive: true,
//       isFeatured: false,
//       categoryId: womensDresses.id,
//       variants: {
//         create: [
//           { size: 'XS', color: 'Floral', stock: 15, sku: 'DRESS-001-XS' },
//           { size: 'S', color: 'Floral', stock: 20, sku: 'DRESS-001-S' },
//           { size: 'M', color: 'Floral', stock: 25, sku: 'DRESS-001-M' },
//           { size: 'L', color: 'Floral', stock: 20, sku: 'DRESS-001-L' },
//         ],
//       },
//       tags: {
//         create: [{ tagId: newArrivalTag.id }, { tagId: saleTag.id }],
//       },
//     },
//   })

//   const product4 = await prisma.product.create({
//     data: {
//       name: 'Formal Oxford Shirt',
//       slug: 'formal-oxford-shirt',
//       description:
//         'Crisp oxford shirt perfect for the office or formal occasions. Non-iron fabric for easy care.',
//       mainImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c',
//       images: [
//         'https://images.unsplash.com/photo-1596755094514-f87e34085b2c',
//         'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf',
//       ],
//       price: 49.99,
//       stock: 120,
//       cost: 25.0,
//       sku: 'SHIRT-001',
//       isActive: true,
//       isFeatured: false,
//       categoryId: mensShirts.id,
//       variants: {
//         create: [
//           { size: 'S', color: 'White', stock: 30, sku: 'SHIRT-001-S-WHT' },
//           { size: 'M', color: 'White', stock: 35, sku: 'SHIRT-001-M-WHT' },
//           { size: 'L', color: 'White', stock: 30, sku: 'SHIRT-001-L-WHT' },
//           { size: 'XL', color: 'White', stock: 25, sku: 'SHIRT-001-XL-WHT' },
//         ],
//       },
//       tags: {
//         create: [{ tagId: premiumTag.id }],
//       },
//     },
//   })

//   console.log(`✅ Created ${4} products`)

//   // Get variant IDs for later use
//   const tshirtVariants = await prisma.productVariant.findMany({
//     where: { productId: product1.id },
//   })
//   const jeansVariants = await prisma.productVariant.findMany({
//     where: { productId: product2.id },
//   })

//   // Create Sales
//   console.log('💰 Creating sales...')
//   const summerSale = await prisma.sale.create({
//     data: {
//       name: 'Summer Sale 2024',
//       description: 'Get 20% off on all summer items',
//       discountType: 'PERCENTAGE',
//       discountValue: 20,
//       startDate: new Date('2024-06-01'),
//       endDate: new Date('2024-08-31'),
//       isActive: true,
//       code: 'SUMMER20',
//       minPurchase: 50,
//       maxDiscount: 50,
//       usageLimit: 1000,
//       usageCount: 45,
//     },
//   })

//   const fixedSale = await prisma.sale.create({
//     data: {
//       name: '$10 Off First Order',
//       description: 'Get $10 off your first order',
//       discountType: 'FIXED',
//       discountValue: 10,
//       startDate: new Date('2024-01-01'),
//       endDate: new Date('2024-12-31'),
//       isActive: true,
//       code: 'FIRST10',
//       minPurchase: 30,
//       usageLimit: 500,
//       usageCount: 123,
//     },
//   })

//   console.log(`✅ Created ${2} sales`)

//   // Create Reviews
//   console.log('⭐ Creating reviews...')
//   await prisma.review.create({
//     data: {
//       userId: user1.id,
//       clerkId: user1.clerkId,
//       productId: product1.id,
//       rating: 5,
//       title: 'Perfect fit and quality!',
//       comment:
//         'This t-shirt exceeded my expectations. The fabric is soft, breathable, and the fit is exactly as described. Will definitely buy more!',
//       images: [],
//       isVerified: true,
//     },
//   })

//   await prisma.review.create({
//     data: {
//       userId: user1.id,
//       clerkId: user1.clerkId,
//       productId: product2.id,
//       rating: 4,
//       title: 'Great jeans, slightly tight',
//       comment:
//         'Love the quality and style, but they run a bit tight. Consider ordering one size up if you prefer a looser fit.',
//       images: [],
//       isVerified: true,
//     },
//   })

//   console.log(`✅ Created ${2} reviews`)

//   // Create Wishlist Items
//   console.log('❤️  Creating wishlist items...')
//   await prisma.wishlistItem.create({
//     data: {
//       userId: user1.id,
//       clerkId: user1.clerkId,
//       productId: product3.id,
//     },
//   })

//   await prisma.wishlistItem.create({
//     data: {
//       userId: user1.id,
//       clerkId: user1.clerkId,
//       productId: product4.id,
//     },
//   })

//   console.log(`✅ Created ${2} wishlist items`)

//   // Create Cart Items
//   console.log('🛒 Creating cart items...')
//   await prisma.cartItem.create({
//     data: {
//       userId: user1.id,
//       clerkId: user1.clerkId,
//       productId: product1.id,
//       variantId: tshirtVariants.find((v) => v.size === 'M' && v.color === 'White')?.id,
//       quantity: 2,
//     },
//   })

//   await prisma.cartItem.create({
//     data: {
//       userId: user1.id,
//       clerkId: user1.clerkId,
//       productId: product2.id,
//       variantId: jeansVariants.find((v) => v.size === '32')?.id,
//       quantity: 1,
//     },
//   })

//   console.log(`✅ Created ${2} cart items`)

//   // Create Orders
//   console.log('📦 Creating orders...')
//   const order1 = await prisma.order.create({
//     data: {
//       orderNumber: 'ORD-2024-001',
//       userId: user1.id,
//       clerkId: user1.clerkId,
//       addressId: address1.id,
//       status: 'DELIVERED',
//       stripeSessionId: 'cs_test_123456',
//       stripePaymentIntentId: 'pi_test_123456',
//       subtotal: 109.98,
//       discount: 10,
//       shippingCost: 5.99,
//       tax: 8.8,
//       total: 114.77,
//       currency: 'usd',
//       saleId: fixedSale.id,
//       couponCode: 'FIRST10',
//       shippingMethod: 'Standard Shipping',
//       trackingNumber: '1Z999AA10123456784',
//       customerNote: 'Please leave at front door if no one is home.',
//       paidAt: new Date('2024-11-15T10:30:00'),
//       shippedAt: new Date('2024-11-16T14:20:00'),
//       deliveredAt: new Date('2024-11-20T16:45:00'),
//       items: {
//         create: [
//           {
//             productId: product1.id,
//             variantId: tshirtVariants.find((v) => v.size === 'M' && v.color === 'White')?.id,
//             quantity: 2,
//             price: 29.99,
//             total: 59.98,
//           },
//           {
//             productId: product2.id,
//             variantId: jeansVariants.find((v) => v.size === '32')?.id,
//             quantity: 1,
//             price: 79.99,
//             total: 79.99,
//           },
//         ],
//       },
//     },
//   })

//   const order2 = await prisma.order.create({
//     data: {
//       orderNumber: 'ORD-2024-002',
//       userId: user1.id,
//       clerkId: user1.clerkId,
//       addressId: address1.id,
//       status: 'PROCESSING',
//       stripeSessionId: 'cs_test_789012',
//       stripePaymentIntentId: 'pi_test_789012',
//       subtotal: 59.99,
//       discount: 0,
//       shippingCost: 5.99,
//       tax: 5.28,
//       total: 71.26,
//       currency: 'usd',
//       shippingMethod: 'Standard Shipping',
//       paidAt: new Date('2024-12-01T09:15:00'),
//       items: {
//         create: [
//           {
//             productId: product3.id,
//             quantity: 1,
//             price: 59.99,
//             total: 59.99,
//           },
//         ],
//       },
//     },
//   })

//   console.log(`✅ Created ${2} orders`)

//   console.log('✨ Seed completed successfully!')
// }

// main()
//   .catch((e) => {
//     console.error('❌ Error seeding database:', e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })

import { prisma } from "@/lib/prisma";

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  console.log("🗑️  Clearing existing data...");
  await prisma.cartItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.productTag.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  console.log("👤 Creating users...");
  const user1 = await prisma.user.create({
    data: {
      clerkId: "user_seed_123456",
      email: "john@example.com",
      name: "John Doe",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      role: "CUSTOMER",
    },
  });

  const admin = await prisma.user.create({
    data: {
      clerkId: "user_seed_admin",
      email: "admin@example.com",
      name: "Admin User",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
      role: "ADMIN",
    },
  });

  console.log(`✅ Created 2 users`);

  // Create Addresses
  console.log("📍 Creating addresses...");
  const address1 = await prisma.address.create({
    data: {
      userId: user1.id,
      clerkId: user1.clerkId,
      fullName: "John Doe",
      phone: "+1234567890",
      addressLine1: "123 Main Street",
      addressLine2: "Apt 4B",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "USA",
      isDefault: true,
    },
  });

  console.log(`✅ Created 1 address`);

  // Create Categories
  console.log("📂 Creating categories...");
  const menCategory = await prisma.category.create({
    data: {
      name: "Men's Clothing",
      slug: "mens-clothing",
      description: "Stylish clothing for men",
      image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891",
    },
  });

  const womenCategory = await prisma.category.create({
    data: {
      name: "Women's Clothing",
      slug: "womens-clothing",
      description: "Fashion-forward clothing for women",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    },
  });

  const kidsCategory = await prisma.category.create({
    data: {
      name: "Kids' Clothing",
      slug: "kids-clothing",
      description: "Comfortable and fun clothing for children",
      image: "https://images.unsplash.com/photo-1503919005314-30d93d07d823",
    },
  });

  const accessoriesCategory = await prisma.category.create({
    data: {
      name: "Accessories",
      slug: "accessories",
      description: "Complete your look with accessories",
      image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93",
    },
  });

  const mensShirts = await prisma.category.create({
    data: {
      name: "Men's Shirts",
      slug: "mens-shirts",
      description: "Casual and formal shirts",
      parentId: menCategory.id,
    },
  });

  const mensPants = await prisma.category.create({
    data: {
      name: "Men's Pants",
      slug: "mens-pants",
      description: "Comfortable pants and jeans",
      parentId: menCategory.id,
    },
  });

  const mensShoes = await prisma.category.create({
    data: {
      name: "Men's Shoes",
      slug: "mens-shoes",
      description: "Footwear for every occasion",
      parentId: menCategory.id,
    },
  });

  const womensDresses = await prisma.category.create({
    data: {
      name: "Dresses",
      slug: "womens-dresses",
      description: "Beautiful dresses for every occasion",
      parentId: womenCategory.id,
    },
  });

  const womensTops = await prisma.category.create({
    data: {
      name: "Tops",
      slug: "womens-tops",
      description: "Stylish tops and blouses",
      parentId: womenCategory.id,
    },
  });

  const womensShoes = await prisma.category.create({
    data: {
      name: "Women's Shoes",
      slug: "womens-shoes",
      description: "Trendy footwear collection",
      parentId: womenCategory.id,
    },
  });

  const kidsShirts = await prisma.category.create({
    data: {
      name: "Kid's Shirts",
      slug: "kids-shirts",
      description: "Fun shirts for kids",
      parentId: kidsCategory.id,
    },
  });

  const kidsPants = await prisma.category.create({
    data: {
      name: "Kid's Pants",
      slug: "kids-pants",
      description: "Durable pants for active kids",
      parentId: kidsCategory.id,
    },
  });

  console.log(`✅ Created 12 categories`);

  // Create Tags
  console.log("🏷️  Creating tags...");
  const newArrivalTag = await prisma.tag.create({
    data: { name: "New Arrival", slug: "new-arrival" },
  });
  const bestSellerTag = await prisma.tag.create({
    data: { name: "Best Seller", slug: "best-seller" },
  });
  const saleTag = await prisma.tag.create({
    data: { name: "Sale", slug: "sale" },
  });
  const ecoFriendlyTag = await prisma.tag.create({
    data: { name: "Eco-Friendly", slug: "eco-friendly" },
  });
  const premiumTag = await prisma.tag.create({
    data: { name: "Premium", slug: "premium" },
  });
  const casualTag = await prisma.tag.create({
    data: { name: "Casual", slug: "casual" },
  });
  const formalTag = await prisma.tag.create({
    data: { name: "Formal", slug: "formal" },
  });
  const sportTag = await prisma.tag.create({
    data: { name: "Sport", slug: "sport" },
  });
  const comfortTag = await prisma.tag.create({
    data: { name: "Comfort", slug: "comfort" },
  });
  const summerTag = await prisma.tag.create({
    data: { name: "Summer", slug: "summer" },
  });

  console.log(`✅ Created 10 tags`);

  // Create Products
  console.log("👕 Creating products...");

  // Men's Products (10)
  const product1 = await prisma.product.create({
    data: {
      name: "Classic Cotton T-Shirt",
      slug: "classic-cotton-tshirt",
      description:
        "Comfortable and breathable cotton t-shirt perfect for everyday wear. Made from 100% organic cotton with a relaxed fit.",
      mainImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
      ],
      price: 29.99,
      comparePrice: 39.99,
      cost: 15.0,
      sku: "TSHIRT-001",
      stock: 280,
      isActive: true,
      isFeatured: true,
      categoryId: mensShirts.id,
      variants: {
        create: [
          { size: "S", color: "White", stock: 35, sku: "TSHIRT-001-S-WHT" },
          { size: "M", color: "White", stock: 70, sku: "TSHIRT-001-M-WHT" },
          { size: "L", color: "White", stock: 60, sku: "TSHIRT-001-L-WHT" },
          { size: "XL", color: "White", stock: 40, sku: "TSHIRT-001-XL-WHT" },
          { size: "M", color: "Black", stock: 45, sku: "TSHIRT-001-M-BLK" },
          { size: "L", color: "Black", stock: 30, sku: "TSHIRT-001-L-BLK" },
        ],
      },
      tags: {
        create: [
          { tagId: newArrivalTag.id },
          { tagId: bestSellerTag.id },
          { tagId: casualTag.id },
        ],
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Slim Fit Denim Jeans",
      slug: "slim-fit-denim-jeans",
      description:
        "Modern slim fit jeans with stretch denim for all-day comfort. Features classic 5-pocket styling and durable construction.",
      mainImage: "https://images.unsplash.com/photo-1542272604-787c3835535d",
      images: [
        "https://images.unsplash.com/photo-1542272604-787c3835535d",
        "https://images.unsplash.com/photo-1475178626620-a4d074967452",
      ],
      price: 79.99,
      comparePrice: 99.99,
      cost: 40.0,
      sku: "JEANS-001",
      stock: 100,
      isActive: true,
      isFeatured: true,
      categoryId: mensPants.id,
      variants: {
        create: [
          { size: "30", color: "Blue", stock: 20, sku: "JEANS-001-30-BLU" },
          { size: "32", color: "Blue", stock: 30, sku: "JEANS-001-32-BLU" },
          { size: "34", color: "Blue", stock: 30, sku: "JEANS-001-34-BLU" },
          { size: "36", color: "Blue", stock: 20, sku: "JEANS-001-36-BLU" },
        ],
      },
      tags: {
        create: [{ tagId: bestSellerTag.id }, { tagId: casualTag.id }],
      },
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: "Formal Oxford Shirt",
      slug: "formal-oxford-shirt",
      description:
        "Crisp oxford shirt perfect for the office or formal occasions. Non-iron fabric for easy care and professional appearance.",
      mainImage: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
      images: [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
      ],
      price: 49.99,
      comparePrice: 69.99,
      cost: 25.0,
      sku: "SHIRT-001",
      stock: 120,
      isActive: true,
      isFeatured: false,
      categoryId: mensShirts.id,
      variants: {
        create: [
          { size: "S", color: "White", stock: 25, sku: "SHIRT-001-S-WHT" },
          { size: "M", color: "White", stock: 35, sku: "SHIRT-001-M-WHT" },
          { size: "L", color: "White", stock: 35, sku: "SHIRT-001-L-WHT" },
          { size: "XL", color: "White", stock: 25, sku: "SHIRT-001-XL-WHT" },
        ],
      },
      tags: {
        create: [{ tagId: formalTag.id }, { tagId: premiumTag.id }],
      },
    },
  });

  const product4 = await prisma.product.create({
    data: {
      name: "Casual Chino Pants",
      slug: "casual-chino-pants",
      description:
        "Versatile chino pants that transition from work to weekend. Comfortable stretch fabric with modern fit.",
      mainImage: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
      images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a"],
      price: 59.99,
      cost: 30.0,
      sku: "CHINO-001",
      stock: 90,
      isActive: true,
      isFeatured: false,
      categoryId: mensPants.id,
      variants: {
        create: [
          { size: "30", color: "Khaki", stock: 20, sku: "CHINO-001-30-KHA" },
          { size: "32", color: "Khaki", stock: 25, sku: "CHINO-001-32-KHA" },
          { size: "34", color: "Khaki", stock: 25, sku: "CHINO-001-34-KHA" },
          { size: "36", color: "Khaki", stock: 20, sku: "CHINO-001-36-KHA" },
        ],
      },
      tags: {
        create: [{ tagId: casualTag.id }, { tagId: comfortTag.id }],
      },
    },
  });

  const product5 = await prisma.product.create({
    data: {
      name: "Leather Running Shoes",
      slug: "leather-running-shoes",
      description:
        "Premium leather running shoes with cushioned sole and breathable design. Perfect for daily workouts and casual wear.",
      mainImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
      ],
      price: 129.99,
      comparePrice: 159.99,
      cost: 65.0,
      sku: "SHOE-001",
      stock: 80,
      isActive: true,
      isFeatured: true,
      categoryId: mensShoes.id,
      variants: {
        create: [
          { size: "8", color: "Black", stock: 15, sku: "SHOE-001-8-BLK" },
          { size: "9", color: "Black", stock: 20, sku: "SHOE-001-9-BLK" },
          { size: "10", color: "Black", stock: 25, sku: "SHOE-001-10-BLK" },
          { size: "11", color: "Black", stock: 20, sku: "SHOE-001-11-BLK" },
        ],
      },
      tags: {
        create: [
          { tagId: sportTag.id },
          { tagId: premiumTag.id },
          { tagId: bestSellerTag.id },
        ],
      },
    },
  });

  const product6 = await prisma.product.create({
    data: {
      name: "Casual Canvas Sneakers",
      slug: "casual-canvas-sneakers",
      description:
        "Comfortable canvas sneakers for everyday wear. Classic design with cushioned insole.",
      mainImage: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
      images: ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77"],
      price: 49.99,
      cost: 25.0,
      sku: "SNEAKER-001",
      stock: 110,
      isActive: true,
      isFeatured: false,
      categoryId: mensShoes.id,
      variants: {
        create: [
          { size: "8", color: "White", stock: 25, sku: "SNEAKER-001-8-WHT" },
          { size: "9", color: "White", stock: 30, sku: "SNEAKER-001-9-WHT" },
          { size: "10", color: "White", stock: 30, sku: "SNEAKER-001-10-WHT" },
          { size: "11", color: "White", stock: 25, sku: "SNEAKER-001-11-WHT" },
        ],
      },
      tags: {
        create: [{ tagId: casualTag.id }, { tagId: comfortTag.id }],
      },
    },
  });

  const product7 = await prisma.product.create({
    data: {
      name: "Polo Shirt",
      slug: "polo-shirt",
      description:
        "Classic polo shirt with breathable pique fabric. Perfect for golf, office casual, or weekend wear.",
      mainImage: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d",
      images: ["https://images.unsplash.com/photo-1586790170083-2f9ceadc732d"],
      price: 39.99,
      cost: 20.0,
      sku: "POLO-001",
      stock: 150,
      isActive: true,
      isFeatured: false,
      categoryId: mensShirts.id,
      variants: {
        create: [
          { size: "S", color: "Navy", stock: 30, sku: "POLO-001-S-NVY" },
          { size: "M", color: "Navy", stock: 40, sku: "POLO-001-M-NVY" },
          { size: "L", color: "Navy", stock: 40, sku: "POLO-001-L-NVY" },
          { size: "XL", color: "Navy", stock: 40, sku: "POLO-001-XL-NVY" },
        ],
      },
      tags: {
        create: [{ tagId: casualTag.id }, { tagId: sportTag.id }],
      },
    },
  });

  const product8 = await prisma.product.create({
    data: {
      name: "Cargo Shorts",
      slug: "cargo-shorts",
      description:
        "Durable cargo shorts with multiple pockets. Perfect for outdoor activities and summer adventures.",
      mainImage: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b",
      images: ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b"],
      price: 44.99,
      cost: 22.0,
      sku: "SHORT-001",
      stock: 85,
      isActive: true,
      isFeatured: false,
      categoryId: mensPants.id,
      variants: {
        create: [
          { size: "30", color: "Olive", stock: 20, sku: "SHORT-001-30-OLV" },
          { size: "32", color: "Olive", stock: 25, sku: "SHORT-001-32-OLV" },
          { size: "34", color: "Olive", stock: 25, sku: "SHORT-001-34-OLV" },
          { size: "36", color: "Olive", stock: 15, sku: "SHORT-001-36-OLV" },
        ],
      },
      tags: {
        create: [{ tagId: casualTag.id }, { tagId: summerTag.id }],
      },
    },
  });

  const product9 = await prisma.product.create({
    data: {
      name: "Hooded Sweatshirt",
      slug: "hooded-sweatshirt",
      description:
        "Cozy hooded sweatshirt with kangaroo pocket. Perfect for layering in cooler weather.",
      mainImage: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
      images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7"],
      price: 54.99,
      cost: 28.0,
      sku: "HOODIE-001",
      stock: 95,
      isActive: true,
      isFeatured: false,
      categoryId: mensShirts.id,
      variants: {
        create: [
          { size: "S", color: "Gray", stock: 20, sku: "HOODIE-001-S-GRY" },
          { size: "M", color: "Gray", stock: 30, sku: "HOODIE-001-M-GRY" },
          { size: "L", color: "Gray", stock: 25, sku: "HOODIE-001-L-GRY" },
          { size: "XL", color: "Gray", stock: 20, sku: "HOODIE-001-XL-GRY" },
        ],
      },
      tags: {
        create: [{ tagId: casualTag.id }, { tagId: comfortTag.id }],
      },
    },
  });

  const product10 = await prisma.product.create({
    data: {
      name: "Dress Shoes",
      slug: "dress-shoes",
      description:
        "Elegant leather dress shoes perfect for formal occasions and business meetings.",
      mainImage: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4",
      images: ["https://images.unsplash.com/photo-1614252235316-8c857d38b5f4"],
      price: 149.99,
      comparePrice: 199.99,
      cost: 75.0,
      sku: "DRESS-SHOE-001",
      stock: 60,
      isActive: true,
      isFeatured: true,
      categoryId: mensShoes.id,
      variants: {
        create: [
          { size: "8", color: "Black", stock: 12, sku: "DRESS-SHOE-001-8-BLK" },
          { size: "9", color: "Black", stock: 18, sku: "DRESS-SHOE-001-9-BLK" },
          {
            size: "10",
            color: "Black",
            stock: 18,
            sku: "DRESS-SHOE-001-10-BLK",
          },
          {
            size: "11",
            color: "Black",
            stock: 12,
            sku: "DRESS-SHOE-001-11-BLK",
          },
        ],
      },
      tags: {
        create: [{ tagId: formalTag.id }, { tagId: premiumTag.id }],
      },
    },
  });

  // Women's Products (10)
  const product11 = await prisma.product.create({
    data: {
      name: "Floral Summer Dress",
      slug: "floral-summer-dress",
      description:
        "Light and breezy summer dress with beautiful floral print. Perfect for warm weather and outdoor events.",
      mainImage: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",
      images: [
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
      ],
      price: 59.99,
      comparePrice: 79.99,
      cost: 30.0,
      sku: "DRESS-001",
      stock: 80,
      isActive: true,
      isFeatured: true,
      categoryId: womensDresses.id,
      variants: {
        create: [
          { size: "XS", color: "Floral", stock: 15, sku: "DRESS-001-XS" },
          { size: "S", color: "Floral", stock: 20, sku: "DRESS-001-S" },
          { size: "M", color: "Floral", stock: 25, sku: "DRESS-001-M" },
          { size: "L", color: "Floral", stock: 20, sku: "DRESS-001-L" },
        ],
      },
      tags: {
        create: [
          { tagId: newArrivalTag.id },
          { tagId: summerTag.id },
          { tagId: saleTag.id },
        ],
      },
    },
  });

  const product12 = await prisma.product.create({
    data: {
      name: "Casual Blouse",
      slug: "casual-blouse",
      description:
        "Versatile blouse perfect for work or weekend. Features elegant draping and comfortable fit.",
      mainImage: "https://images.unsplash.com/photo-1564257577-2d35686b4f84",
      images: ["https://images.unsplash.com/photo-1564257577-2d35686b4f84"],
      price: 44.99,
      cost: 22.0,
      sku: "BLOUSE-001",
      stock: 100,
      isActive: true,
      isFeatured: false,
      categoryId: womensTops.id,
      variants: {
        create: [
          { size: "XS", color: "Pink", stock: 20, sku: "BLOUSE-001-XS-PNK" },
          { size: "S", color: "Pink", stock: 25, sku: "BLOUSE-001-S-PNK" },
          { size: "M", color: "Pink", stock: 30, sku: "BLOUSE-001-M-PNK" },
          { size: "L", color: "Pink", stock: 25, sku: "BLOUSE-001-L-PNK" },
        ],
      },
      tags: {
        create: [{ tagId: casualTag.id }, { tagId: comfortTag.id }],
      },
    },
  });

  const product13 = await prisma.product.create({
    data: {
      name: "High Heel Pumps",
      slug: "high-heel-pumps",
      description:
        "Classic high heel pumps perfect for formal occasions. Comfortable cushioned insole.",
      mainImage: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
      images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2"],
      price: 89.99,
      comparePrice: 119.99,
      cost: 45.0,
      sku: "PUMP-001",
      stock: 70,
      isActive: true,
      isFeatured: false,
      categoryId: womensShoes.id,
      variants: {
        create: [
          { size: "6", color: "Black", stock: 15, sku: "PUMP-001-6-BLK" },
          { size: "7", color: "Black", stock: 20, sku: "PUMP-001-7-BLK" },
          { size: "8", color: "Black", stock: 20, sku: "PUMP-001-8-BLK" },
          { size: "9", color: "Black", stock: 15, sku: "PUMP-001-9-BLK" },
        ],
      },
      tags: {
        create: [{ tagId: formalTag.id }, { tagId: premiumTag.id }],
      },
    },
  });

  const product14 = await prisma.product.create({
    data: {
      name: "Yoga Leggings",
      slug: "yoga-leggings",
      description:
        "High-waisted yoga leggings with moisture-wicking fabric. Perfect for workouts and active lifestyle.",
      mainImage: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8",
      images: ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8"],
      price: 49.99,
      cost: 25.0,
      sku: "LEGGING-001",
      stock: 120,
      isActive: true,
      isFeatured: true,
      categoryId: womensTops.id,
      variants: {
        create: [
          { size: "XS", color: "Black", stock: 25, sku: "LEGGING-001-XS-BLK" },
          { size: "S", color: "Black", stock: 30, sku: "LEGGING-001-S-BLK" },
          { size: "M", color: "Black", stock: 35, sku: "LEGGING-001-M-BLK" },
          { size: "L", color: "Black", stock: 30, sku: "LEGGING-001-L-BLK" },
        ],
      },
      tags: {
        create: [
          { tagId: sportTag.id },
          { tagId: comfortTag.id },
          { tagId: bestSellerTag.id },
        ],
      },
    },
  });

  const product15 = await prisma.product.create({
    data: {
      name: "Maxi Dress",
      slug: "maxi-dress",
      description:
        "Elegant maxi dress with flowing silhouette. Perfect for formal events and special occasions.",
      mainImage: "https://images.unsplash.com/photo-1566174053879-31528523f8ae",
      images: ["https://images.unsplash.com/photo-1566174053879-31528523f8ae"],
      price: 79.99,
      cost: 40.0,
      sku: "MAXI-001",
      stock: 65,
      isActive: true,
      isFeatured: false,
      categoryId: womensDresses.id,
      variants: {
        create: [
          { size: "XS", color: "Red", stock: 15, sku: "MAXI-001-XS-RED" },
          { size: "S", color: "Red", stock: 20, sku: "MAXI-001-S-RED" },
          { size: "M", color: "Red", stock: 20, sku: "MAXI-001-M-RED" },
          { size: "L", color: "Red", stock: 10, sku: "MAXI-001-L-RED" },
        ],
      },
      tags: {
        create: [{ tagId: formalTag.id }, { tagId: premiumTag.id }],
      },
    },
  });

  const product16 = await prisma.product.create({
    data: {
      name: "Denim Jacket",
      slug: "denim-jacket-women",
      description:
        "Classic denim jacket with vintage wash. Essential layering piece for any wardrobe.",
      mainImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
      images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5"],
      price: 69.99,
      cost: 35.0,
      sku: "JACKET-001",
      stock: 75,
      isActive: true,
      isFeatured: false,
      categoryId: womensTops.id,
      variants: {
        create: [
          { size: "XS", color: "Blue", stock: 15, sku: "JACKET-001-XS-BLU" },
          { size: "S", color: "Blue", stock: 20, sku: "JACKET-001-S-BLU" },
          { size: "M", color: "Blue", stock: 25, sku: "JACKET-001-M-BLU" },
          { size: "L", color: "Blue", stock: 15, sku: "JACKET-001-L-BLU" },
        ],
      },
      tags: {
        create: [{ tagId: casualTag.id }, { tagId: bestSellerTag.id }],
      },
    },
  });

  const product17 = await prisma.product.create({
    data: {
      name: "Ankle Boots",
      slug: "ankle-boots-women",
      description:
        "Stylish ankle boots with comfortable heel. Perfect for fall and winter seasons.",
      mainImage: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f",
      images: ["https://images.unsplash.com/photo-1608256246200-53e635b5b65f"],
      price: 99.99,
      comparePrice: 129.99,
      cost: 50.0,
      sku: "BOOT-001",
      stock: 55,
      isActive: true,
      isFeatured: true,
      categoryId: womensShoes.id,
      variants: {
        create: [
          { size: "6", color: "Brown", stock: 12, sku: "BOOT-001-6-BRN" },
          { size: "7", color: "Brown", stock: 15, sku: "BOOT-001-7-BRN" },
          { size: "8", color: "Brown", stock: 18, sku: "BOOT-001-8-BRN" },
          { size: "9", color: "Brown", stock: 10, sku: "BOOT-001-9-BRN" },
        ],
      },
      tags: {
        create: [{ tagId: premiumTag.id }, { tagId: newArrivalTag.id }],
      },
    },
  });

  const product18 = await prisma.product.create({
    data: {
      name: "Knit Sweater",
      slug: "knit-sweater-women",
      description:
        "Cozy knit sweater perfect for cold weather. Soft fabric with relaxed fit.",
      mainImage: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
      images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27"],
      price: 64.99,
      cost: 32.0,
      sku: "SWEATER-001",
      stock: 90,
      isActive: true,
      isFeatured: false,
      categoryId: womensTops.id,
      variants: {
        create: [
          { size: "XS", color: "Beige", stock: 20, sku: "SWEATER-001-XS-BEI" },
          { size: "S", color: "Beige", stock: 25, sku: "SWEATER-001-S-BEI" },
          { size: "M", color: "Beige", stock: 25, sku: "SWEATER-001-M-BEI" },
          { size: "L", color: "Beige", stock: 20, sku: "SWEATER-001-L-BEI" },
        ],
      },
      tags: {
        create: [{ tagId: casualTag.id }, { tagId: comfortTag.id }],
      },
    },
  });

  const product19 = await prisma.product.create({
    data: {
      name: "Running Shoes Women",
      slug: "running-shoes-women",
      description:
        "Lightweight running shoes with excellent cushioning and support. Perfect for daily runs.",
      mainImage: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111",
      images: ["https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111"],
      price: 119.99,
      comparePrice: 149.99,
      cost: 60.0,
      sku: "RUN-SHOE-001",
      stock: 85,
      isActive: true,
      isFeatured: true,
      categoryId: womensShoes.id,
      variants: {
        create: [
          { size: "6", color: "Pink", stock: 20, sku: "RUN-SHOE-001-6-PNK" },
          { size: "7", color: "Pink", stock: 25, sku: "RUN-SHOE-001-7-PNK" },
          { size: "8", color: "Pink", stock: 25, sku: "RUN-SHOE-001-8-PNK" },
          { size: "9", color: "Pink", stock: 15, sku: "RUN-SHOE-001-9-PNK" },
        ],
      },
      tags: {
        create: [{ tagId: sportTag.id }, { tagId: bestSellerTag.id }],
      },
    },
  });

  const product20 = await prisma.product.create({
    data: {
      name: "Silk Scarf",
      slug: "silk-scarf",
      description:
        "Luxurious silk scarf with elegant design. Add sophistication to any outfit.",
      mainImage: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26",
      images: ["https://images.unsplash.com/photo-1601924994987-69e26d50dc26"],
      price: 34.99,
      cost: 17.0,
      sku: "SCARF-001",
      stock: 150,
      isActive: true,
      isFeatured: false,
      categoryId: accessoriesCategory.id,
      variants: {
        create: [
          {
            size: "One Size",
            color: "Multi",
            stock: 150,
            sku: "SCARF-001-OS-MLT",
          },
        ],
      },
      tags: {
        create: [{ tagId: premiumTag.id }, { tagId: ecoFriendlyTag.id }],
      },
    },
  });

  // Kids' Products (10)
  const product21 = await prisma.product.create({
    data: {
      name: "Kids Cotton T-Shirt",
      slug: "kids-cotton-tshirt",
      description:
        "Soft and comfortable cotton t-shirt for kids. Fun graphic design with durable print.",
      mainImage: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea",
      images: ["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea"],
      price: 19.99,
      cost: 10.0,
      sku: "KIDS-TSHIRT-001",
      stock: 200,
      isActive: true,
      isFeatured: false,
      categoryId: kidsShirts.id,
      variants: {
        create: [
          { size: "4", color: "Red", stock: 40, sku: "KIDS-TSHIRT-001-4-RED" },
          { size: "6", color: "Red", stock: 50, sku: "KIDS-TSHIRT-001-6-RED" },
          { size: "8", color: "Red", stock: 60, sku: "KIDS-TSHIRT-001-8-RED" },
          {
            size: "10",
            color: "Red",
            stock: 50,
            sku: "KIDS-TSHIRT-001-10-RED",
          },
        ],
      },
      tags: {
        create: [{ tagId: casualTag.id }, { tagId: comfortTag.id }],
      },
    },
  });

  const product22 = await prisma.product.create({
    data: {
      name: "Kids Denim Jeans",
      slug: "kids-denim-jeans",
      description:
        "Durable denim jeans for active kids. Reinforced knees and adjustable waist.",
      mainImage: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80",
      images: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80"],
      price: 34.99,
      cost: 17.0,
      sku: "KIDS-JEANS-001",
      stock: 140,
      isActive: true,
      isFeatured: false,
      categoryId: kidsPants.id,
      variants: {
        create: [
          { size: "4", color: "Blue", stock: 30, sku: "KIDS-JEANS-001-4-BLU" },
          { size: "6", color: "Blue", stock: 40, sku: "KIDS-JEANS-001-6-BLU" },
          { size: "8", color: "Blue", stock: 40, sku: "KIDS-JEANS-001-8-BLU" },
          {
            size: "10",
            color: "Blue",
            stock: 30,
            sku: "KIDS-JEANS-001-10-BLU",
          },
        ],
      },
      tags: {
        create: [{ tagId: casualTag.id }],
      },
    },
  });

  const product23 = await prisma.product.create({
    data: {
      name: "Kids Hoodie",
      slug: "kids-hoodie",
      description:
        "Cozy fleece hoodie to keep kids warm. Features fun graphic and kangaroo pocket.",
      mainImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
      images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633"],
      price: 39.99,
      cost: 20.0,
      sku: "KIDS-HOODIE-001",
      stock: 110,
      isActive: true,
      isFeatured: false,
      categoryId: kidsShirts.id,
      variants: {
        create: [
          { size: "4", color: "Gray", stock: 25, sku: "KIDS-HOODIE-001-4-GRY" },
          { size: "6", color: "Gray", stock: 30, sku: "KIDS-HOODIE-001-6-GRY" },
          { size: "8", color: "Gray", stock: 30, sku: "KIDS-HOODIE-001-8-GRY" },
          {
            size: "10",
            color: "Gray",
            stock: 25,
            sku: "KIDS-HOODIE-001-10-GRY",
          },
        ],
      },
      tags: {
        create: [{ tagId: casualTag.id }, { tagId: comfortTag.id }],
      },
    },
  });

  const product24 = await prisma.product.create({
    data: {
      name: "Kids Sneakers",
      slug: "kids-sneakers",
      description:
        "Comfortable sneakers for active kids. Easy velcro closure and cushioned sole.",
      mainImage: "https://images.unsplash.com/photo-1514989940723-e8e51635b782",
      images: ["https://images.unsplash.com/photo-1514989940723-e8e51635b782"],
      price: 44.99,
      cost: 22.0,
      sku: "KIDS-SNEAKER-001",
      stock: 100,
      isActive: true,
      isFeatured: true,
      categoryId: kidsShirts.id,
      variants: {
        create: [
          {
            size: "11",
            color: "Blue",
            stock: 25,
            sku: "KIDS-SNEAKER-001-11-BLU",
          },
          {
            size: "12",
            color: "Blue",
            stock: 25,
            sku: "KIDS-SNEAKER-001-12-BLU",
          },
          {
            size: "13",
            color: "Blue",
            stock: 25,
            sku: "KIDS-SNEAKER-001-13-BLU",
          },
          {
            size: "1",
            color: "Blue",
            stock: 25,
            sku: "KIDS-SNEAKER-001-1-BLU",
          },
        ],
      },
      tags: {
        create: [{ tagId: sportTag.id }, { tagId: comfortTag.id }],
      },
    },
  });

  const product25 = await prisma.product.create({
    data: {
      name: "Kids Shorts",
      slug: "kids-shorts",
      description:
        "Breathable athletic shorts perfect for summer play and sports activities.",
      mainImage: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b",
      images: ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b"],
      price: 24.99,
      cost: 12.0,
      sku: "KIDS-SHORTS-001",
      stock: 130,
      isActive: true,
      isFeatured: false,
      categoryId: kidsPants.id,
      variants: {
        create: [
          { size: "4", color: "Navy", stock: 30, sku: "KIDS-SHORTS-001-4-NVY" },
          { size: "6", color: "Navy", stock: 35, sku: "KIDS-SHORTS-001-6-NVY" },
          { size: "8", color: "Navy", stock: 35, sku: "KIDS-SHORTS-001-8-NVY" },
          {
            size: "10",
            color: "Navy",
            stock: 30,
            sku: "KIDS-SHORTS-001-10-NVY",
          },
        ],
      },
      tags: {
        create: [{ tagId: sportTag.id }, { tagId: summerTag.id }],
      },
    },
  });

  const product26 = await prisma.product.create({
    data: {
      name: "Kids Dress",
      slug: "kids-dress",
      description:
        "Adorable dress for special occasions. Comfortable fit with beautiful details.",
      mainImage: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7",
      images: ["https://images.unsplash.com/photo-1518831959646-742c3a14ebf7"],
      price: 44.99,
      cost: 22.0,
      sku: "KIDS-DRESS-001",
      stock: 70,
      isActive: true,
      isFeatured: false,
      categoryId: kidsShirts.id,
      variants: {
        create: [
          { size: "4", color: "Pink", stock: 15, sku: "KIDS-DRESS-001-4-PNK" },
          { size: "6", color: "Pink", stock: 20, sku: "KIDS-DRESS-001-6-PNK" },
          { size: "8", color: "Pink", stock: 20, sku: "KIDS-DRESS-001-8-PNK" },
          {
            size: "10",
            color: "Pink",
            stock: 15,
            sku: "KIDS-DRESS-001-10-PNK",
          },
        ],
      },
      tags: {
        create: [{ tagId: formalTag.id }],
      },
    },
  });

  const product27 = await prisma.product.create({
    data: {
      name: "Kids Pajama Set",
      slug: "kids-pajama-set",
      description:
        "Comfortable pajama set with fun prints. Soft fabric for good nights sleep.",
      mainImage: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42",
      images: ["https://images.unsplash.com/photo-1596870230751-ebdfce98ec42"],
      price: 29.99,
      cost: 15.0,
      sku: "KIDS-PJ-001",
      stock: 95,
      isActive: true,
      isFeatured: false,
      categoryId: kidsShirts.id,
      variants: {
        create: [
          { size: "4", color: "Multi", stock: 20, sku: "KIDS-PJ-001-4-MLT" },
          { size: "6", color: "Multi", stock: 25, sku: "KIDS-PJ-001-6-MLT" },
          { size: "8", color: "Multi", stock: 30, sku: "KIDS-PJ-001-8-MLT" },
          { size: "10", color: "Multi", stock: 20, sku: "KIDS-PJ-001-10-MLT" },
        ],
      },
      tags: {
        create: [{ tagId: comfortTag.id }],
      },
    },
  });

  const product28 = await prisma.product.create({
    data: {
      name: "Kids Track Pants",
      slug: "kids-track-pants",
      description:
        "Athletic track pants for sports and casual wear. Elastic waistband and comfortable fit.",
      mainImage: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2",
      images: ["https://images.unsplash.com/photo-1503944583220-79d8926ad5e2"],
      price: 32.99,
      cost: 16.0,
      sku: "KIDS-TRACK-001",
      stock: 105,
      isActive: true,
      isFeatured: false,
      categoryId: kidsPants.id,
      variants: {
        create: [
          { size: "4", color: "Black", stock: 25, sku: "KIDS-TRACK-001-4-BLK" },
          { size: "6", color: "Black", stock: 25, sku: "KIDS-TRACK-001-6-BLK" },
          { size: "8", color: "Black", stock: 30, sku: "KIDS-TRACK-001-8-BLK" },
          {
            size: "10",
            color: "Black",
            stock: 25,
            sku: "KIDS-TRACK-001-10-BLK",
          },
        ],
      },
      tags: {
        create: [{ tagId: sportTag.id }, { tagId: casualTag.id }],
      },
    },
  });

  const product29 = await prisma.product.create({
    data: {
      name: "Kids Rain Jacket",
      slug: "kids-rain-jacket",
      description:
        "Waterproof rain jacket to keep kids dry. Bright color for visibility and hood for protection.",
      mainImage: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"],
      price: 54.99,
      cost: 27.0,
      sku: "KIDS-RAIN-001",
      stock: 80,
      isActive: true,
      isFeatured: false,
      categoryId: kidsShirts.id,
      variants: {
        create: [
          { size: "4", color: "Yellow", stock: 18, sku: "KIDS-RAIN-001-4-YEL" },
          { size: "6", color: "Yellow", stock: 22, sku: "KIDS-RAIN-001-6-YEL" },
          { size: "8", color: "Yellow", stock: 22, sku: "KIDS-RAIN-001-8-YEL" },
          {
            size: "10",
            color: "Yellow",
            stock: 18,
            sku: "KIDS-RAIN-001-10-YEL",
          },
        ],
      },
      tags: {
        create: [{ tagId: casualTag.id }],
      },
    },
  });

  const product30 = await prisma.product.create({
    data: {
      name: "Kids Backpack",
      slug: "kids-backpack",
      description:
        "Durable backpack perfect for school and outdoor activities. Multiple compartments and adjustable straps.",
      mainImage: "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8",
      images: ["https://images.unsplash.com/photo-1577705998148-6da4f3963bc8"],
      price: 39.99,
      cost: 20.0,
      sku: "KIDS-BACKPACK-001",
      stock: 120,
      isActive: true,
      isFeatured: true,
      categoryId: accessoriesCategory.id,
      variants: {
        create: [
          {
            size: "One Size",
            color: "Blue",
            stock: 40,
            sku: "KIDS-BACKPACK-001-OS-BLU",
          },
          {
            size: "One Size",
            color: "Pink",
            stock: 40,
            sku: "KIDS-BACKPACK-001-OS-PNK",
          },
          {
            size: "One Size",
            color: "Green",
            stock: 40,
            sku: "KIDS-BACKPACK-001-OS-GRN",
          },
        ],
      },
      tags: {
        create: [{ tagId: casualTag.id }, { tagId: bestSellerTag.id }],
      },
    },
  });

  console.log(`✅ Created 30 products`);

  // Get some variant IDs for orders
  const tshirtVariants = await prisma.productVariant.findMany({
    where: { productId: product1.id },
  });
  const jeansVariants = await prisma.productVariant.findMany({
    where: { productId: product2.id },
  });

  // Create Sales
  console.log("💰 Creating sales...");
  const summerSale = await prisma.sale.create({
    data: {
      name: "Summer Sale 2024",
      description: "Get 20% off on all summer items",
      discountType: "PERCENTAGE",
      discountValue: 20,
      startDate: new Date("2024-06-01"),
      endDate: new Date("2024-08-31"),
      isActive: true,
      code: "SUMMER20",
      minPurchase: 50,
      maxDiscount: 50,
      usageLimit: 1000,
      usageCount: 45,
    },
  });

  const fixedSale = await prisma.sale.create({
    data: {
      name: "$10 Off First Order",
      description: "Get $10 off your first order",
      discountType: "FIXED",
      discountValue: 10,
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      isActive: true,
      code: "FIRST10",
      minPurchase: 30,
      usageLimit: 500,
      usageCount: 123,
    },
  });

  console.log(`✅ Created 2 sales`);

  // Create Reviews
  console.log("⭐ Creating reviews...");
  await prisma.review.create({
    data: {
      userId: user1.id,
      clerkId: user1.clerkId,
      productId: product1.id,
      rating: 5,
      title: "Perfect fit and quality!",
      comment:
        "This t-shirt exceeded my expectations. The fabric is soft, breathable, and the fit is exactly as described. Will definitely buy more!",
      images: [],
      isVerified: true,
    },
  });

  await prisma.review.create({
    data: {
      userId: user1.id,
      clerkId: user1.clerkId,
      productId: product2.id,
      rating: 4,
      title: "Great jeans, slightly tight",
      comment:
        "Love the quality and style, but they run a bit tight. Consider ordering one size up if you prefer a looser fit.",
      images: [],
      isVerified: true,
    },
  });

  await prisma.review.create({
    data: {
      userId: user1.id,
      clerkId: user1.clerkId,
      productId: product5.id,
      rating: 5,
      title: "Best running shoes ever!",
      comment:
        "Extremely comfortable for long runs. Great arch support and cushioning.",
      images: [],
      isVerified: true,
    },
  });

  console.log(`✅ Created 3 reviews`);

  // Create Wishlist Items
  console.log("❤️  Creating wishlist items...");
  await prisma.wishlistItem.create({
    data: {
      userId: user1.id,
      clerkId: user1.clerkId,
      productId: product11.id,
    },
  });

  await prisma.wishlistItem.create({
    data: {
      userId: user1.id,
      clerkId: user1.clerkId,
      productId: product10.id,
    },
  });

  await prisma.wishlistItem.create({
    data: {
      userId: user1.id,
      clerkId: user1.clerkId,
      productId: product17.id,
    },
  });

  console.log(`✅ Created 3 wishlist items`);

  // Create Cart Items
  console.log("🛒 Creating cart items...");
  await prisma.cartItem.create({
    data: {
      userId: user1.id,
      clerkId: user1.clerkId,
      productId: product1.id,
      variantId: tshirtVariants.find(
        (v) => v.size === "M" && v.color === "White"
      )?.id,
      quantity: 2,
    },
  });

  await prisma.cartItem.create({
    data: {
      userId: user1.id,
      clerkId: user1.clerkId,
      productId: product2.id,
      variantId: jeansVariants.find((v) => v.size === "32")?.id,
      quantity: 1,
    },
  });

  console.log(`✅ Created 2 cart items`);

  // Create Orders
  console.log("📦 Creating orders...");
  const order1 = await prisma.order.create({
    data: {
      orderNumber: "ORD-2024-001",
      userId: user1.id,
      clerkId: user1.clerkId,
      addressId: address1.id,
      status: "DELIVERED",
      stripeSessionId: "cs_test_123456",
      stripePaymentIntentId: "pi_test_123456",
      subtotal: 109.98,
      discount: 10,
      shippingCost: 5.99,
      tax: 8.8,
      total: 114.77,
      currency: "usd",
      saleId: fixedSale.id,
      couponCode: "FIRST10",
      shippingMethod: "Standard Shipping",
      trackingNumber: "1Z999AA10123456784",
      customerNote: "Please leave at front door if no one is home.",
      paidAt: new Date("2024-11-15T10:30:00"),
      shippedAt: new Date("2024-11-16T14:20:00"),
      deliveredAt: new Date("2024-11-20T16:45:00"),
      items: {
        create: [
          {
            productId: product1.id,
            variantId: tshirtVariants.find(
              (v) => v.size === "M" && v.color === "White"
            )?.id,
            quantity: 2,
            price: 29.99,
            total: 59.98,
          },
          {
            productId: product2.id,
            variantId: jeansVariants.find((v) => v.size === "32")?.id,
            quantity: 1,
            price: 79.99,
            total: 79.99,
          },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      orderNumber: "ORD-2024-002",
      userId: user1.id,
      clerkId: user1.clerkId,
      addressId: address1.id,
      status: "SHIPPED",
      stripeSessionId: "cs_test_234567",
      stripePaymentIntentId: "pi_test_234567",
      subtotal: 129.99,
      discount: 0,
      shippingCost: 0,
      tax: 10.4,
      total: 140.39,
      currency: "usd",
      shippingMethod: "Express Shipping",
      trackingNumber: "1Z999AA10123456785",
      paidAt: new Date("2024-11-25T09:15:00"),
      shippedAt: new Date("2024-11-26T11:30:00"),
      items: {
        create: [
          {
            productId: product5.id,
            variantId: (
              await prisma.productVariant.findFirst({
                where: { productId: product5.id, size: "10" },
              })
            )?.id,
            quantity: 1,
            price: 129.99,
            total: 129.99,
          },
        ],
      },
    },
  });

  const order3 = await prisma.order.create({
    data: {
      orderNumber: "ORD-2024-003",
      userId: user1.id,
      clerkId: user1.clerkId,
      addressId: address1.id,
      status: "PROCESSING",
      stripeSessionId: "cs_test_345678",
      stripePaymentIntentId: "pi_test_345678",
      subtotal: 59.99,
      discount: 11.99,
      shippingCost: 5.99,
      tax: 4.32,
      total: 58.31,
      currency: "usd",
      saleId: summerSale.id,
      couponCode: "SUMMER20",
      shippingMethod: "Standard Shipping",
      paidAt: new Date("2024-11-28T14:20:00"),
      items: {
        create: [
          {
            productId: product11.id,
            variantId: (
              await prisma.productVariant.findFirst({
                where: { productId: product11.id, size: "M" },
              })
            )?.id,
            quantity: 1,
            price: 59.99,
            total: 59.99,
          },
        ],
      },
    },
  });

  const order4 = await prisma.order.create({
    data: {
      orderNumber: "ORD-2024-004",
      userId: user1.id,
      clerkId: user1.clerkId,
      addressId: address1.id,
      status: "PENDING",
      stripeSessionId: "cs_test_456789",
      stripePaymentIntentId: "pi_test_456789",
      subtotal: 189.98,
      discount: 0,
      shippingCost: 0,
      tax: 15.2,
      total: 205.18,
      currency: "usd",
      shippingMethod: "Express Shipping",
      items: {
        create: [
          {
            productId: product10.id,
            variantId: (
              await prisma.productVariant.findFirst({
                where: { productId: product10.id, size: "9" },
              })
            )?.id,
            quantity: 1,
            price: 149.99,
            total: 149.99,
          },
          {
            productId: product3.id,
            variantId: (
              await prisma.productVariant.findFirst({
                where: { productId: product3.id, size: "L" },
              })
            )?.id,
            quantity: 1,
            price: 49.99,
            total: 49.99,
          },
        ],
      },
    },
  });

  const order5 = await prisma.order.create({
    data: {
      orderNumber: "ORD-2024-005",
      userId: user1.id,
      clerkId: user1.clerkId,
      addressId: address1.id,
      status: "CANCELLED",
      stripeSessionId: "cs_test_567890",
      stripePaymentIntentId: "pi_test_567890",
      subtotal: 99.99,
      discount: 0,
      shippingCost: 5.99,
      tax: 8.48,
      total: 114.46,
      currency: "usd",
      shippingMethod: "Standard Shipping",
      paidAt: new Date("2024-11-20T16:45:00"),
      cancelledAt: new Date("2024-11-21T10:30:00"),
      items: {
        create: [
          {
            productId: product17.id,
            variantId: (
              await prisma.productVariant.findFirst({
                where: { productId: product17.id, size: "7" },
              })
            )?.id,
            quantity: 1,
            price: 99.99,
            total: 99.99,
          },
        ],
      },
    },
  });

  console.log(`✅ Created 5 orders`);

  // Summary
  console.log("\n🎉 Seed completed successfully!");
  console.log("\n📊 Summary:");
  console.log(`   - Users: 2 (1 customer, 1 admin)`);
  console.log(`   - Addresses: 1`);
  console.log(`   - Categories: 12 (4 main, 8 subcategories)`);
  console.log(`   - Tags: 10`);
  console.log(`   - Products: 30 (10 men's, 10 women's, 10 kids')`);
  console.log(`   - Sales: 2`);
  console.log(`   - Reviews: 3`);
  console.log(`   - Wishlist Items: 3`);
  console.log(`   - Cart Items: 2`);
  console.log(`   - Orders: 5`);
  console.log("\n✨ Your database is ready to use!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
