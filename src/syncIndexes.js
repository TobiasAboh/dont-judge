// syncIndexes.js

import mongoose from "mongoose";// adjust path to your model
import { UserSchema } from "./models/User.js";

const User = mongoose.models.User || mongoose.model("User", UserSchema);
const MONGODB_URI="mongodb+srv://tobiasaboh:gSTuql9ZPgEP7WCP@cluster0.q2zcy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await User.syncIndexes();
    console.log('Indexes synced successfully.');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error syncing indexes:', error);
    process.exit(1);
  }
}

run();
