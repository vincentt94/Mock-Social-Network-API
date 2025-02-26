import { User } from '../models/index.js';
import { Request, Response } from 'express';
import Thought from '../models/thought.js';


//method to get all users
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find()
            .populate({ path: 'thoughts', select: '__v' })
            .populate({ path: 'friends' });

       return  res.json(users);

    } catch (err) {
        console.error({ message: err });
        return res.status(500).json(err);
    }
}

//method to get a single user by ID
export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const users = await User.findById(req.params.userId)
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends' });

        if (!users) {
           return res.status(404).json({ message: 'No user with that ID' });
        } else {
           return res.json(users);
        }

    } catch (err) {
       return res.status(500).json(err);
    }
}


//method to create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
       return res.json(user);
    } catch (err) {
       return res.status(500).json(err);
    }
}

//method to update a user (PUT)

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        console.log(`Updated ${user}`);
       return res.status(200).json(user);

    } catch (err) {
        console.log('Something went wrong!');
        return res.status(500).json(err);
    }
};



//method to delete a user

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        /* 
        may have to delete / comment out thoughts removal
        */

        //Remove all thoughts for this user
        return await Thought.deleteMany({ username: user.username })

    } catch (err) {
        console.log('Something went wrong!');

        return res.status(500).json(err);
    }
}


//method to add a friend to a user's friend list (POST) 
export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true },
        )

        if (!user) {
           return res.status(404).json({ message: ' No user with that Id' });
        }

        return res.json(user);

    } catch (err) {
        console.log('Something went wrong!');

       return res.status(500).json(err);
    }
}

//method to delete a friend form a user's friend list (DELETE)
export const deleteFriend = async (req: Request, res: Response) => {
    try {

        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { friendsId: req.params.friendsId } } },
            { runValidators: true, new: true },
        )

        if (!user) {
            return res.status(404).json({ message: ' No user with that Id' });
        }

       return res.json(user);
    } catch (err) {
        console.log('Something went wrong!');

        return res.status(500).json(err);
    }
}