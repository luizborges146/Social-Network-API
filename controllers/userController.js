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
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
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

  // Delete user by id 
  deleteUser(req, res) {
	User.findOneAndDelete({ _id: req.params.userId })
		.then((user) => {
			if (!user) {
				res.status(404).json({ message: 'user not found' });
			}
			if (user.thoughts.length > 0) {
				Thought.deleteMany({ _id: { $in: user.thoughts } });
			}
			return res.status(200).json({message: 'user deleted successfully'});
		})
		.catch((err) => {
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
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found!" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.json(err));
  },

  // Add a new friend to a user's friend list
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found!" });
          return;
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //  Remove a friend from a user's friend list
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found!" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
};