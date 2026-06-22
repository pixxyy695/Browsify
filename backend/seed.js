require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product");

const TOTAL = 200_000;
const BATCH_SIZE = 5_000;

const CATEGORIES = ["Electronics", "Books", "Clothing", "Home & Kitchen", "Sports", "Toys", "Beauty", "Automotive"];
const ADJECTIVES = ["Premium", "Budget", "Classic", "Modern", "Deluxe", "Pro", "Lite", "Ultra"];
const NOUNS = ["Gadget", "Widget", "Device", "Tool", "Accessory", "Kit", "Set", "Pack"];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate() {
  const now = Date.now();
  const twoYearsAgo = now - 2 * 365 * 24 * 60 * 60 * 1000;
  return new Date(now - Math.random() * (now - twoYearsAgo));
}

function generateBatch(batchIndex, size) {
  const docs = [];
  for (let i = 0; i < size; i++) {
    const createdAt = randomDate();
    docs.push({
      name: `${randomItem(ADJECTIVES)} ${randomItem(NOUNS)} ${batchIndex * size + i + 1}`,
      category: randomItem(CATEGORIES),
      price: parseFloat((Math.random() * 1995 + 5).toFixed(2)),
      createdAt,
      updatedAt: createdAt,
    });
  }
  return docs;
}

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Create indexes before inserting — faster on empty collection
    await Product.collection.createIndex({ createdAt: -1 });
    await Product.collection.createIndex({ category: 1, createdAt: -1 });
    console.log("Indexes created");

    const totalBatches = TOTAL / BATCH_SIZE;

    for (let b = 0; b < totalBatches; b++) {
      const batch = generateBatch(b, BATCH_SIZE);
      await Product.insertMany(batch, { ordered: false });
      process.stdout.write(`\rInserted ${(b + 1) * BATCH_SIZE} / ${TOTAL}`);
    }

    console.log("\nSeeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();