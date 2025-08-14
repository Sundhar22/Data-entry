import { PrismaClient } from "../generated/prisma";
import { execSync } from 'child_process';


const prisma = new PrismaClient();

const categories = [
  { name: 'Vegetables' },
  { name: 'Fruits' },
  { name: 'Grains' },
  { name: 'Dairy' },
  { name: 'Spices' },
  { name: 'Herbs' },
  { name: 'Pulses' },
  { name: 'Nuts' },
  { name: 'Flowers' },
  { name: 'Other' },
];

const products = [
  // Vegetables
  { name: 'Tomato', categoryName: 'Vegetables' },
  { name: 'Onion', categoryName: 'Vegetables' },
  { name: 'Potato', categoryName: 'Vegetables' },
  { name: 'Carrot', categoryName: 'Vegetables' },
  { name: 'Cabbage', categoryName: 'Vegetables' },
  { name: 'Cauliflower', categoryName: 'Vegetables' },
  { name: 'Brinjal', categoryName: 'Vegetables' },
  { name: 'Okra', categoryName: 'Vegetables' },
  { name: 'Bell Pepper', categoryName: 'Vegetables' },
  { name: 'Cucumber', categoryName: 'Vegetables' },
  { name: 'Spinach', categoryName: 'Vegetables' },
  { name: 'Lettuce', categoryName: 'Vegetables' },
  { name: 'Radish', categoryName: 'Vegetables' },
  { name: 'Beetroot', categoryName: 'Vegetables' },
  { name: 'Green Beans', categoryName: 'Vegetables' },

  // Fruits
  { name: 'Apple', categoryName: 'Fruits' },
  { name: 'Banana', categoryName: 'Fruits' },
  { name: 'Orange', categoryName: 'Fruits' },
  { name: 'Mango', categoryName: 'Fruits' },
  { name: 'Grapes', categoryName: 'Fruits' },
  { name: 'Strawberry', categoryName: 'Fruits' },
  { name: 'Watermelon', categoryName: 'Fruits' },
  { name: 'Papaya', categoryName: 'Fruits' },
  { name: 'Pineapple', categoryName: 'Fruits' },
  { name: 'Pomegranate', categoryName: 'Fruits' },
  { name: 'Guava', categoryName: 'Fruits' },
  { name: 'Lemon', categoryName: 'Fruits' },
  { name: 'Coconut', categoryName: 'Fruits' },

  // Grains
  { name: 'Rice', categoryName: 'Grains' },
  { name: 'Wheat', categoryName: 'Grains' },
  { name: 'Corn', categoryName: 'Grains' },
  { name: 'Barley', categoryName: 'Grains' },
  { name: 'Oats', categoryName: 'Grains' },
  { name: 'Millet', categoryName: 'Grains' },
  { name: 'Quinoa', categoryName: 'Grains' },
  { name: 'Buckwheat', categoryName: 'Grains' },

  // Dairy
  { name: 'Milk', categoryName: 'Dairy' },
  { name: 'Yogurt', categoryName: 'Dairy' },
  { name: 'Cheese', categoryName: 'Dairy' },
  { name: 'Butter', categoryName: 'Dairy' },
  { name: 'Ghee', categoryName: 'Dairy' },
  { name: 'Cream', categoryName: 'Dairy' },
  { name: 'Paneer', categoryName: 'Dairy' },

  // Spices
  { name: 'Turmeric', categoryName: 'Spices' },
  { name: 'Cumin', categoryName: 'Spices' },
  { name: 'Coriander', categoryName: 'Spices' },
  { name: 'Cardamom', categoryName: 'Spices' },
  { name: 'Cinnamon', categoryName: 'Spices' },
  { name: 'Clove', categoryName: 'Spices' },
  { name: 'Black Pepper', categoryName: 'Spices' },
  { name: 'Red Chili', categoryName: 'Spices' },
  { name: 'Ginger', categoryName: 'Spices' },
  { name: 'Garlic', categoryName: 'Spices' },
  { name: 'Mustard Seeds', categoryName: 'Spices' },
  { name: 'Fenugreek', categoryName: 'Spices' },

  // Herbs
  { name: 'Mint', categoryName: 'Herbs' },
  { name: 'Cilantro', categoryName: 'Herbs' },
  { name: 'Basil', categoryName: 'Herbs' },
  { name: 'Parsley', categoryName: 'Herbs' },
  { name: 'Thyme', categoryName: 'Herbs' },
  { name: 'Rosemary', categoryName: 'Herbs' },
  { name: 'Oregano', categoryName: 'Herbs' },
  { name: 'Sage', categoryName: 'Herbs' },
  { name: 'Dill', categoryName: 'Herbs' },

  // Pulses
  { name: 'Lentils', categoryName: 'Pulses' },
  { name: 'Chickpeas', categoryName: 'Pulses' },
  { name: 'Black Beans', categoryName: 'Pulses' },
  { name: 'Kidney Beans', categoryName: 'Pulses' },
  { name: 'Green Peas', categoryName: 'Pulses' },
  { name: 'Black Eyed Peas', categoryName: 'Pulses' },
  { name: 'Soybeans', categoryName: 'Pulses' },
  { name: 'Pinto Beans', categoryName: 'Pulses' },

  // Nuts
  { name: 'Almonds', categoryName: 'Nuts' },
  { name: 'Walnuts', categoryName: 'Nuts' },
  { name: 'Cashews', categoryName: 'Nuts' },
  { name: 'Pistachios', categoryName: 'Nuts' },
  { name: 'Peanuts', categoryName: 'Nuts' },
  { name: 'Hazelnuts', categoryName: 'Nuts' },
  { name: 'Pecans', categoryName: 'Nuts' },
  { name: 'Brazil Nuts', categoryName: 'Nuts' },

  // Flowers
  { name: 'Rose', categoryName: 'Flowers' },
  { name: 'Jasmine', categoryName: 'Flowers' },
  { name: 'Marigold', categoryName: 'Flowers' },
  { name: 'Lotus', categoryName: 'Flowers' },
  { name: 'Sunflower', categoryName: 'Flowers' },
  { name: 'Chrysanthemum', categoryName: 'Flowers' },
  { name: 'Lavender', categoryName: 'Flowers' },
  { name: 'Hibiscus', categoryName: 'Flowers' },

  // Other
  { name: 'Honey', categoryName: 'Other' },
  { name: 'Jaggery', categoryName: 'Other' },
  { name: 'Sugar', categoryName: 'Other' },
  { name: 'Salt', categoryName: 'Other' },
  { name: 'Oil', categoryName: 'Other' },
  { name: 'Vinegar', categoryName: 'Other' },
  { name: 'Tea Leaves', categoryName: 'Other' },
  { name: 'Coffee Beans', categoryName: 'Other' },
];

