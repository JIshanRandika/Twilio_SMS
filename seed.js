// seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seedData = [
  {
    phone_number: '+94715757700',
    key: 'name',
    value: 'Ishan Randika',
    last_updated: new Date(),
  },
  {
    phone_number: '+0987654321',
    key: 'status',
    value: 'active',
    last_updated: new Date(),
  },
  {
    phone_number: '+1122334455',
    key: 'role',
    value: 'admin',
    last_updated: new Date(),
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for seeding');

    await User.deleteMany({});
    console.log('Existing data removed');

    await User.insertMany(seedData);
    console.log('Database seeded successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDatabase();
