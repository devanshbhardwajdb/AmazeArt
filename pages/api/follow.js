import connectDB from '@middleware/database';
import User from '@models/User';

const handler = async (req, res) => {
    
    try {
        if (req.method === 'PUT') {
            const { beingFollowedUsername, followerUsername } = req.body;
            // console.log(beingFollowedUsername)

            // Assuming you have middleware to get the current user from the token

            // Check if the current user is already following the target user
            const userBeingFollowed = await User.findOne({ username: beingFollowedUsername });

            // console.log(userBeingFollowed)

            if (!userBeingFollowed) {
                // Handle case where the user being followed is not found
                res.status(404).json({ error: 'User not found' });
                return;
            }
            const isFollowing = userBeingFollowed.followers.includes(followerUsername);

            if (isFollowing) {
                // If already following, remove from follower array of the target user
                await User.findOneAndUpdate(
                    { username: beingFollowedUsername },
                    { $pull: { followers: followerUsername } },
                    { new: true }
                );

                // Remove the target user from the following array of the current user
                await User.findOneAndUpdate(
                    { username: followerUsername },
                    { $pull: { following: beingFollowedUsername } },
                    { new: true }
                );

                res.status(200).json({ success: true, message: 'User unfollowed successfully' });
            } else {
                // If not following, add to follower array of the target user
                await User.findOneAndUpdate(
                    { username: beingFollowedUsername },
                    { $addToSet: { followers: followerUsername } },
                    { new: true }
                );

                // Add the target user to the following array of the current user
                await User.findOneAndUpdate(
                    { username: followerUsername },
                    { $addToSet: { following: beingFollowedUsername } },
                    { new: true }
                );

                res.status(200).json({ success: true, message: 'User followed successfully' });
            }
        } else {
            res.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Error following/unfollowing user:', error);
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }
};

export default connectDB(handler);