async function main() {
  console.log('🌱 Starting seed...');

  // Create categories
  console.log('Creating categories...');
  const createdCategories = new Map<string, string>();

  for (const category of categories) {
    const createdCategory = await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
    createdCategories.set(category.name, createdCategory.id);
    console.log(`✅ Created category: ${category.name}`);
  }

  // Create products
  console.log('Creating products...');
  for (const product of products) {
    const categoryId = createdCategories.get(product.categoryName);
    if (!categoryId) {
      console.error(`❌ Category not found: ${product.categoryName}`);
      continue;
    }

    await prisma.product.upsert({
      where: { name: product.name },
      update: {
        category_id: categoryId,
        is_active: true,
      },
      create: {
        name: product.name,
        category_id: categoryId,
        is_active: true,
      },
    });
    console.log(`✅ Created product: ${product.name} (${product.categoryName})`);
  }

  console.log('🎉 Seed completed successfully!');
  
  // Auto-install triggers after seeding
  console.log('\n🔧 Installing database triggers...');
  try {
    execSync('node scripts/simple-triggers.js install', { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    console.log('✅ Database triggers installed automatically!');
  } catch (error) {
    console.log('⚠️  Trigger installation failed. Run manually: npm run triggers:install');
    if (error instanceof Error) {
      console.error('Error:', error.message);
    }
  }
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

