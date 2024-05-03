// pages/api/createpost.js

import connectDB from '@middleware/database';
import Product from '@models/Product';
import User from '@models/User';

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const {
        name,
        username,
        productTitle,
        productType,
        profilepic,
        caption,
        contentUrl,
        shares,
        price
      } = req.body;

      // Create a new post object
      const newPost = new Product({
        name,
        username,
        productTitle,
        productType: productType.value,
        profilepic,
        description: caption,
        contentUrl,
        shares,
        price
      });

      // Save the new post to the database
      const savedPost = await newPost.save();

      // Update user's post count
      await User.findOneAndUpdate(
        { username },
        { $inc: { products: 1 } } // Increment the posts count by 1
      );

      res.status(201).json({ success: true, savedPost }); // Return the saved post as JSON response
    } else {
      res.status(400).json({ error: 'Invalid request method' });
    }
  } catch (error) {
    console.error('Error adding post:', error);
    res.status(500).json({ error: 'An error occurred while adding the post' });
  }
};

export default connectDB(handler);
