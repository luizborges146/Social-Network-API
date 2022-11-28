const router = require('express').Router();
const {
    getAllUsers, // added 
	getOneUser, // added 
	createUser, // added 
	updateUser, // added 
	deleteUser, // added 
	addFriend, // added 
	deleteFriend, // added 
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/').post(addFriend);
router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;