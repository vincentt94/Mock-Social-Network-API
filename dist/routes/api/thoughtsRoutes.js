import { Router } from 'express';
const router = Router();
import { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, deleteReaction } from '../../controllers/thoughtsController.js';
//  /api/thoughts/:thoughtId
// grab a single thought by ID,  update it, or delete it
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);
// /api/thoughts
//create a thought
router.route('/').get(getThoughts).post(createThought);
//  /api/thoughts/:thoughtId/reaction
// add a reaction
router.route('/:thoughtId/reactions').post(addReaction);
// /api/thoughts/:thoughtId/reaction/:reactionId
// delete a reaction
router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction);
export default router;
