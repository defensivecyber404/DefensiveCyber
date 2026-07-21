const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Post = require('./models/Post');

const initDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      console.error('MONGO_URI is not defined in .env');
      process.exit(1);
    }
    
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');

    // Seed default admin if no users exist
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@defensivecyber.com';
      const adminPass = process.env.ADMIN_PASS || 'admin123';
      console.log(`No users found. Creating default admin user (${adminEmail})...`);
      const hash = await bcrypt.hash(adminPass, 10);
      await User.create({ username: adminEmail, password_hash: hash });
      console.log('Default admin user created successfully');
    }

    // Seed default posts if no posts exist
    const postCount = await Post.countDocuments();
    if (postCount === 0) {
      console.log('No posts found. Creating default news and blog posts...');
      await Post.create([
        {
          title: 'Welcome to Defensive Cyber',
          excerpt: 'This is your first blog post. You can edit or delete this from the admin panel.',
          content: 'This is the full content of your first blog post. You can use the admin panel at /admin to manage all your blog posts and news updates.',
          type: 'blog'
        },
        {
          title: 'Defensive Cyber Launches New Website',
          excerpt: 'We are thrilled to announce the launch of our brand new website.',
          content: 'Our new website features a modern design, better security, and a seamless user experience. Stay tuned for more updates in our news section.',
          type: 'news'
        }
      ]);
      console.log('Default posts created successfully');
    }
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = initDB;
