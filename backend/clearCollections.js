import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bosscars';

async function clearCollections() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    
    // Get all collections
    const collections = await db.listCollections().toArray();
    console.log(`\nFound ${collections.length} collections:`, collections.map(c => c.name).join(', '));
    
    // Delete ALL collections to start fresh
    for (const collection of collections) {
      try {
        await db.collection(collection.name).drop();
        console.log(`✅ Deleted ${collection.name} collection`);
      } catch (error) {
        console.log(`⚠️  Could not delete ${collection.name}:`, error.message);
      }
    }
    
    console.log('\n🎉 All collections cleared!');
    console.log('📝 Only bookings will be stored from now on');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

clearCollections();
