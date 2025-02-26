import { Thought } from '../models/index.js';
import { User } from '../models/index.js';
//method to get all thoughts
export const getThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        return res.json(thoughts);
    }
    catch (err) {
        console.error({ message: err });
        return res.status(500).json(err);
    }
};
//method to get a single thought by id
export const getSingleThought = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        return res.json(thought);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
//method to create a new thought AND push it to thoughts _id associated
// with users thoughts array field
export const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate({ _id: req.body.userId }, { $addToSet: { thoughts: thought._id } }, { new: true }).populate('thoughts');
        if (!user) {
            return res.status(404).json({ message: 'Thought created but user not found with that id.' });
        }
        return res.json(201).json({ message: 'Thought created succesfully' });
    }
    catch (err) {
        console.log(err);
        return res.status(5000).json(err);
    }
};
//method to update a thought by ID
export const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this Id' });
        }
        return res.json(thought);
    }
    catch (err) {
        console.log(err);
        return res.status(5000).json(err);
    }
};
//method to remove a thought by _id
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this Id' });
        }
        return res.json({ message: 'Thought successfully deleted' });
    }
    catch (err) {
        console.log(err);
        return res.status(5000).json(err);
    }
};
//method to create a reaction (POST) to be stored in a single thought's reaciton array field
export const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this Id' });
        }
        return res.json(thought);
    }
    catch (err) {
        console.log(err);
        return res.status(5000).json(err);
    }
};
//method to delete/pull/remove a reaction by the reactions reactionId value
export const deleteReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this Id' });
        }
        return res.json(thought);
    }
    catch (err) {
        console.log(err);
        return res.status(5000).json(err);
    }
};
