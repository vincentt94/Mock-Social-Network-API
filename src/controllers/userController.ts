import { User } from '../models/index.js';
import { Request, Response } from 'express';
import Thought from '../models/thought.js';


//method to get all users
export const getUser = async (_req: Request, res: Response) => {
    try {
        const users = await User.find()
            .populate({ path: 'thoughts', select: '__v' })
            .populate({path: 'friends'});

        res.json(users);

    } catch (err) {
        console.error({ message: err });
        res.status(500).json(err);
    }
}

//method to get a single user b y ID
export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const users = await User.findById(req.params.userId)
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({path: 'friends'});

        if (!users) {
            res.status(404).json({ message: 'No user with that ID' });
        } else {
            res.json(users);
        }

    } catch (err) {
        res.status(500).json(err);
    }
}


//method to create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

//method to update a user (PUT)

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(
            //not sure how to find by userId
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(user);
        console.log(`Updated ${user}`);

    } catch (err) {
        console.log('Something went wrong!');
        res.status(500).json(err);
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