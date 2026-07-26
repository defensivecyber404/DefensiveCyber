const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Post = require('./models/Post');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

const dummyBlog = {
  title: 'Understanding Zero-Day Vulnerabilities',
  excerpt: 'A deep dive into what zero-day vulnerabilities are, how they are discovered, and what organizations can do to protect against these unknown threats before a patch is available.',
  content: 'Zero-day vulnerabilities are software flaws unknown to the vendor. They present a significant risk because there is no patch available, leaving systems exposed. This article explores the mechanics of zero-day exploits and strategies for mitigation.',
  type: 'blog'
};

const seed = async () => {
  await connectDB();
  try {
    const existingBlog = await Post.findOne({ type: 'blog' });
    if (!existingBlog) {
      await Post.create(dummyBlog);
      console.log('Added dummy blog post.');
    } else {
      console.log('Blog post already exists.');
    }
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

seed();
