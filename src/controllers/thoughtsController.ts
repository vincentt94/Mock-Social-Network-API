import { Thought } from '../models/index.js';
import { Request, Response } from 'express';
import { User } from '../models/index.js';

//method to get all thoughts

export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);

    } catch (err) {
        console.error({ message: err });
        res.status(500).json(err);
    }
}

//method to get a single thought by id

export const getSingleThought = async (req: Request, res: Response) => {
    try {
        // do i want req.params.id or req.params.thoughtid ?? 
        //check with thoughts.ts line 32 where id:false
        //do I want that id: true ?? 
        //check this method for userController as well 
        const thought = await Thought.findById(req.params.thoughtId);

        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' })
        }

        return res.json(thought);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}


//method to create a new thought AND push it to thoughts _id associated
// with users thoughts array field

export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'Thought created but user not found with that id.' })
        }
        return res.json(201).json({ message: 'Thought created succesfully' });


    } catch (err) {
        console.log(err);
        return res.status(5000).json(err);
    }
}


//method to update a thought by ID

export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (!thought) {
            res.status(404).json({ message: 'No thought with this Id' });
        }
        res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(5000).json(err);
    }

}