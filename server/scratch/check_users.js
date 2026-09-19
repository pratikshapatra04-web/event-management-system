import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' }); // load from server root

const connect = async () => {
  const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/events';
  console.log('Connecting to:', url);
  try {
    await mongoose.connect(url);
    console.log('Connected!');
    
    const db = mongoose.connection.db;
    const users = await db.collection('users').find({}).toArray();
    console.log('All Users in DB:');
    console.log(users.map(u => ({ username: u.username, email: u.email, role: u.role })));
    
    process.exit(0);
  } catch (err) {
    console.error('Failed:', err.message);
    process.exit(1);
  }
};

connect();
