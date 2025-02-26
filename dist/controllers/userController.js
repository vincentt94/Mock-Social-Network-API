import { User } from '../models/index.js';
// import Thought from '../models/thought.js';
//method to get all users
export const getUsers = async (_req, res) => {
    try {
        const users = await User.find()
            .populate({ path: 'thoughts', select: '__v' })
            .populate({ path: 'friends' });
        return res.json(users);
    }
    catch (err) {
        console.error({ message: err });
        return res.status(500).json(err);
    }
};
//method to get a single user by ID
export const getSingleUser = async (req, res) => {
    try {
        const users = await User.findById(req.params.userId)
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends' });
        if (!users) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        else {
            return res.json(users);
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
//method to create a new user
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
//method to update a user (PUT)
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true });
        console.log(`Updated ${user}`);
        return res.status(200).json(user);
    }
    catch (err) {
        console.log('Something went wrong!');
        return res.status(500).json(err);
    }
};
//method to delete a user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        /*
        may have to delete / comment out thoughts removal
        */
        //Remove all thoughts for this user
        // return await Thought.deleteMany({ username: user.username })
        return res.json({ message: 'User deleted successfully' });
    }
    catch (err) {
        console.log('Something went wrong!');
        return res.status(500).json(err);
    }
};
//method to add a friend to a user's friend list (POST) 
export const addFriend = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, // Add friendId to friends array
        { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ message: 'Friend added successfully' });
    }
    catch (err) {
        console.log('Something went wrong!');
        return res.status(500).json(err);
    }
};
//method to delete a friend form a user's friend list (DELETE)
export const deleteFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: ' No user with that Id' });
        }
        return res.json({ message: 'Friend removed successfully' });
    }
    catch (err) {
        console.log('Something went wrong!');
        return res.status(500).json(err);
    }
};
