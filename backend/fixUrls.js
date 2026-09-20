const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Post = require('./models/Post');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
    
    const posts = await Post.find();
    let updatedCount = 0;
    
    for (let post of posts) {
      let needsUpdate = false;
      let newContent = post.content;
      
      if (newContent && newContent.includes('api.defensive-cyber.com')) {
        newContent = newContent.replace(/https?:\/\/api\.defensive-cyber\.com/g, '');
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        post.content = newContent;
        await post.save();
        updatedCount++;
      }
    }
    
    console.log(`Updated ${updatedCount} posts.`);
    
  } catch (err) {
    console.error('MongoDB connection error:', err);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

connectDB();
