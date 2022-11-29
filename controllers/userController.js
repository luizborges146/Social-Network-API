const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
	// get all users
	getAllUsers(req, res) {
		User.find()
			.then((users) => res.json(users))
			.catch((err) => res.status(500).json(err));
	},
    
	// Get specific user by id
	getOneUser(req, res) {
		User.findOne({ _id: req.params.userId })
			.select('-__v')
			.then(async (user) =>
				!user
					? res.status(404).json({ message: 'No user with that ID' })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},

	// Create a new user
	createUser(req, res) {
		User.create(req.body)
			.then((user) => res.json(user))
			.catch((err) => res.status(500).json(err));
	},

	// Delete user by id -- needs to check this one #################################################### ##########################################################################################################################################
	deleteUser(req, res) {
		User.findByIdAndDelete({ _id: req.params.userId })
		.then((user) =>
		  !user
			? res.status(404).json({ message: 'User not found' })
			: User.findOneAndUpdate(
				{ friends: req.params.userId },
				{ $pull: { friends: req.params.userId } },
				{ new: true }
			  )
		).then((user) =>
		!user
		  ? res.status(404).json({ message: 'User not found' })
		  : Thought.findOneAndUpdate(
			  { thoughts: req.params.userId },
			  { $pull: { thoughts: req.params.userId } },
			  { new: true }
			)
		).catch((err) => {
		  console.log(err);
		  res.status(500).json(err);
		});
	},

	//  Update a user by its id
	updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true, runValidators: true }
        )
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        })
        .catch(err => res.json(err));

    },

	// Add a new friend to a user's friend list
	addFriend({ params }, res) {
		User.findOneAndUpdate(
			{ _id: params.userId },
			{ $push: { friends: params.friendId } },
			{ new: true }
		  )
			.then((user) => {
				if (!dbUserData) {
                    res.status(404).json({ message: 'No user found at this id!' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
	},

	//  Remove a friend from a user's friend list
	deleteFriend(req, res){
		User.findOneAndUpdate(
		  { _id: req.params.userId },
		  { $pull: { friends: { userId: req.params.friendId } } },
		)
		  .then((user) =>
			!user
			  ? res
				  .status(404)
				  .json({ message: 'No user found :(' })
			  : res.json(user)
		  )
		  .catch((err) => res.status(500).json(err));
	  }
};