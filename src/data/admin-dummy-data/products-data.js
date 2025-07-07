export const dummyProducts = [
  {
    id: "prod_001",
    sku: "LJ-001",
    name: "Cognac Leather Jacket",
    description: "Premium cognac-colored leather jacket for winter wear.",
    image: "/jacket.jpg",
    category: "Apparel",
    collection: "Winter Wear",
    stock: 5,
    price: 489.95,
    status: "inactive",
    createdAt: "2025-06-01T09:00:00Z",
    updatedAt: "2025-06-01T09:00:00Z",
    variant: [
      {
        variantId: "v1",
        name: "Small",
        description: "Size Small",
        price: 489.95,
        stock: 2,
        image: "https://plus.unsplash.com/premium_photo-1661313817350-1fa759c43a3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGVhdGhlciUyMGphY2tldHxlbnwwfHwwfHx8MA%3D%3D",
        size: "S",
        color: "Cognac",
        material: "Leather"
      },
      {
        variantId: "v2",
        name: "Medium",
        description: "Size Medium",
        price: 489,
        stock: 3,
        image: "https://images.unsplash.com/photo-1606715791286-6e43e9838f44?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxlYXRoZXIlMjBqYWNrZXRzfGVufDB8fDB8fHww",
        size: "M",
        color: "green",
        material: "Leather"
      }
    ]
  },
  {
    id: "prod_002",
    sku: "SH-002",
    name: "Shirt Slim Fit",
    description: "Slim fit yellow shirt ideal for formal occasions.",
    image: "/yellowShirt.jpg",
    category: "Apparel",
    collection: "Formal",
    stock: 12,
    price: 39.99,
    status: "draft",
    createdAt: "2025-05-25T11:30:00Z",
    updatedAt: "2025-05-25T11:30:00Z",
    variant: [
      {
        variantId: "v1",
        name: "Large",
        description: "Size Large",
        price: 39.99,
        stock: 5,
        image: "https://images.unsplash.com/photo-1602810318660-d2c46b750f88?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1lbnMlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
        size: "L",
        color: "Purple",
        material: "Cotton"
      }
    ]
  },
  {
    id: "prod_003",
    sku: "SP-003",
    name: "Bluetooth Speaker Portable",
    description: "Compact portable speaker with powerful Bluetooth sound.",
    image: "/speaker.jpg",
    category: "Electronics",
    collection: "Audio Gear",
    stock: 20,
    price: 59.99,
    status: "active",
    createdAt: "2025-06-05T14:15:00Z",
    updatedAt: "2025-06-05T14:15:00Z",
    variant: [
      {
        variantId: "v1",
        name: "Black",
        description: "Black Color",
        price: 59.99,
        stock: 10,
        image: "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
        size: "Standard",
        color: "Black",
        material: "Plastic"
      }
    ]
  },
  {
    id: "prod_004",
    sku: "MS-004",
    name: "Gaming Mouse Pro",
    description: "High-precision gaming mouse with customizable buttons.",
    image: "/mouse.png",
    category: "Electronics",
    collection: "Gaming",
    stock: 30,
    price: 49.99,
    status: "active",
    createdAt: "2025-06-10T16:45:00Z",
    updatedAt: "2025-06-10T16:45:00Z",
    variant: [
      {
        variantId: "v1",
        name: "Black Wired",
        description: "Wired",
        price: 49.99,
        stock: 15,
        image: "/mouse.png",
        size: "Medium",
        color: "Black",
        material: "Plastic"
      },
      {
        variantId: "v2",
        name: "White Wireless",
        description: "Wireless",
        price: 59.99,
        stock: 15,
        image: "https://images.unsplash.com/photo-1705332112231-4dff35a9587c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2hpdGUlMjBtb3VzZXxlbnwwfHwwfHx8MA%3D%3D",
        size: "Medium",
        color: "White",
        material: "Plastic"
      }
    ]
  },
  {
    id: "prod_005",
    sku: "RB-005",
    name: "Running Shoes",
    description: "Lightweight and comfortable shoes for running.",
    image: "/shoes.jpg",
    category: "Footwear",
    collection: "Sports",
    stock: 18,
    price: 79.99,
    status: "inactive",
    createdAt: "2025-06-12T10:20:00Z",
    updatedAt: "2025-06-12T10:20:00Z",
    variant: [
      {
        variantId: "v1",
        name: "Size 8",
        description: "Men's size 8",
        price: 79.99,
        stock: 8,
        image: "/shoes.jpg",
        size: "8",
        color: "Blue",
        material: "Mesh"
      },
      {
        variantId: "v2",
        name: "Size 9",
        description: "Men's size 9",
        price: 79.99,
        stock: 10,
        image: "/shoes.jpg",
        size: "9",
        color: "Blue",
        material: "Mesh"
      }
    ]
  },
  {
    id: "prod_006",
    sku: "LP-006",
    name: "Leather Handbag",
    description: "Stylish leather handbag for luxury occasions.",
    image: "/handbag.jpg",
    category: "Accessories",
    collection: "Luxury",
    stock: 8,
    price: 149.99,
    status: "active",
    createdAt: "2025-06-15T08:50:00Z",
    updatedAt: "2025-06-15T08:50:00Z",
    variant: [
      {
        variantId: "v1",
        name: "Brown",
        description: "Classic brown leather",
        price: 149.99,
        stock: 8,
        image: "/handbag.jpg",
        size: "One Size",
        color: "Brown",
        material: "Leather"
      }
    ]
  },
  {
    id: "prod_007",
    sku: "WS-007",
    name: "Smartwatch",
    description: "Multifunctional smartwatch with fitness tracking.",
    image: "/smartwatches.jpg",
    category: "Electronics",
    collection: "Wearables",
    stock: 25,
    price: 199.99,
    status: "draft",
    createdAt: "2025-06-18T13:10:00Z",
    updatedAt: "2025-06-18T13:10:00Z",
    variant: [
      {
        variantId: "v1",
        name: "Black",
        description: "Silicone strap",
        price: 199.99,
        stock: 15,
        image: "/smartwatches.jpg",
        size: "Standard",
        color: "Black",
        material: "Silicone"
      },
      {
        variantId: "v2",
        name: "Silver",
        description: "Metal strap",
        price: 219.99,
        stock: 10,
        image: "/smartwatches.jpg",
        size: "Standard",
        color: "Silver",
        material: "Metal"
      }
    ]
  },
  {
    id: "prod_008",
    sku: "4K-008",
    name: "4K Monitor 27in",
    description: "Ultra HD 4K monitor perfect for work or gaming.",
    image: "/monitor.png",
    category: "Computers",
    collection: "Office",
    stock: 10,
    price: 299.99,
    status: "active",
    createdAt: "2025-06-20T15:30:00Z",
    updatedAt: "2025-06-20T15:30:00Z",
    variant: [
      {
        variantId: "v1",
        name: "Standard",
        description: "60Hz refresh rate",
        price: 299.99,
        stock: 5,
        image: "/monitor.png",
        size: "27in",
        color: "Black",
        material: "Plastic"
      },
      {
        variantId: "v2",
        name: "Pro",
        description: "144Hz refresh rate",
        price: 349.99,
        stock: 5,
        image: "/monitor.png",
        size: "27in",
        color: "Black",
        material: "Aluminum"
      }
    ]
  },
  {
    id: "prod_009",
    sku: "SS-009",
    name: "Stainless Steel Water Bottle",
    description: "Durable stainless steel bottle for daily hydration.",
    image: "/bottle.jpg",
    category: "Home & Kitchen",
    collection: "Essentials",
    stock: 40,
    price: 24.99,
    status: "draft",
    createdAt: "2025-06-22T09:40:00Z",
    updatedAt: "2025-06-22T09:40:00Z",
    variant: [
      {
        variantId: "v1",
        name: "500ml",
        description: "500ml size",
        price: 24.99,
        stock: 25,
        image: "/bottle.jpg",
        size: "500ml",
        color: "Silver",
        material: "Stainless Steel"
      },
      {
        variantId: "v2",
        name: "1L",
        description: "1 liter size",
        price: 29.99,
        stock: 15,
        image: "/bottle.jpg",
        size: "1L",
        color: "Silver",
        material: "Stainless Steel"
      }
    ]
  }
];
