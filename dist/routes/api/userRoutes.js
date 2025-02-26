import { Router } from 'express';
const router = Router();
import { getSingleUser, getUsers, createUser, updateUser, deleteUser, addFriend, deleteFriend } from '../../controllers/userController.js';
//  /api/users/:userId
//grab a user by Id, update a user, & or delete user 
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);
//  /api/users
//create a user
router.route('/').get(getUsers).post(createUser);
//  /api/users/:userId/friends
// add a friend
router.route('/:userId/friends').post(addFriend);
//  /api/users/:userId/friends/:friendsId
// delete a friend
router.route('/:userId/friends/:friendsId').delete(deleteFriend);
/*
commented out code isn't needed as it's already written in code 7-10

// /api/users/:userId
// grab a user by ID AND update them
router.route('./userId').get(getSingleUser).put(updateUser);

// /api/users/:userId
// grab a user by ID AND delete them
router.route('./userId').get(getSingleUser).delete(deleteUser);

*/
export default router;
