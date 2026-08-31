import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/edunexa';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Establishes or reuses a cached MongoDB connection via Mongoose for MongoDB Atlas or local MongoDB.
 */
export async function connectToDatabase(): Promise<typeof mongoose | null> {
  if (cached.conn && isDbConnected()) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(async (m) => {
        console.log('✅ Connected to MongoDB Atlas successfully.');
        const { seedDatabaseIfEmpty } = await import('./seedRunner');
        await seedDatabaseIfEmpty();
        return m;
      })
      .catch((err) => {
        console.warn('⚠️ MongoDB Atlas Connection Note:', err.message);
        cached.promise = null;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    return null;
  }

  return cached.conn;
}

export function isDbConnected(): boolean {
  return mongoose.connection.readyState === 1;
}
