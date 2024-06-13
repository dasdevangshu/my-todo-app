// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, ServerApiVersion } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}
const maxRetries = parseInt(process.env.MONGO_MAX_RETRIES || '5');
const retryDelay = parseInt(process.env.MONGO_RETRY_DELAY || '2000');

const uri = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 60000, // Increase the timeout to 60 seconds
  socketTimeoutMS: 60000,
  minPoolSize: 3,
}

let client
let clientPromise: Promise<MongoClient>

async function connectToMongo() {
  let client;
  let retries = 0;
  while (retries < maxRetries) {
    try {
      client = new MongoClient(uri, options);
      await client.connect();
      return client;  // Successful connection, return the client
    } catch (err) {
      retries++;
      console.error(`Failed to connect to MongoDB. Attempt ${retries} of ${maxRetries}:`, err);
      if (retries >= maxRetries) {
        throw new Error(`Failed to connect to MongoDB after ${maxRetries} attempts`);
      }
      console.log(`Retrying in ${retryDelay}ms...`);
      await new Promise(res => setTimeout(res, retryDelay));  // Wait before retrying
    }
  }
  throw new Error('Should not reach here if retry logic is working correctly.');
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  clientPromise = connectToMongo().catch(err => {
    console.error('Failed to connect to MongoDB in production mode:', err);
    throw err;
  });
}

export default clientPromise