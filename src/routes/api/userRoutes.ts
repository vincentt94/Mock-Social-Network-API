import { Router } from 'express';
const router = Router();
import {getSingleUser, getUser,createUser,updateUser, deleteUser} from '../../controllers/userController.js';

//  /api/users/:userId
//grab a user by Id, update a user, & or delete user 
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

//  /api/user
//create a user
router.route('/').get(getUser).post(createUser);

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
